import yargs from "yargs/yargs";

// TODO Consider using yargs instead
export const getApiKey = () => {
  for (const param of process.argv) {
    const isApiKey = checkIsApiKey(param)
    if (isApiKey) {
      const apiKey = param.slice(10)
      return apiKey
    }
  }
  return ""
}

const checkIsApiKey = (param) => {
  if (param.length < 10) {
    return false
  }
  const expected = '--api-key='
  const header = param.slice(0, expected.length)
  if (header != expected) {
    return false
  }
  return true
}

export const getCmdArgs = (additionalOptions) => {

  const options =  {
    "api-key": {
      type: "string",
      required: true,
    },
  }

  for (const item of additionalOptions) {
    const key = Object.keys(item)[0]
    options[key] = item[key]
  }

  console.log("OPTIONS === ", options)
  

  const argv = yargs(process.argv.slice(2))
    .options({
          path: {
            type: "string",
            required: true,
          },
          name: {
            type: "string",
            default: "",
          },
          "api-key": {
            type: "string",
            required: true,
          },
        })
    .help()
    .alias("help", "h").argv;

  console.log("------application configuration-----");
  console.log(JSON.stringify(argv, null, 2));
  console.log("------------------------------------");
  return argv
}

