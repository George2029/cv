import { db } from "./../prisma/db";

async function main() {
  await db.orm.public.Skill.createAll([
    { name: "GraphQL" },
    { name: "JavaScript" },
    { name: "SQL" },
  ]);
}

main();
