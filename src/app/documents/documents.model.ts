import { Document } from 'graphql';
import gql from 'graphql-tag';

export const fragments = gql`
  
  fragment foldersData on FoldersConnection {
    count
    edges {
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

fragment filesData on FilesConnection {
    count
    edges {
      node {
        _id
        _filename
        size
      }
    }
}
`;

export const topQuery: Document = gql`
 query documents($firstFolders: Int, $jumpFolders: Int, $where:JSON,
$orderFolders:String, $firstFiles: Int, $jumpFiles: Int,
$orderFiles:String) {
  allFolders (first: $firstFolders, jump: $jumpFolders, orderBy: $orderFolders, where: $where) {
    ...foldersData
  }
  allFiles (first: $firstFiles, jump: $jumpFiles, orderBy: $orderFiles, where: $where) {
      ...filesData
  }
  }
  ${fragments}

`;

export const folderQuery = gql`
  query oneFolder ($id: ID, $firstFolders: Int, $jumpFolders: Int, $where:JSON,
      $orderFolders:String, $firstFiles: Int, $jumpFiles: Int, $orderFiles:String){
      Folders (_id: $id){
        files (first: $firstFiles, jump: $jumpFiles, orderBy: $orderFiles, where: $where) {
          ...filesData
        }
        folders (first: $firstFolders, jump: $jumpFolders, orderBy: $orderFolders, where: $where) {
          ...foldersData
        }    
      }
    }
    ${fragments}
`;
