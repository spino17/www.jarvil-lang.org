import { compile } from "../public/pkg";

function getPythonCodeTemplate(code: string): string {
  // This template wraps the code in order to redirect stdout for displaying it
  // on UI instead of console (which is default behaviour of `Pyodide`).
  var code = JSON.stringify(code);
  let pyCodeTemplate =
    `
import sys, io, traceback
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

export async function runJarvilCode(
  inputCode: string,
  pyodide: any
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const pyCode = compile(inputCode); // do static checks and generate python code using Jarvil compiler
      pyodide
        .runPythonAsync(getPythonCodeTemplate(pyCode)) // run the generated code using Pyodide compiler
        .then((result: string) => {
          // `stdout`
          resolve(result);
        })
        .catch((error: Error) => {
          // Python runtime error
          resolve(error.message);
        });
    } catch (error) {
      // Jarvil static type-checking error
      if (typeof error == "string") {
        console.log(error);
        var formattedError = error.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        resolve(formattedError);
      } else {
        resolve(
          "Something went wrong! Please attach the code and raise an issue on `https://github.com/spino17/jarvil/issues`"
        );
      }
    }
  });
}
