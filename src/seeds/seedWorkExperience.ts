import { db } from "./../prisma/db";

const title = `Telegram-based Web3 Gamification Platform`;
const content = `Designed and optimized complex SQL queries`;

await db.orm.public.WorkExperience.create({ title, content });
