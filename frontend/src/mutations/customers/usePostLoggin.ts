import { gql, useMutation } from "@apollo/client";

const USE_POST_CUSTOMER_LOGIN = gql`
    mutation customerLogin($username: String!, $password:String!, $userType:String!) {
        customerLogin(username: $username, password:$password, userType:$userType ) {
            loggedIn
            id
        }
    }
`;

export default function usePostLoggin(){
    return useMutation(USE_POST_CUSTOMER_LOGIN);
}