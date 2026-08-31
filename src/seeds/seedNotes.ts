import { db } from "./../prisma/db";

await db.orm.public.Note.createAll([
  { title: "the latest arch I've learned", content: "I", skillId: 1 },
  { title: "asdf", content: "I", skillId: 2 },
]);
