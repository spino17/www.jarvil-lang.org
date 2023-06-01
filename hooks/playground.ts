import { useEffect, useState } from "react";
import init from "../public/pkg/jarvil_wasm";
import { runJarvilCode } from "@/utils/playground";
import { loadPyodide } from "../public";

export function useInitProgrammingEnviroment(): boolean {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  useEffect(() => {
    const inner_func = async () => {
      await init(); // load the jarvil-wasm module
      let pyodide = await loadPyodide();
      console.log(
        pyodide.runPython(`
    print("Hello, World dasjdnsjdjs")
  `)
      );
      setIsInitialized(true);
    };
    inner_func();
  }, []);

  return isInitialized;
}

export function useRunJarvilCode(inputText: string) {
  const [isOutputLoading, setIsOutputLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  useEffect(() => {
    if (isOutputLoading) {
      const inner_func = async () => {
        const result = await runJarvilCode(inputText);
        setOutput(result);
        setIsOutputLoading(false);
      };
      inner_func();
    }
  }, [isOutputLoading]);

  return { isOutputLoading, setIsOutputLoading, output };
}
