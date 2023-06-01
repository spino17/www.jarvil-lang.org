import { loadPyodide } from "@/public";
import { compile } from "../public/pkg";

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
}

function getPythonCodeTemplate(code: string): string {
  var code = JSON.stringify(code);
  let pyCodeTemplate =
    `
import sys, io, traceback
namespace = {}  # use separate namespace to hide run_code, modules, etc.
def run_code(code):
  """run specified code and return stdout and stderr"""
  out = io.StringIO()
  oldout = sys.stdout
  olderr = sys.stderr
  sys.stdout = sys.stderr = out
  try:
    exec(code, {})
  except:
    traceback.print_exc()
  sys.stdout = oldout
  sys.stderr = olderr
  return out.getvalue()

run_code(` +
    code +
    `)`;
  return pyCodeTemplate;
}

export async function runJarvilCode(inputCode: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const result = compile(inputCode);
      loadPyodide().then((pyodide) => {
        pyodide
          .runPythonAsync(getPythonCodeTemplate(`print("Hello World")`))
          .then((result: string) => {
            resolve(result);
          })
          .catch((error: Error) => {
            // Python runtime error
            resolve(error.message);
          });
      });
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
}
