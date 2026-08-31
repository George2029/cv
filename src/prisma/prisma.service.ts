import { Injectable, type OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import postgres from "@prisma/orm-postgres/runtime";
import "temporal-polyfill/global";

import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

@Injectable()
export class PrismaService implements OnModuleDestroy {
  public readonly db: ReturnType<typeof postgres<Contract>>;

  constructor(private readonly configService: ConfigService) {
    const url =
      this.configService.get<string>("DATABASE_URL") ??
      process.env.DATABASE_URL;

    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Please define it in your .env file.",
      );
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
