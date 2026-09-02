import postgres from "@prisma/orm-postgres/runtime";

import "temporal-polyfill/global";

import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

if (!process.env.DATABASE_URL) {
  console.log("missing DATABASE_URL");
  process.exit(1);
}
export const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL,
});
