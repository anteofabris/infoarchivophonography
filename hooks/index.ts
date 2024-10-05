import { gql, useLazyQuery } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNews($month: Int!, $year: Int!) {
    GetNewsByMonth(month: $month, year: $year) {
     data
    }
  }
`;

export function useGetNewsByMonth(month: number, year: number) {
  return useLazyQuery(GET_NEWS, {
    variables: { month, year },
  });
};
