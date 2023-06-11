"use client"; // This is a client component 👈🏽

import { useContext, useState } from "react";
import styled from "styled-components";
import { BootstrapCenterWrapper } from "@/components/bootstrap";
import localFont from "next/font/local";
import { LocalThemeContext } from "@/components/theme";

const consolasFont = localFont({
  src: "../public/Flux-Regular.otf",
  display: "swap",
  weight: "300",
});

const FlexDisplay = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const GlobalOpeningContentDiv = styled.div`
  height: 400px;
  width: 60%;
  margin-left: 70px;
  margin-top: 100px;
`;

const JarvilNameDiv = styled.div`
  font-size: 150px;
  font-weight: 1000;
  padding: 20px;
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
  color: ${(props) => props.theme.defaultFontColor};
`;

const DescriptionDiv = styled.div`
  font-size: 30px;
  color: ${(props) => props.theme.primaryFontColor};
  padding: 20px;
  padding-top: 50px;
  padding-right: 50px;
  line-height: 40px;
  font-weight: 300;
`;

export default function Home() {
  const { theme } = useContext(LocalThemeContext);
  return (
    <BootstrapCenterWrapper theme={theme}>
      <FlexDisplay>
        <GlobalOpeningContentDiv>
          <JarvilNameDiv className={consolasFont.className} theme={theme}>
            {"Jarvil"}
          </JarvilNameDiv>
          <DescriptionDiv theme={theme}>
            {
              "A programming language with syntactic resemblance to Python along with static type checking system."
            }
          </DescriptionDiv>
        </GlobalOpeningContentDiv>
      </FlexDisplay>
    </BootstrapCenterWrapper>
  );
}
