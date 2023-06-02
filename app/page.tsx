"use client"; // This is a client component 👈🏽

import { useContext, useState } from "react";
import {
  useInitProgrammingEnviroment,
  useRunJarvilCode,
} from "@/hooks/playground";
import styled from "styled-components";
import { BootstrapCenterWrapper } from "@/components/bootstrap";
import { ThemeContext, consolasFont } from "./layout";

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

const StyledCodeEditorArea = styled.textarea`
  font-size: 15px;
  padding: 10px;
  width: 50%;
  resize: none;
  background-color: #0a0a0a;
  color: white;
  &:focus {
    outline: none;
  }
`;

const CodeEditorGlobalStyle = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  color: ${(props) => props.theme.defaultFontColor};
`;

const StyledEditorOuputArea = styled.div`
  text-align: left;
  width: 50%;
  border: red;
  height: 200px;
  background-color: yellow;
  padding: 10px;
  color: ${(props) => props.theme.secondaryFontColor};
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
  const { theme } = useContext(ThemeContext);
  return (
    <BootstrapCenterWrapper>
      {!isInitialized ? (
        <CodeEditorGlobalStyle theme={theme}>
          Initializing programming environment ...
        </CodeEditorGlobalStyle>
      ) : (
        <CodeEditorGlobalStyle theme={theme}>
          <StyledCodeEditorArea
            value={inputText}
            onChange={handleCodeAreaChange(setInputText)}
            // onKeyDown={handleKeyPress(setInputText)}
            rows={20}
            cols={50}
            className={consolasFont.className}
            theme={theme}
          />
          <div
            onClick={() => {
              setIsOutputLoading(true);
            }}
          >
            Run
          </div>
          <StyledEditorOuputArea
            style={{ whiteSpace: "pre-wrap" }}
            theme={theme}
          >
            {isOutputLoading ? (
              <div>"running the code ...\n"</div>
            ) : (
              <div>{output}</div>
            )}
          </StyledEditorOuputArea>
        </CodeEditorGlobalStyle>
      )}
    </BootstrapCenterWrapper>
  );
}
