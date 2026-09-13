#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/6d52b54af719cd6ecb2148a8b4d0ae020d327855a39bcf6adbc14a8ad8e9c993/contract';
import startContract from '../../snapshots/6d52b54af719cd6ecb2148a8b4d0ae020d327855a39bcf6adbc14a8ad8e9c993/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/74f17ae5699a4d2d6cfe865312fd18a507e4ecc5e31eadbfc4b1da16d4cc32f5/contract';
import endContract from '../../snapshots/74f17ae5699a4d2d6cfe865312fd18a507e4ecc5e31eadbfc4b1da16d4cc32f5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'note' }),
      this.dropTable({ schema: 'public', table: 'work_experience' }),
      this.createTable({
        schema: 'public',
        table: 'job',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('ended_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('started_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'skill_experience',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('job_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('skill_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'skill',
        column: col('level', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'skill_experience',
        index: 'skill_experience_job_id_idx_58a5bbdd',
        columns: ['job_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'skill_experience',
        index: 'skill_experience_skill_id_idx_676c8389',
        columns: ['skill_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skill_experience',
        foreignKey: {
          name: 'skill_experience_skill_id_fkey',
          columns: ['skill_id'],
          references: { schema: 'public', table: 'skill', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skill_experience',
        foreignKey: {
          name: 'skill_experience_job_id_fkey',
          columns: ['job_id'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
