"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";
import init, { compile } from "../public/pkg/jarvil_wasm";
import { runJarvilCode } from "@/utils/playground";

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
}

function handleRun(setIsOutputLoading: (isLoading: boolean) => void) {
  setIsOutputLoading(true);
}

const handleCodeAreaChange = (setInputText: (text: string) => void) => {
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  return handler;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOutputLoading, setIsOutputLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  // initialize wasm module as playground first renders
  useEffect(() => {
    const inner_func = async () => {
      await init(); // initialize the wasm module
      setIsLoading(false);
    };
    inner_func();
  }, []);

  useEffect(() => {
    if (isOutputLoading) {
      const inner_func = async () => {
        try {
          // await resolveAfter3Seconds();
          const result = await runJarvilCode(inputText); // initialize the wasm module
          setOutput(result);
          setIsOutputLoading(false);
        } catch (error) {
          const err_msg = error as string;
          setOutput(err_msg);
          setIsOutputLoading(false);
        }
      };
      inner_func();
    }
  }, [isOutputLoading]);

  if (isLoading) {
    return <div>loading ...</div>;
  } else {
    return (
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleCodeAreaChange(setInputText)}
          style={{ border: "1px solid #ccc", padding: "10px", width: "500px" }}
        />
        <div
          onClick={() => {
            handleRun(setIsOutputLoading);
          }}
        >
          Run
        </div>
        {isOutputLoading ? "running the code ...\n" : output}
      </div>
    );
  }
}
