import { db } from "./../prisma/db";

async function main() {
  await db.orm.public.Skill.createAll([
    { name: "GraphQL", level: 1 },
    { name: "TypeScript", level: 7 },
    { name: "SQL", level: 7 },
    { name: "Rust", level: 5 },
  ]);

  await db.orm.public.Job.createAll([
    {
      title: "Telegram-based Web3 Gamification Platform",
      titleRu: "Telegram Web3 игровая платформа",
      content:
        "Designed and optimized complex SQL queries. Built CI/CD pipelines. Resolved database deadlocks and concurrency issues",
      contentRu:
        "Разрабатывал и оптимизировал сложные SQL запросы. Строил CI/CD пайплайны. Решал дэдлоки в бд и проблемы с параллелизацией",
      startedAt: new Date("2024.06.20").toISOString(),
      endedAt: new Date("2024.12.20").toISOString(),
    },
    {
      title: "Crypto Trading Platform ",
      titleRu: "Crypto Trading Platform ",
      content:
        "Designed backend architecture for integrations with multiple decentralized exchanges (DEXs). Developed a Solana on-chain program in Rust to automate trading strategies. Refactored and improved the React frontend to increase maintainability and performance. Containerized and deployed a multi-service application using Docker. Authored OpenAPI specifications for backend services and REST APIs. Produced UML diagrams to document system architecture and service interactions",
      contentRu:
        "Designed backend architecture for integrations with multiple decentralized exchanges (DEXs). Developed a Solana on-chain program in Rust to automate trading strategies. Refactored and improved the React frontend to increase maintainability and performance. Containerized and deployed a multi-service application using Docker. Authored OpenAPI specifications for backend services and REST APIs. Produced UML diagrams to document system architecture and service interactions",
      startedAt: new Date("2025.01.01").toISOString(),
      endedAt: new Date("2026.07.23").toISOString(),
    },
  ]);

  await db.orm.public.SkillExperience.createAll([
    {
      jobId: 1,
      skillId: 2,
      shareOfJob: 70,
      content: "The app is built with typescript, both: backend and frontend",
      contentRu:
        "на typescript построены клиентская и серверная часть приложения",
    },
    {
      jobId: 1,
      skillId: 4,
      shareOfJob: 30,
      content:
        "There were several postgresSQL databases operating, so SQL was used a lot",
      contentRu:
        "В использовании находилось не менее 3-х реляционных баз данных. SQL использовался часто",
    },

    {
      jobId: 2,
      skillId: 2,
      shareOfJob: 60,
      content: "The app is built with typescript, both: backend and frontend",
      contentRu:
        "на typescript построены клиентская и серверная часть приложения",
    },
    {
      jobId: 2,
      skillId: 4,
      content:
        "rust was used to develop solana programs, besides some additional web servers",
      contentRu:
        "на расте писались солана программы, дополнительные веб-сервера",
      shareOfJob: 30,
    },
    {
      jobId: 2,
      skillId: 3,
      shareOfJob: 10,
      content: "SQL was rarely used in the project",
      contentRu: "SQL редко использовался на этом проекте",
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
