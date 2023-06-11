"use client";

import { BootstrapCenterWrapper } from "@/components/bootstrap";
import { LocalThemeContext } from "@/components/theme";
import { useContext } from "react";
import styled from "styled-components";
import NavBar from "@/components/docs/nav_bar";

const FlexDisplayDiv = styled.div`
  display: flex;
`;

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(LocalThemeContext);
  return (
    <BootstrapCenterWrapper theme={theme}>
      <FlexDisplayDiv>
        <NavBar />
        {children}
      </FlexDisplayDiv>
    </BootstrapCenterWrapper>
  );
}
