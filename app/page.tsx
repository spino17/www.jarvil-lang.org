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
import CodeMirror from "@uiw/react-codemirror";
import { python as py } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import Prism from "prismjs";

const consolasFont = localFont({
  src: "../public/Consolas.ttf",
  display: "swap",
  weight: "300",
});

const CodeEditorGlobalWrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  color: ${(props) => props.theme.defaultFontColor};
  overflow: auto;
`;

const CodeAreaWrapper = styled.div`
  overflow: auto;
  height: 600px;
  &:focus {
    outline: none;
  }
  text-align: left;
`;
// width: 30%;
// margin-right: 20px;
const CodeOuputAreaWrapper = styled.div`
  text-align: left;
  border: red;
  height: 600px;
  background-color: #252626;
  padding: 10px;
  font-size: 15px;
  color: ${(props) => props.theme.defaultFontColor};
  overflow: auto;
  border-left: 1px solid #000;
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

const StyledOutputText = styled.div`
  font-weight: 400;
  width: 100px;
  height: 40px;
  padding: 10px;
`;

const EditorConfigBarWrapper = styled.div`
  background-color: #121212;
`;

const EditorOutputBarWrapper = styled.div`
  background-color: #313333;
`;

const CodeEditorAreaGlobalWrapper = styled.div`
  width: 65%;
  margin-left: 20px;
`;

const CodeOutputAreaGlobalWrapper = styled.div`
  width: 35%;
  margin-right: 20px;
`;

function highlightCodeWithLineNumbers(code: string): React.ReactNode {
  let x = hljs
    .highlight(code, {
      language: "python",
      ignoreIllegals: true,
    })
    .value.split("\n");
  x.push("");
  return x
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");
}

function RenderOutputWrapper(output: string): string {
  let outputLines = output.split("\n");
  return outputLines
    .map((line) => `<div class='output'>${line}</div>`)
    .join("\n");
}

export default function Home() {
  const [inputText, setInputText] = useState<string>(
    'def main():\n    # start writing your code here\n    print("Hello, World")'
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
              <CodeEditorAreaGlobalWrapper>
                <EditorConfigBarWrapper>
                  <StyledRunButton
                    onClick={() => {
                      setIsOutputLoading(true);
                    }}
                  >
                    Run
                  </StyledRunButton>
                </EditorConfigBarWrapper>
                <CodeAreaWrapper>
                  <Editor
                    value={inputText}
                    onValueChange={(code) => setInputText(code)}
                    highlight={highlightCodeWithLineNumbers}
                    padding={50}
                    textareaId="codeArea"
                    className={combinedClasses}
                    insertSpaces={true}
                    tabSize={4}
                  />
                </CodeAreaWrapper>
              </CodeEditorAreaGlobalWrapper>
              <CodeOutputAreaGlobalWrapper>
                <EditorOutputBarWrapper>
                  <StyledOutputText>{"OUTPUT"}</StyledOutputText>
                </EditorOutputBarWrapper>
                <CodeOuputAreaWrapper theme={theme}>
                  {isOutputLoading ? (
                    <div>{"Running the code ...\n"}</div>
                  ) : output ? (
                    // TODO - use output.kind to add extra information on the output
                    <div
                      dangerouslySetInnerHTML={{
                        __html: RenderOutputWrapper(output.msg),
                      }}
                    />
                  ) : null}
                </CodeOuputAreaWrapper>
              </CodeOutputAreaGlobalWrapper>
            </FlexDisplay>
          </CodeEditorGlobalWrapper>
        </div>
      )}
    </BootstrapCenterWrapper>
  );
}
