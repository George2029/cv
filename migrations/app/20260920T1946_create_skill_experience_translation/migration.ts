#!/usr/bin/env -S node
import type { Contract as Start } from "../../snapshots/74f17ae5699a4d2d6cfe865312fd18a507e4ecc5e31eadbfc4b1da16d4cc32f5/contract";
import startContract from "../../snapshots/74f17ae5699a4d2d6cfe865312fd18a507e4ecc5e31eadbfc4b1da16d4cc32f5/contract.json" with { type: "json" };
import type { Contract as End } from "../../snapshots/d96d138345c8ebe407fb47e2b7b7174887e45d42e1ef7222a7346aa1f5224512/contract";
import endContract from "../../snapshots/d96d138345c8ebe407fb47e2b7b7174887e45d42e1ef7222a7346aa1f5224512/contract.json" with { type: "json" };
import postgres from "@prisma/orm-postgres/runtime";
import {
  Migration,
  MigrationCLI,
  col,
  fn,
} from "@prisma/orm-postgres/migration";

const db = postgres<End>({ contractJson: endContract });

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({
        schema: "public",
        table: "skill_experience",
        column: "content",
      }),
      this.createTable({
        schema: "public",
        table: "skill_experience_translation",
        columns: [
          col("skill_experience_id", "int4", {
            notNull: true,
            codecRef: { codecId: "pg/int4@1" },
          }),
          col("content", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("is_lang_ru", "bool", {
            notNull: true,
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("created_at", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("updated_at", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
        ],
      }),
      this.addColumn({
        schema: "public",
        table: "skill_experience",
        column: col("share_of_job", "int4", {
          codecRef: { codecId: "pg/int4@1" },
        }),
      }),
      this.dataTransform(
        db.contract,
        "backfill-skill_experience-share_of_job",
        {
          check: () =>
            db.sql.public.skill_experience
              .select("id")
              .where((f, fns) => fns.eq(f.share_of_job, null))
              .limit(1),
          run: () =>
            db.sql.public.skill_experience
              .update({
                share_of_job: 0,
                updated_at: "2026-09-20T00:00:00.000Z",
              })
              .where((f, fns) => fns.eq(f.share_of_job, null)),
        },
      ),
      this.setNotNull({
        schema: "public",
        table: "skill_experience",
        column: "share_of_job",
      }),
      this.createIndex({
        schema: "public",
        table: "skill_experience_translation",
        index: "skill_experience_translation_skill_experience_id_idx_54e98d3d",
        columns: ["skill_experience_id"],
      }),
      this.addForeignKey({
        schema: "public",
        table: "skill_experience_translation",
        foreignKey: {
          name: "skill_experience_translation_skill_experience_id_fkey",
          columns: ["skill_experience_id"],
          references: {
            schema: "public",
            table: "skill_experience",
            columns: ["id"],
          },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
