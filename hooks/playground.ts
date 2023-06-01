import { useEffect, useState } from "react";
import init from "../public/pkg/jarvil_wasm";
import { runJarvilCode } from "@/utils/playground";

export function useInitWasmModule(): boolean {
  const [isWasmModuleLoading, setIsWasmModuleLoading] = useState<boolean>(true);
  useEffect(() => {
    const inner_func = async () => {
      await init();
      setIsWasmModuleLoading(false);
    };
    inner_func();
  }, []);

  return isWasmModuleLoading;
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
