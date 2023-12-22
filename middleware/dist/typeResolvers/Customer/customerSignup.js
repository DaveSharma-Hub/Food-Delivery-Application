import 'dotenv/config';
const url = process.env.DATABASE_LAYER_ENDPOINT;
export default async function customerSignup(parent, args, contextValue, info) {
    const { username, password, userType, firstName, lastName } = args;
    const endpoint = 'postUserSignup';
    const result = await contextValue.post(url, endpoint, {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userType: userType
    });
    console.log(result);
    return result.data;
}
