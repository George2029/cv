import { Injectable, type OnModuleDestroy } from "@nestjs/common";
import postgres from "@prisma/orm-postgres/runtime";
import "temporal-polyfill/global";

import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

@Injectable()
export class PrismaService implements OnModuleDestroy {
  public readonly db: ReturnType<typeof postgres<Contract>>;

  constructor() {
    const url = process.env.DATABASE_URL;

    if (!url) {
      throw new Error("DATABASE_URL is not set");
    }

    this.db = postgres<Contract>({
      contractJson,
      url,
    });
  }

  async onModuleDestroy() {
    await this.db.close();
  }
}
