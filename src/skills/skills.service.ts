import { Injectable } from "@nestjs/common";
import { Skill } from "./models/skill.model";
import { PrismaService } from "./../prisma/prisma.service";

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(ids?: number[]): Promise<Skill[]> {
    if (ids && ids.length > 0) {
      return this.prisma.db.orm.public.Skill.where((s) => s.id.in(ids)).all();
    }
    return this.prisma.db.orm.public.Skill.all();
  }
}
