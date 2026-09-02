import { db } from "./../prisma/db";

async function main() {
  await db.orm.public.Skill.createAll([
    { name: "GraphQL" },
    { name: "JavaScript" },
    { name: "SQL" },
  ]);

  await db.orm.public.Note.createAll([
    {
      title: "The latest architecture I have learned",
      content: "GraphQL...",
      skillId: 1,
    },
    {
      title: "My strongest language",
      content: "JavaScript or Typescript",
      skillId: 2,
    },
    {
      title: "ultimate database language",
      content:
        "I have a decent experience with sql: I wrote complex queires, recursive queires in the past",
      skillId: 3,
    },
  ]);

  {
    const firstProject = {
      title: `Telegram-based Web3 Gamification Platform`,
      content: `Designed and optimized complex SQL queries`,
    };
    const secondProject = {
      title: `Crypto Trading Platform`,
      content: `Built an architecture for API to conveniently work with DEX (Decentralized EXchanges) programs, wrote an on-chain program to process a specific trading strategy which could not be done on the client side.`,
    };
    await db.orm.public.WorkExperience.createAll([firstProject, secondProject]);
  }
}

main();
