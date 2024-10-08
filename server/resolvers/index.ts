// Resolvers define how to fetch the types defined in your schema.

import { DateObject } from "../../models";
import { dbGetNewsByMonth, dbPlayData, dbStop } from "../database";

export const resolvers = {
  Query: {
    GetNewsByMonth: async (_, input: DateObject) => {
      return await dbGetNewsByMonth(input.month, input.year);
    },
  },
  Mutation: {
    PlayData: async (_, input: any) => {
      console.log("play mutation!",);
      const loop = await dbPlayData(input.data, input.startingIndex);
      return loop;
    },
    Stop: async (_, input: any) => {
      console.log("stop mutation!", input);
      dbStop(input.loop);
    },
  },
};

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
