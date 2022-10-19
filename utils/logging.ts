export const logApiResp = (resp: any) => {
  console.log("\n\n\n\n------response data -----");
  console.log("Response data: ", resp);
  console.log("------------------------------------");
}

export const logAppConfig = (argvStr: string) => {
  console.log("\n\n\n\n------application configuration-----");
  console.log(argvStr);
  console.log("------------------------------------");
}