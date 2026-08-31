import { db } from "./../prisma/db";

export type Note = {
  id: number;
  title: string;
  content: string | null;
  skillId: number;
  createdAt: string;
  updatedAt: string;
};

export async function fetchNotes(
  ids: readonly number[],
): Promise<Note[] | undefined> {
  try {
    const result = await db.orm.public.Note.where((s) => s.id.in(ids)).all();
    console.log("notes: result:", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
