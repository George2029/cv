#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2e0deb07d381b67f715568d25c1caf714885e3c2060176197712e908b3324cc7/contract';
import endContract from '../../snapshots/2e0deb07d381b67f715568d25c1caf714885e3c2060176197712e908b3324cc7/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d96d138345c8ebe407fb47e2b7b7174887e45d42e1ef7222a7346aa1f5224512/contract';
import startContract from '../../snapshots/d96d138345c8ebe407fb47e2b7b7174887e45d42e1ef7222a7346aa1f5224512/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addUnique({
        schema: 'public',
        table: 'skill_experience_translation',
        constraint: 'skill_experience_translation_skill_experience_id_is_lang_ru_key',
        columns: ['skill_experience_id', 'is_lang_ru'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
