"use client"; // This is a client component 👈🏽

import { useContext, useState } from "react";
import {
  useInitProgrammingEnviroment,
  useRunJarvilCode,
} from "@/hooks/playground";
import styled from "styled-components";
import { BootstrapCenterWrapper } from "@/components/bootstrap";
import localFont from "next/font/local";
import { LocalThemeContext } from "@/components/theme";
import "./globals.css";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { jarvil } from "../utils/codemirror/core";
import { oneDark } from "@/utils/theme";
import { runParser } from "@/utils/codemirror/analysis";

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

const CodeOuputAreaWrapper = styled.div`
  text-align: left;
  border: red;
  height: 600px;
  background-color: #111212;
  padding: 20px;
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
    background-color: #313640;
  }
  width: 50px;
  height: 40px;
  padding: 10px;
`;

const StyledInitializationText = styled.div`
  color: white;
  font-weight: 400;
  width: 300px;
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
  background-color: #282c34;
`;

const EditorOutputBarWrapper = styled.div`
  background-color: #252626;
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
  const additionalEditorClass = "editor";
  const inheritClass = consolasFont.className;
  const combinedClasses = `${inheritClass} ${additionalEditorClass}`;
  // hljs.registerLanguage("python", python);

  /*
  <Editor
                    value={inputText}
                    onValueChange={(code) => setInputText(code)}
                    highlight={highlightCodeWithLineNumbers}
                    padding={{
                      top: 20,
                      left: 60,
                      right: 20,
                      bottom: 20,
                    }}
                    textareaId="codeArea"
                    className={combinedClasses}
                    insertSpaces={true}
                    tabSize={4}
                  />*/

  return (
    <BootstrapCenterWrapper theme={theme}>
      <div>{"Home page - WIP"}</div>
    </BootstrapCenterWrapper>
  );
}
