import { Document } from 'graphql';

import gql from 'graphql-tag';

export const topQuery: Document = gql`
 query documents($firstFolders: Int, $jumpFolders: Int, $where:JSON,
$orderFolders:String, $firstFiles: Int, $jumpFiles: Int,
$orderFiles:String) {
  allFolders (first: $firstFolders, jump: $jumpFolders, orderBy: $orderFolders, where: $where) {
    count
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        _id
        name
        folders {
          count
        }
        files {
          count 
        }
      }
    }
    
  }
  allFiles (first: $firstFiles, jump: $jumpFiles, orderBy: $orderFiles, where: $where) {
    count 
    pageInfo {
      hasNextPage
    }
    edges {
      node {
        _id
        _filename
        size

      }
    }
  }
}
`;

export const folderQuery = gql`
  query oneFolder ($id: ID, $firstFolders: Int, $jumpFolders: Int, $where:JSON,
      $orderFolders:String, $firstFiles: Int, $jumpFiles: Int, $orderFiles:String){
      Folders (_id: $id){
        files (first: $firstFiles, jump: $jumpFiles, orderBy: $orderFiles, where: $where) {
          count 
          edges {
            node {
              _filename
              _id
              size
            }
          }
        }
        folders (first: $firstFolders, jump: $jumpFolders, orderBy: $orderFolders, where: $where) {
          count
          edges {
            node {
              _id
              name
            }
          }
        }    
      }
    }
`;
