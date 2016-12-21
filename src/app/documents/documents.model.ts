import { Document } from 'graphql';

import gql from 'graphql-tag';

export const query: Document = gql`
  query  allDocuments ($first: Int, $after: Cursor) {
    allDocuments (first: $first, after: $after) {
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
