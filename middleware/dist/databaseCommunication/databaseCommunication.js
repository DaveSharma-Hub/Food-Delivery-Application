import axios from "axios";
export function constructUrl(urlEndpoint, endpoint, queryParamters) {
    const url = new URL(`${urlEndpoint}/${endpoint}`);
    queryParamters?.forEach(({ parameter, value }) => {
        url.searchParams.set(parameter, value);
    });
    return url.toString();
}
export async function executeAxiosGetRequest(urlEndpoint, endpoint, queryParamters) {
    const url = constructUrl(urlEndpoint, endpoint, queryParamters);
    return await axios.get(url);
}
export async function executeAxiosPostRequest(urlEndpoint, endpoint, jsonData) {
    const url = constructUrl(urlEndpoint, endpoint);
    return await axios.post(url, jsonData);
}
