import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { SkillsModule } from "./skills/skills.module";
import { PrismaModule } from "./prisma/prisma.module";
import { join } from "node:path";

@Module({
  imports: [
    PrismaModule,
    SkillsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
  ],
})
export class AppModule {}
