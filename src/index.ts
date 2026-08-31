import {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import DataLoader from "dataloader";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";
import { ruruHTML } from "ruru/server";
import { fetchSkills, type Skill } from "./fetchers/skills";
import { fetchNotes, type Note } from "./fetchers/notes";

const app = express();

function createContext() {
  return {
    skillLoader: new DataLoader(async (ids: readonly number[]) => {
      const skills = await fetchSkills(ids);
      return ids.map((id) => skills.find((skill) => skill.id === id));
    }),
  };
}

const Skill = new GraphQLObjectType({
  name: "skill",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  }),
});

const Note = new GraphQLObjectType({
  name: "note",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    skillId: {
      type: GraphQLInt,
    },
    content: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    skill: {
      type: Skill,
      resolve: (note, _args, context) => {
        return context.skillLoader.load(note.skillId);
      },
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  }),
});

const Query = new GraphQLObjectType({
  name: "someQueryName",
  fields: () => ({
    greeting: {
      type: GraphQLString,
      resolve: () => "Hello",
    },
    notes: {
      type: new GraphQLList(Note),
      args: {
        ids: {
          type: new GraphQLList(GraphQLInt),
        },
      },
      resolve: (_source, args) => fetchNotes(args.ids),
    },
    skills: {
      type: new GraphQLList(Skill),
      args: {
        ids: {
          type: new GraphQLList(GraphQLInt),
        },
      },
      resolve: async (_source, args) => {
        const result = await fetchSkills(args.ids);
        console.log("result:", result);
        return result;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  description: "The application schema.",
  query: Query,
});

app.post(
  "/graphql",
  createHandler({
    schema,
    context: () => createContext(),
  }),
);

const PORT = 4000;

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});
