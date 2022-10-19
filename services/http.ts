import axios from "axios";
import { getApiKey } from "../utils/cmd-args";

export enum HttpMethod {
  POST = "post",
  GET = "get",
  PATCH = "patch",
}

export const httpRequest = async (urlSuffix: string, method: HttpMethod, data: any = {}) => {
  const apiKey = getApiKey()
  // TODO Change back to this
  // const baseUrl = 'https://testnet.mozart.xyz/v1/'
    const baseUrl = 'http://localhost:8080/v1/'
  const url = baseUrl + urlSuffix

  console.log('URL ==== ', url)

  const options = {
    method,
    url,
    headers: {'Content-Type': 'application/json', 'x-api-key': apiKey},
    data
  };

  try {
    const resp = await axios.request(options)
    console.log(resp.data)
    return resp.data

  } catch (err) {
    console.error(err);
    return err
  }
}