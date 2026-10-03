import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { DataloaderService } from "./skill-experience/dataloader/dataloader.service";
import { SkillExperiencesModule } from "./skill-experience/skill.experience.module";
import { PrismaModule } from "./prisma/prisma.module";
import { join } from "node:path";

@Module({
  imports: [
    PrismaModule,
    SkillExperiencesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [SkillExperiencesModule],
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
