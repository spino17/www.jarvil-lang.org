import { compile } from "../public/pkg";

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
}

export async function runJarvilCode(inputCode: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const result = compile(inputCode);
      resolveAfter3Seconds()
        .then(() => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
      // call `pyodide` async call to run the python code!
    } catch (error) {
      if (typeof error == "string") {
        reject(error);
      } else {
        reject(
          "Something went wrong! Please attach the code and raise an issue on `https://github.com/spino17/jarvil/issues`"
        );
      }
    }
  });
}
