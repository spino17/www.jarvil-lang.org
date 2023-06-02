"use client"; // This is a client component 👈🏽

import { useContext, useState } from "react";
import {
  useInitProgrammingEnviroment,
  useRunJarvilCode,
} from "@/hooks/playground";
import styled from "styled-components";
import { BootstrapCenterWrapper } from "@/components/bootstrap";
import Editor from "react-simple-code-editor";
import localFont from "next/font/local";
import { LocalThemeContext } from "@/components/theme";
import "./globals.css";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python"; // Import the language modulez
import "highlight.js/styles/atom-one-dark.css";

const consolasFont = localFont({
  src: "../public/Consolas.ttf",
  display: "swap",
  weight: "300",
});

// event-handlers
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

const CodeEditorGlobalWrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  color: ${(props) => props.theme.defaultFontColor};
`;

const EditorWrapper = styled.div`
  overflow: auto;
  height: 600px;
  width: 70%;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
`;

const StyledEditorOuputArea = styled.div`
  text-align: left;
  border: red;
  width: 30%;
  height: 600px;
  background-color: #252626;
  padding: 10px;
  color: ${(props) => props.theme.defaultFontColor};
  overflow: auto;
  border-left: 1px solid #000;
  margin-right: 20px;
`;

const FlexDisplay = styled.div`
  display: flex;
  width: 100%;
`;

const StyledRunButton = styled.div`
  color: #228b22;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    background-color: #1f1f1f;
  }
  width: 50px;
  height: 40px;
  padding: 10px;
`;

const ConfigBarGlobalWrapper = styled.div`
  background-color: #121212;
`;

export default function Home() {
  const [inputText, setInputText] = useState<string>(
    'def main():\n    // start writing your code here\n    print("Hello, World")'
  );
  const { isInitialized, pyodide } = useInitProgrammingEnviroment();
  const { isOutputLoading, setIsOutputLoading, output } = useRunJarvilCode(
    inputText,
    pyodide
  );
  const { theme } = useContext(LocalThemeContext);
  const additionalClass = "editor";
  const inheritClass = consolasFont.className;
  const combinedClasses = `${inheritClass} ${additionalClass}`;
  hljs.registerLanguage("python", python);

  return (
    <BootstrapCenterWrapper theme={theme}>
      {!isInitialized ? (
        <CodeEditorGlobalWrapper theme={theme}>
          {"Initializing programming environment ..."}
        </CodeEditorGlobalWrapper>
      ) : (
        <div>
          <CodeEditorGlobalWrapper theme={theme}>
            <FlexDisplay>
              <EditorWrapper>
                <ConfigBarGlobalWrapper>
                  <StyledRunButton
                    onClick={() => {
                      setIsOutputLoading(true);
                    }}
                  >
                    Run
                  </StyledRunButton>
                </ConfigBarGlobalWrapper>
                <Editor
                  value={inputText}
                  onValueChange={(code) => setInputText(code)}
                  highlight={(code) => {
                    return hljs.highlight(code, {
                      language: "python",
                      ignoreIllegals: true,
                    }).value;
                  }}
                  padding={10}
                  className={combinedClasses}
                  insertSpaces={true}
                  tabSize={4}
                />
              </EditorWrapper>
              <StyledEditorOuputArea
                style={{ whiteSpace: "pre-wrap" }}
                theme={theme}
              >
                {isOutputLoading ? (
                  <div>{"running the code ...\n"}</div>
                ) : (
                  <div>{output}</div>
                )}
              </StyledEditorOuputArea>
            </FlexDisplay>
          </CodeEditorGlobalWrapper>
        </div>
      )}
    </BootstrapCenterWrapper>
  );
}
