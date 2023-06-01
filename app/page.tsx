"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";
import { useInitWasmModule, useRunJarvilCode } from "@/hooks/playground";

const handleCodeAreaChange = (setInputText: (text: string) => void) => {
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  return handler;
};

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const isLoading = useInitWasmModule();
  const { isOutputLoading, setIsOutputLoading, output } =
    useRunJarvilCode(inputText);

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
            setIsOutputLoading(true);
          }}
        >
          Run
        </div>
        {isOutputLoading ? "running the code ...\n" : output}
      </div>
    );
  }
}
