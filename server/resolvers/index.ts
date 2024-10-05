// Resolvers define how to fetch the types defined in your schema.

import { DateObject } from "../../models";
import { dbGetNewsByMonth } from "../database";

export const resolvers = {
  Query: {
    GetNewsByMonth: async (_, input: DateObject) => {
      return await dbGetNewsByMonth(input.month, input.year);
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
