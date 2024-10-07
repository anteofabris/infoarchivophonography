// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `
  scalar LoopControl
  scalar AlphIndex

  type News {
    phrases: [String]
    startingIndexes: [AlphIndex]
  }

  type Query {
    GetNewsByMonth(month: Int!, year: Int!): News
  }
  type Mutation {
    PlayData(data: [String], startingIndex: Int): LoopControl
    Stop(loopControl: LoopControl): Int
  }
`;
