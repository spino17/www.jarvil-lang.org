import { useEffect, useState } from "react";
import init from "../public/pkg/jarvil_wasm";
import { JarvilCodeExecutionResult, runJarvilCode } from "@/utils/playground";
import { loadPyodide } from "../public";

interface InitializerResult {
  isInitialized: boolean;
  pyodide: any;
}

export function useInitProgrammingEnviroment(): InitializerResult {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [pyodide, setPyodide] = useState<any | null>(null);
  useEffect(() => {
    const inner_func = async () => {
      await init(); // load the jarvil-wasm module
      let pyodideObject = await loadPyodide(); // load the python-wasm (Pyodide) module
      setPyodide(pyodideObject);
      setIsInitialized(true);
    };
    inner_func();
  }, []);

  return { isInitialized, pyodide };
}

export function useRunJarvilCode(inputText: string, pyodide: any) {
  const [isOutputLoading, setIsOutputLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<JarvilCodeExecutionResult | null>(null);
  useEffect(() => {
    if (isOutputLoading) {
      const inner_func = async () => {
        const result = await runJarvilCode(inputText, pyodide);
        setOutput(result);
        setIsOutputLoading(false);
      };
      inner_func();
    }
  }, [isOutputLoading]);

  return { isOutputLoading, setIsOutputLoading, output };
}
