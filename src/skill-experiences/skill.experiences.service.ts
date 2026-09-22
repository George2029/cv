import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { SkillExperience } from "../skill-experience-translations/models/skill.experience.model";

@Injectable()
export class SkillExperiencesService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  async findByIds(ids: number[]): Promise<SkillExperience[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    return this.prisma.db.orm.public.SkillExperience.where((se) =>
      se.id.in(ids),
    ).all();
  }

  async findAll(): Promise<SkillExperience[]> {
    return this.prisma.db.orm.public.SkillExperience.all();
  }
}

