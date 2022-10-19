import axios from "axios";
import { getApiKey } from "../utils/cmd-args";

export enum HttpMethod {
  POST = "post",
  GET = "get",
  PATCH = "patch",
}

export const httpRequest = async (urlSuffix: string, method: HttpMethod, data: any = {}) => {
  const apiKey = getApiKey()
  const baseUrl = 'https://testnet.mozart.xyz/v1/'
  const url = baseUrl + urlSuffix


  const options = {
    method,
    url,
    headers: {'Content-Type': 'application/json', 'x-api-key': apiKey},
    data
  };

  try {
    const resp = await axios.request(options)
    return {data: resp.data, err: null}

  } catch (err) {
    return {data: null, err: err.response.data}
  }
}