import type {
  Contract as End,
  Contract as Start,
} from "../../snapshots/74f17ae5699a4d2d6cfe865312fd18a507e4ecc5e31eadbfc4b1da16d4cc32f5/contract";
import endContract from "../../snapshots/74f17ae5699a4d2d6cfe865312fd18a507e4ecc5e31eadbfc4b1da16d4cc32f5/contract.json" with { type: "json" };
import startContract from "../../snapshots/74f17ae5699a4d2d6cfe865312fd18a507e4ecc5e31eadbfc4b1da16d4cc32f5/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  rawSql,
} from "@prisma/orm-postgres/migration";

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      rawSql({
        id: "reorder_tables_and_seed_skills",
        invariantId: "reorder_tables_and_seed_skills",
        label:
          "Reorder columns for job, skill, and skill_experience, and seed skills",
        operationClass: "data",
        target: {
          id: "postgres",
          details: {
            schema: "public",
            objectType: "table",
            name: "skill",
          },
        },
        precheck: [],
        execute: [
          {
            description:
              "Reorder columns safely for job, skill, skill_experience",
            sql: `
              -- 1. Create new tables with id first
              CREATE TABLE job_new (
                id SERIAL PRIMARY KEY,
                title text NOT NULL,
                content text NOT NULL,
                started_at timestamptz NOT NULL,
                ended_at timestamptz NOT NULL,
                created_at timestamptz NOT NULL DEFAULT now(),
                updated_at timestamptz NOT NULL
              );

              CREATE TABLE skill_new (
                id SERIAL PRIMARY KEY,
                name text NOT NULL UNIQUE,
                level int4 NOT NULL DEFAULT 0,
                created_at timestamptz NOT NULL DEFAULT now(),
                updated_at timestamptz NOT NULL
              );

              CREATE TABLE skill_experience_new (
                id SERIAL PRIMARY KEY,
                skill_id int4 NOT NULL,
                job_id int4 NOT NULL,
                content text NOT NULL,
                created_at timestamptz NOT NULL DEFAULT now(),
                updated_at timestamptz NOT NULL
              );

              -- 2. Safely copy existing rows over if any
              INSERT INTO job_new (id, title, content, started_at, ended_at, created_at, updated_at)
                SELECT id, title, content, started_at, ended_at, created_at, updated_at FROM job;
              SELECT setval(pg_get_serial_sequence('job_new', 'id'), COALESCE((SELECT MAX(id) FROM job_new), 1), (SELECT MAX(id) FROM job_new) IS NOT NULL);

              INSERT INTO skill_new (id, name, level, created_at, updated_at)
                SELECT id, name, level, created_at, updated_at FROM skill;

              -- 2b. Seed initial skills
              INSERT INTO skill_new (name, level, created_at, updated_at)
                VALUES 
                  ('GraphQL', 0, now(), now()),
                  ('JavaScript', 0, now(), now()),
                  ('SQL', 0, now(), now())
                ON CONFLICT (name) DO NOTHING;

              SELECT setval(pg_get_serial_sequence('skill_new', 'id'), COALESCE((SELECT MAX(id) FROM skill_new), 1), (SELECT MAX(id) FROM skill_new) IS NOT NULL);

              INSERT INTO skill_experience_new (id, skill_id, job_id, content, created_at, updated_at)
                SELECT id, skill_id, job_id, content, created_at, updated_at FROM skill_experience;
              SELECT setval(pg_get_serial_sequence('skill_experience_new', 'id'), COALESCE((SELECT MAX(id) FROM skill_experience_new), 1), (SELECT MAX(id) FROM skill_experience_new) IS NOT NULL);

              -- 3. Drop old tables (CASCADE drops dependent foreign keys)
              DROP TABLE skill_experience CASCADE;
              DROP TABLE job CASCADE;
              DROP TABLE skill CASCADE;

              -- 4. Swap tables
              ALTER TABLE job_new RENAME TO job;
              ALTER TABLE skill_new RENAME TO skill;
              ALTER TABLE skill_experience_new RENAME TO skill_experience;

              -- 5. Re-add foreign key constraints
              ALTER TABLE skill_experience 
                ADD CONSTRAINT skill_experience_job_id_fkey 
                FOREIGN KEY (job_id) REFERENCES job(id);

              ALTER TABLE skill_experience 
                ADD CONSTRAINT skill_experience_skill_id_fkey 
                FOREIGN KEY (skill_id) REFERENCES skill(id);

              -- 6. Re-add indexes
              CREATE INDEX skill_experience_job_id_idx_58a5bbdd ON skill_experience (job_id);
              CREATE INDEX skill_experience_skill_id_idx_676c8389 ON skill_experience (skill_id);
            `,
            params: [],
          },
        ],
        postcheck: [],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
