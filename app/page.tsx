"use client"; // This is a client component 👈🏽

import { useEffect, useRef, useState } from "react";
import {
  useInitProgrammingEnviroment,
  useRunJarvilCode,
} from "@/hooks/playground";
import AnsiToHtml from "ansi-to-html";

const AnsiToHtmlConverter = new AnsiToHtml();

const AnsiToHtmlComponent = (prop: { ansiString: string }) => {
  const htmlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (htmlRef.current) {
      htmlRef.current.innerHTML = AnsiToHtmlConverter.toHtml(prop.ansiString);
    }
  }, [prop.ansiString]);

  return <div ref={htmlRef} />;
};

const handleCodeAreaChange = (setInputText: (text: string) => void) => {
  const handler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };
  return handler;
};

const handleKeyPress = (setInputText: (text: string) => void) => {
  // TODO - add logic for auto-indentation
  const handler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key

      const textarea = event.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd } = textarea;
      const currentText = textarea.value;

      // Insert indentation before the current cursor position
      const indentedText =
        currentText.slice(0, selectionStart) +
        "\n    " +
        currentText.slice(selectionStart);
      setInputText(indentedText);

      // Move the cursor to the correct position after indentation
      const updatedCursorPos = selectionStart + 2;
      textarea.setSelectionRange(updatedCursorPos, updatedCursorPos);
    }
  };

  return handler;
};

export default function Home() {
  const [inputText, setInputText] = useState<string>(
    'def main():\n    // start writing your code here\n    print("Hello, World")'
  );
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
        <textarea
          value={inputText}
          onChange={handleCodeAreaChange(setInputText)}
          // onKeyDown={handleKeyPress(setInputText)}
          rows={30}
          cols={100}
        />
        <div
          onClick={() => {
            setIsOutputLoading(true);
          }}
        >
          Run
        </div>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {isOutputLoading ? (
            <div>"running the code ...\n"</div>
          ) : (
            <div>{output}</div>
          )}
        </div>
      </div>
    );
  }
}
