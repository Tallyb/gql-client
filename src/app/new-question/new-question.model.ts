import { Document } from 'graphql';

import gql from 'graphql-tag';

export const newQuestionMutation: Document = gql`
    mutation newQ ($obj: JSON) {
        QuestionsCreate (data:$obj) 
    }
`;