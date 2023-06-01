import { loadPyodide } from "pyodide";
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
    resolveAfter3Seconds().then(() => {
      try {
        const result = compile(inputCode);
        resolve(result);
      } catch (error) {
        if (typeof error == "string") {
          resolve(error);
        } else {
          resolve(
            "Something went wrong! Please attach the code and raise an issue on `https://github.com/spino17/jarvil/issues`"
          );
        }
      }
    });
  });
}
