import { Field, Int, ObjectType } from "@nestjs/graphql";
import { SkillExperience } from "./skill.experience.model";

@ObjectType({ description: "skill_experience_translation" })
export class SkillExperienceTranslation {
  @Field(() => Int)
  skillExperienceId!: number;

  @Field(() => String)
  content!: string;

  @Field(() => Boolean)
  isLangRu!: boolean;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;

  @Field(() => SkillExperience)
  skillExperience?: SkillExperience;
}
