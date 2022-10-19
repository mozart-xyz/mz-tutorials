export const logApiResp = (resp: any) => {
  if (resp.err) {
    console.log("\n\n\n\n------response error -----");
    console.log("Response data: ", resp.err);
    console.log("------------------------------------");
  } else {
    console.log("\n\n\n\n------response data -----");
    console.log("Response data: ", resp.data);
    console.log("------------------------------------");
  }
}

export const logAppConfig = (argvStr: string) => {
  console.log("\n\n\n\n------application configuration-----");
  console.log(argvStr);
  console.log("------------------------------------");
}