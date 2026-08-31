import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "skill" })
export class Skill {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;
}
