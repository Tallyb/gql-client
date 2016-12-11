import gql from 'graphql-tag';

export const loginMutation: any = gql`
    mutation login ($cred:JSON){
        UserLogin(credentials:$cred) 
    }
`;

