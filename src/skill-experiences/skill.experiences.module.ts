import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SkillExperiencesService } from "./skill.experiences.service";

@Module({
  imports: [PrismaModule],
  providers: [SkillExperiencesService],
  exports: [SkillExperiencesService],
})
export class SkillExperiencesModule {}

