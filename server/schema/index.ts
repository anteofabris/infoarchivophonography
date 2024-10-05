// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `
  type News {
    data: String
  }

  type Query {
    GetNewsByMonth(month: Int!, year: Int!): [News]
  }
`;
