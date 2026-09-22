import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "job" })
export class Job {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  content!: string;

  @Field(() => String)
  startedAt!: string;

  @Field(() => String)
  endedAt!: string;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;
}

