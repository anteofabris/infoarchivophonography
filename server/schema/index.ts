// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `
  scalar LoopControl

  type Query {
    GetNewsByMonth(month: Int!, year: Int!): [String]
  }
  type Mutation {
    PlayData(data: [String], startingIndex: Int): LoopControl
    Stop(loopControl: LoopControl): Int
  }
`;
