import { Document } from 'graphql';

import gql from 'graphql-tag';

export const questionsQuery: Document = gql`
  query  allQuestions ($first: Int, $after: Cursor) {
    allQuestions (first: $first, after: $after){
        count
        pageInfo {
            hasNextPage
        }
        edges {
        cursor
        node {
            _id
            date
            votes {
            count 
            edges {
                node {
                username
                }
            }
            }
            user {
            username 
            }
        }
        }
    }
}
`;

export const questionsSubscription: any = gql`
  subscription onCommentAdded($repoFullName: String!){
    commentAdded(repoFullName: $repoFullName){
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  }
`;
