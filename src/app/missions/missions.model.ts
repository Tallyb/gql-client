import { Document } from 'graphql';

import gql from 'graphql-tag';

export const missionsQuery: Document = gql`
  query  allMissions ($first: Int, $after: Cursor) {
    allMissions (first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      count
      edges {
        cursor
        node {
          _id
          title
          level
          finishedDate
          bookedDate
          bookedUntil
          validFrom
          validUntil
          missiondatas {
            count
          }
          locationRef
          location {
            type {
              locations {
                count
              }
            }
          }
        }
      }
    }
}
`;
