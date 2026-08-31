import { db } from "./../prisma/db";

await db.orm.public.Skill.createAll([{ name: "JavaScript" }, { name: "SQL" }]);
