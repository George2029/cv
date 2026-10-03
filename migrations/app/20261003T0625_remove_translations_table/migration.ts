#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/11435ab39bcf998a35bf74c216bdda0baec3cb030c66b08170ad4dec81e1be3a/contract';
import endContract from '../../snapshots/11435ab39bcf998a35bf74c216bdda0baec3cb030c66b08170ad4dec81e1be3a/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/2e0deb07d381b67f715568d25c1caf714885e3c2060176197712e908b3324cc7/contract';
import startContract from '../../snapshots/2e0deb07d381b67f715568d25c1caf714885e3c2060176197712e908b3324cc7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'skill_experience_translation' }),
      this.addColumn({
        schema: 'public',
        table: 'job',
        column: col('content_ru', 'text', {
          notNull: true,
          default: lit(''),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'job',
        column: col('title_ru', 'text', {
          notNull: true,
          default: lit(''),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'skill_experience',
        column: col('content', 'text', {
          notNull: true,
          default: lit(''),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'skill_experience',
        column: col('content_ru', 'text', {
          notNull: true,
          default: lit(''),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
