import axios from "axios";
import { QueryStringParamterType } from './types/types.js';

export function constructUrl(urlEndpoint:string, endpoint:string,queryParamters?:QueryStringParamterType[]){
    const url = new URL(`${urlEndpoint}/${endpoint}`);
    queryParamters?.forEach(({parameter, value})=>{
        url.searchParams.set(parameter,value);
    });
    return url.toString();
}

export async function executeAxiosGetRequest(urlEndpoint:string,endpoint:string, queryParamters:QueryStringParamterType[]){
    const url = constructUrl(urlEndpoint, endpoint, queryParamters);
    return await axios.get(url);
}

export async function executeAxiosPostRequest(urlEndpoint:string, endpoint:string,jsonData:Object){
    const url = constructUrl(urlEndpoint,endpoint);
    return await axios.post(url, jsonData);
}
