import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Context,
} from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { SkillExperienceTranslation } from "./models/skill.experience.translation.model";
import { SkillExperience } from "./models/skill.experience.model";
import { SkillExperienceTranslationsService } from "./skill.experience.translations.service";
import type { IDataloaders } from "./dataloader/dataloader.service";

@Resolver(() => SkillExperienceTranslation)
export class SkillExperienceTranslationsResolver {
  constructor(
    @Inject(SkillExperienceTranslationsService)
    private readonly translationsService: SkillExperienceTranslationsService,
  ) {}

  @Query(() => [SkillExperienceTranslation], {
    name: "skillExperienceTranslations",
    description:
      "Fetches all skill experience translations with chained relations",
  })
  async skillExperienceTranslations(): Promise<SkillExperienceTranslation[]> {
    return this.translationsService.findAll();
  }

  @ResolveField(() => SkillExperience, { nullable: false })
  async skillExperience(
    @Parent() translation: SkillExperienceTranslation,
    @Context("loaders") loaders: IDataloaders,
  ): Promise<SkillExperience | null> {
    return loaders.skillExperienceLoader.load(translation.skillExperienceId);
  }
}
