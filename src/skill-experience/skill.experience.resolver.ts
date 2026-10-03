import { Resolver, ResolveField, Parent, Context, Query } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { SkillExperience } from "./skill.experience.model";
import { Skill } from "./skill.model";
import { Job } from "./job.model";
import type { IDataloaders } from "./dataloader/dataloader.service";
import { SkillExperiencesService } from "./skill.experience.service";

@Resolver(() => SkillExperience)
export class SkillExperienceResolver {
  constructor(
    @Inject(SkillExperiencesService)
    private readonly skillExperiencesService: SkillExperiencesService,
  ) {}

  @Query(() => [SkillExperience], {
    name: "skillExperiences",
    description: "Fetches all skill experiences with relations",
  })
  async skillExperiences(): Promise<SkillExperience[]> {
    return this.skillExperiencesService.findAll();
  }
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
