import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SkillsModule } from "../skills/skills.module";
import { JobsModule } from "../jobs/jobs.module";
import { SkillExperiencesModule } from "../skill-experiences/skill.experiences.module";
import { DataloaderService } from "./dataloader/dataloader.service";
import { SkillExperienceTranslationsService } from "./skill.experience.translations.service";
import { SkillExperienceTranslationsResolver } from "./skill.experience.translations.resolver";
import { SkillExperienceResolver } from "./skill.experience.resolver";

@Module({
  imports: [
    PrismaModule,
    SkillsModule,
    JobsModule,
    SkillExperiencesModule,
  ],
  providers: [
    DataloaderService,
    SkillExperienceTranslationsService,
    SkillExperienceTranslationsResolver,
    SkillExperienceResolver,
  ],
  exports: [SkillExperienceTranslationsService, DataloaderService],
})
export class SkillExperienceTranslations {}
