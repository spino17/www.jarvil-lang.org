"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";
import init, { compile } from "../public/pkg/jarvil_wasm";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");
  useEffect(() => {
    const inner_func = async () => {
      await init(); // initialize the wasm module
      setIsLoading(false);
    };
    inner_func();
  }, []);

  function handleOnClickRun() {
    try {
      const result = compile(inputText);
      setResult(result);
      setError(null);
    } catch (error) {
      if (typeof error == "string") {
        setError("Error occured: " + error);
      } else {
        console.log(typeof error);
        console.log(error);
        setError("Something went wrong!");
      }
      setResult(null);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  if (isLoading) {
    return <div>loading ...</div>;
  } else {
    return (
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          style={{ border: "1px solid #ccc", padding: "10px" }}
        />
        <div
          onClick={() => {
            handleOnClickRun();
          }}
        >
          Run
        </div>
        {result ? result : error}
      </div>
    );
  }
}
