import { db } from "./../prisma/db";

async function main() {
  //   const truncatePlan = db.raw.sql`
  //     TRUNCATE TABLE skill_experience_translation, skill_experience, job, skill RESTART IDENTITY CASCADE;
  //   `
  //     .affectedCount()
  //     .build();
  //   await db.runtime().execute(truncatePlan);

  await db.orm.public.Skill.createAll([
    { name: "GraphQL", level: 1 },
    { name: "TypeScript", level: 7 },
    { name: "SQL", level: 7 },
    { name: "Rust", level: 5 },
  ]);

  await db.orm.public.Job.createAll([
    {
      title: "Telegram-based Web3 Gamification Platform",
      content:
        "Designed and optimized complex SQL queries. Built CI/CD pipelines. Resolved database deadlocks and concurrency issues",
      startedAt: new Date().toISOString(),
      endedAt: new Date().toISOString(),
    },
    {
      title: "Crypto Trading Platform ",
      content:
        "Designed backend architecture for integrations with multiple decentralized exchanges (DEXs). Developed a Solana on-chain program in Rust to automate trading strategies. Refactored and improved the React frontend to increase maintainability and performance. Containerized and deployed a multi-service application using Docker. Authored OpenAPI specifications for backend services and REST APIs. Produced UML diagrams to document system architecture and service interactions",
      startedAt: new Date().toISOString(),
      endedAt: new Date().toISOString(),
    },
  ]);

  await db.orm.public.SkillExperience.createAll([
    {
      jobId: 1,
      skillId: 2,
      shareOfJob: 70,
    },
    {
      jobId: 1,
      skillId: 4,
      shareOfJob: 30,
    },

    {
      jobId: 2,
      skillId: 2,
      shareOfJob: 60,
    },
    {
      jobId: 2,
      skillId: 4,
      shareOfJob: 30,
    },
    {
      jobId: 2,
      skillId: 3,
      shareOfJob: 10,
    },
  ]);

  await db.orm.public.SkillExperienceTranslation.createAll([
    {
      skillExperienceId: 1,
      content: "The app is built with typescript, both: backend and frontend",
      isLangRu: false,
    },
    {
      skillExperienceId: 1,
      content:
        "на typescript построены клиентская и серверная часть приложения",
      isLangRu: true,
    },

    {
      skillExperienceId: 2,
      content: "sql was used a lot",
      isLangRu: false,
    },
    {
      skillExperienceId: 2,
      content: "sql часто использовался",
      isLangRu: true,
    },

    {
      skillExperienceId: 3,
      content: "The app is built with typescript, both: backend and frontend",
      isLangRu: false,
    },
    {
      skillExperienceId: 3,
      content:
        "на typescript построены клиентская и серверная часть приложения",
      isLangRu: true,
    },

    {
      skillExperienceId: 4,
      content: "rust top",
      isLangRu: false,
    },
    {
      skillExperienceId: 4,
      content: "rust топ",
      isLangRu: true,
    },

    {
      skillExperienceId: 5,
      content: "sql very little",
      isLangRu: false,
    },
    {
      skillExperienceId: 5,
      content: "чутарика sql",
      isLangRu: true,
    },
  ]);

  console.log("Seeding completed successfully.");
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });
