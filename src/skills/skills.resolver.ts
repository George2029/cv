import { Resolver, Args, Query, Int } from "@nestjs/graphql";
import { Skill } from "./models/skill.model";
import { SkillsService } from "./skills.service";

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Query(() => [Skill])
  skills(
    @Args("ids", { type: () => [Int], nullable: true }) ids: number[] = [],
  ): Promise<Skill[]> {
    return this.skillsService.find(ids);
  }
}

