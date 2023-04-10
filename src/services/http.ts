import axios from "axios";
import { getApiKey } from "../utils/cmd-args";

export enum HttpMethod {
  POST = "post",
  GET = "get",
  PATCH = "patch",
}

export const httpRequest = async (urlSuffix: string, method: HttpMethod, data: any = {}) => {
  const apiKey = getApiKey()
  console.log("API KEY: " + apiKey)
  // const baseUrl = 'https://testnet-api.mozart.xyz/v1/'
  const baseUrl = 'https://staging-api-ij1y.onrender.com/v1/'

  const url = baseUrl + urlSuffix


  const options = {
    method,
    url,
    headers: {'Content-Type': 'application/json', 'x-api-key': apiKey},
    data
  };

  try {
    console.log("PREVVV ")

    const resp = await axios.request(options)
    console.log("RESSSSS " + Object.keys(resp))

    return {data: resp.data, err: null}

  } catch (err) {
    console.log("ERRRRRR " + err)
    return {data: null, err: err?.response?.data}
  }
}