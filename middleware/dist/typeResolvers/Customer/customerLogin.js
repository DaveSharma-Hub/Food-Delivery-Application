import 'dotenv/config';
const url = process.env.DATABASE_LAYER_ENDPOINT;
export default async function customerLogin(parent, args, contextValue, info) {
    const { username, password, userType } = args;
    const endpoint = '/postUserLogin';
    const result = await contextValue.post(url, endpoint, {
        username: username,
        password: password,
        userType: userType
    });
    return result;
}
