import { Injectable, Inject } from "@nestjs/common";
import DataLoader from "dataloader";
import { SkillsService } from "../../skills/skills.service";
import { JobsService } from "../../jobs/jobs.service";
import { SkillExperiencesService } from "../../skill-experiences/skill.experiences.service";
import type { Skill } from "../models/skill.model";
import type { Job } from "../models/job.model";
import type { SkillExperience } from "../models/skill.experience.model";

export interface IDataloaders {
  skillExperienceLoader: DataLoader<number, SkillExperience | null>;
  skillLoader: DataLoader<number, Skill | null>;
  jobLoader: DataLoader<number, Job | null>;
}

@Injectable()
export class DataloaderService {
  constructor(
    @Inject(SkillsService) private readonly skillsService: SkillsService,
    @Inject(JobsService) private readonly jobsService: JobsService,
    @Inject(SkillExperiencesService)
    private readonly skillExperiencesService: SkillExperiencesService,
  ) {}

  createLoaders(): IDataloaders {
    const skillExperienceLoader = new DataLoader<number, SkillExperience | null>(
      async (ids: readonly number[]) => {
        if (ids.length === 0) return [];
        const records = await this.skillExperiencesService.findByIds([...ids]);
        const map = new Map(records.map((r) => [r.id, r]));
        return ids.map((id) => map.get(id) ?? null);
      },
    );

    const skillLoader = new DataLoader<number, Skill | null>(
      async (ids: readonly number[]) => {
        if (ids.length === 0) return [];
        const records = await this.skillsService.findByIds([...ids]);
        const map = new Map(records.map((r) => [r.id, r]));
        return ids.map((id) => map.get(id) ?? null);
      },
    );

    const jobLoader = new DataLoader<number, Job | null>(
      async (ids: readonly number[]) => {
        if (ids.length === 0) return [];
        const records = await this.jobsService.findByIds([...ids]);
        const map = new Map(records.map((r) => [r.id, r]));
        return ids.map((id) => map.get(id) ?? null);
      },
    );

    return {
      skillExperienceLoader,
      skillLoader,
      jobLoader,
    };
  }
}

