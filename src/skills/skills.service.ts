import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { Skill } from "../skill-experience-translations/models/skill.model";

@Injectable()
export class SkillsService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  async findByIds(ids: number[]): Promise<Skill[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    return this.prisma.db.orm.public.Skill.where((s) => s.id.in(ids)).all();
  }

  async findAll(): Promise<Skill[]> {
    return this.prisma.db.orm.public.Skill.all();
  }
}

