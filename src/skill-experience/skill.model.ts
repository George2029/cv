import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "skill" })
export class Skill {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  level!: number;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;
}
