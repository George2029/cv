import { db } from "./../prisma/db";

export type Skill = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchSkills(ids: readonly number[]): Promise<Skill[]> {
  console.log("skills ids:", ids);
  const result = await db.orm.public.Skill.where((s) => s.id.in(ids)).all();
  console.log("skills result:", result);
  return result;
}
