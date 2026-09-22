import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { SkillExperienceTranslation } from "./models/skill.experience.translation.model";

@Injectable()
export class SkillExperienceTranslationsService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<SkillExperienceTranslation[]> {
    return this.prisma.db.orm.public.SkillExperienceTranslation.all();
  }
}
