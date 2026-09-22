import { Resolver, ResolveField, Parent, Context } from "@nestjs/graphql";
import { SkillExperience } from "./models/skill.experience.model";
import { Skill } from "./models/skill.model";
import { Job } from "./models/job.model";
import type { IDataloaders } from "./dataloader/dataloader.service";

@Resolver(() => SkillExperience)
export class SkillExperienceResolver {
  @ResolveField(() => Skill, { nullable: true })
  async skill(
    @Parent() skillExperience: SkillExperience,
    @Context("loaders") loaders: IDataloaders,
  ): Promise<Skill | null> {
    return loaders.skillLoader.load(skillExperience.skillId);
  }

  @ResolveField(() => Job, { nullable: true })
  async job(
    @Parent() skillExperience: SkillExperience,
    @Context("loaders") loaders: IDataloaders,
  ): Promise<Job | null> {
    return loaders.jobLoader.load(skillExperience.jobId);
  }
}

