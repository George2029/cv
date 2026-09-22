import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { SkillExperienceTranslations } from "./skill-experience-translations/skill.experience.translations.module";
import { DataloaderService } from "./skill-experience-translations/dataloader/dataloader.service";
import { PrismaModule } from "./prisma/prisma.module";
import { join } from "node:path";

@Module({
  imports: [
    PrismaModule,
    SkillExperienceTranslations,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [SkillExperienceTranslations],
      inject: [DataloaderService],
      useFactory: (dataloaderService: DataloaderService) => ({
        autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        context: () => ({
          loaders: dataloaderService.createLoaders(),
        }),
      }),
    }),
  ],
})
export class AppModule {}
