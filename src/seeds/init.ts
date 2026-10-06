import { db } from "./../prisma/db";

async function main() {
  await db.orm.public.Skill.createAll([
    { name: "GraphQL", level: 1 },
    { name: "TypeScript", level: 7 },
    { name: "NestJS", level: 6 },
    { name: "SQL", level: 7 },

    { name: "Docker", level: 5 },
    { name: "Git", level: 8 },
    { name: "React", level: 6 },
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
      title: "Crypto Trading Platform",
      titleRu: "Крипто Торговая Платформа",
      content:
        "Designed backend architecture for integrations with multiple decentralized exchanges (DEXs). Developed a Solana on-chain program in Rust to automate trading strategies. Refactored and improved the React frontend to increase maintainability and performance. Containerized and deployed a multi-service application using Docker. Authored OpenAPI specifications for backend services and REST APIs. Produced UML diagrams to document system architecture and service interactions",
      contentRu:
        "Спроектировал архитектуру бэкенда для интеграции с различными децентрализованными биржами (DEX). Разработал ончейн-программу для сети Solana на языке Rust для автоматизации торговых стратегий. Выполнил рефакторинг и оптимизацию фронтенда на React, повысив удобство сопровождения и производительность. Контейнеризировал и развернул мультисервисное приложение с использованием Docker. Подготовил спецификации OpenAPI для бэкенд-сервисов и REST API. Разработал UML-диаграммы для документирования архитектуры системы и взаимодействия сервисов",
      startedAt: new Date("2025.01.01").toISOString(),
      endedAt: new Date("2026.07.23").toISOString(),
    },
  ]);

  const firstWorkSkillExperiences = [
    {
      jobId: 1,
      skillId: 2,
      shareOfJob: 45,
      content: "The app is built with TypeScript, both: backend and frontend",
      contentRu:
        "На TypeScript построены клиентская и серверная части приложения",
    },
    {
      jobId: 1,
      skillId: 3,
      shareOfJob: 25,
      content:
        "NestJS framework served to establish a clean arhitecture for backend",
      contentRu: "Фреймворк NestJS обеспечил чистую архитектуру для бэкенда",
    },
    {
      jobId: 1,
      skillId: 4,
      shareOfJob: 20,
      content:
        "There were different kinds of interactions with PostgresSQL databases: queries optimizations, deadlocks resolution",
      contentRu:
        "Был разнообразный опыт взаимодействия c PostgreSQL: оптимизации запросов, удаление дэдлоков",
    },
    {
      jobId: 1,
      skillId: 6,
      shareOfJob: 10,
      content:
        "All main Git functionalities were used to easily manage app development across the team",
      contentRu:
        "Гит классически достойно использовался командой для организации рабочего процесса",
    },
  ];

  await db.orm.public.SkillExperience.createAll([
    ...firstWorkSkillExperiences,
    {
      jobId: 2,
      skillId: 2,
      shareOfJob: 50,
      content: "The app is built with TypeScript, both: backend and frontend",
      contentRu:
        "На TypeScript была написана пара серверов клиентская и серверная части приложения",
    },
    {
      jobId: 2,
      skillId: 8,
      content: "Rust was used to develop a Solana program and web servers",
      contentRu:
        "На Rust была написана программа для работы на Solana блокчейне и некоторые веб-сервера",
      shareOfJob: 18,
    },
    {
      jobId: 2,
      skillId: 7,
      shareOfJob: 12,
      content:
        "React was used as frontend framework and I was thoroughly involved in that side of app development as well",
      contentRu:
        "В качестве фронтенд-фреймворка использовался React, и я принимал самое активное участие в разработке этой части приложения",
    },
    {
      jobId: 2,
      skillId: 5,
      shareOfJob: 10,
      content:
        "Docker was used to containerize all servers and have a predictable deployment",
      contentRu:
        "Docker использовался для контейнеризации всех серверов и обеспечения предсказуемого развертывания",
    },

    {
      jobId: 2,
      skillId: 6,
      shareOfJob: 10,
      content:
        "Git was very basically used as I had almost an unlimited control over the app development flow",
      contentRu:
        "Гит использовался весьма тривиально. Был почти полный контроль над процессом разработки всего приложения",
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
