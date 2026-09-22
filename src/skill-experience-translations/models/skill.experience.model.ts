import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Skill } from "./skill.model";
import { Job } from "./job.model";

@ObjectType({ description: "skill_experience" })
export class SkillExperience {
  @Field(() => ID)
  id!: number;

  @Field(() => Int)
  skillId!: number;

  @Field(() => Int)
  jobId!: number;

  @Field(() => Int)
  shareOfJob!: number;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;

  @Field(() => Skill)
  skill?: Skill;

  @Field(() => Job)
  job?: Job;
}
