import postgres from "@prisma/orm-postgres/runtime";
import dotenv from "dotenv";
dotenv.config();

import "temporal-polyfill/global";

import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

console.log("process.env.DATABASE_URL:", process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) {
  console.log("database url is not defined as env");
  process.exit(1);
}
export const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL,
});
