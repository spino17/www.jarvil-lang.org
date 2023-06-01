"use client"; // This is a client component 👈🏽

import { useState } from "react";
import {
  useInitProgrammingEnviroment,
  useRunJarvilCode,
} from "@/hooks/playground";

const handleCodeAreaChange = (setInputText: (text: string) => void) => {
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  return handler;
};

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const { isInitialized, pyodide } = useInitProgrammingEnviroment();
  const { isOutputLoading, setIsOutputLoading, output } = useRunJarvilCode(
    inputText,
    pyodide
  );
  if (!isInitialized) {
    return <div>Initializing programming environment ...</div>;
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
            setIsOutputLoading(true);
          }}
        >
          Run
        </div>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {isOutputLoading ? "running the code ...\n" : output}
        </div>
      </div>
    );
  }
}
