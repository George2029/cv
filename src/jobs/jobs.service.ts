import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { Job } from "../skill-experience-translations/models/job.model";

@Injectable()
export class JobsService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  async findByIds(ids: number[]): Promise<Job[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    return this.prisma.db.orm.public.Job.where((j) => j.id.in(ids)).all();
  }

  async findAll(): Promise<Job[]> {
    return this.prisma.db.orm.public.Job.all();
  }
}

