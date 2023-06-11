"use client";

import { BootstrapWrapper } from "@/components/bootstrap";
import { LocalThemeContext } from "@/components/theme";
import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import NavBar from "@/components/docs/nav_bar";
import { DocsThemeShape, docsThemeData } from "@/utils/theme";

type ThemeContextType = {
  theme: DocsThemeShape;
};

export const DocsThemeContext = React.createContext<ThemeContextType>({
  theme: docsThemeData,
});

type ThemeProviderProps = {
  theme: DocsThemeShape;
  children: React.ReactNode;
};

export const DocsThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

const FlexDisplayDiv = styled.div`
  display: flex;
`;

const PageGlobalStyledDiv = styled.div`
  padding: 20px;
  width: 82%;
  overflow: auto;
  height: 90vh;
`;

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(LocalThemeContext);
  return (
    <BootstrapWrapper theme={theme}>
      <FlexDisplayDiv>
        <NavBar />
        <PageGlobalStyledDiv>
          <DocsThemeProvider theme={docsThemeData}>
            {children}
          </DocsThemeProvider>
        </PageGlobalStyledDiv>
      </FlexDisplayDiv>
    </BootstrapWrapper>
  );
}
