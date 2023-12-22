import { gql, useMutation } from "@apollo/client";

const USE_POST_CUSTOMER_SIGNUP = gql`
    mutation customerSignup($username: String, $password:String, $userType:String, $firstName: String, $lastName: String) {
        customerSignup(username: $username, password:$password, userType:$userType, firstName:$firstName, lastName:$lastName ) {
            loggedIn
            id
        }
    }
`;

export default function usePostSignupCustomer(){
    return useMutation(USE_POST_CUSTOMER_SIGNUP);
}