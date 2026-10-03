import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SkillExperiencesService } from "./skill.experience.service";
import { SkillsService } from "./../skills/skills.service";
import { DataloaderService } from "./dataloader/dataloader.service";
import { JobsModule } from "./../jobs/jobs.module";
import { SkillExperienceResolver } from "./skill.experience.resolver";

@Module({
  imports: [PrismaModule, JobsModule],
  providers: [
    SkillExperiencesService,
    DataloaderService,
    SkillsService,
    SkillExperienceResolver,
  ],
  exports: [SkillExperiencesService, DataloaderService, SkillsService],
})
export class SkillExperiencesModule {}
