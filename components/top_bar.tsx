"use client";

import { useContext } from "react";
import styled from "styled-components";
import { LocalThemeContext } from "./theme";
import localFont from "next/font/local";
import { TOP_BAR_OPTIONS } from "../utils/nav_data";
import Link from "next/link";
import "../app/globals.css";

const consolasFont = localFont({
  src: "../public/Flux-Regular.otf",
  display: "swap",
  weight: "300",
});

const GlobalTopBarStyle = styled.div`
  background-color: ${(props) => props.theme.primaryFontColor};
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  color: ${(props) => props.theme.defaultFontColor};
`;

const JarvilLogoAndNameDiv = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 30px;
  font-weight: 300;
  &:hover {
    cursor: pointer;
  }
`;

const TopBarOptionDiv = styled.div`
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.hoverColor};
  }
  font-weight: 400;
  font-size: 16px;
`;

export function TopBar() {
  const { theme } = useContext(LocalThemeContext);
  return (
    <GlobalTopBarStyle theme={theme}>
      <Link
        href="/"
        style={{ textDecoration: "none", color: "white", width: "15%" }}
      >
        <JarvilLogoAndNameDiv className={consolasFont.className}>
          {"Jarvil"}
        </JarvilLogoAndNameDiv>
      </Link>
      {TOP_BAR_OPTIONS.map((option) => {
        return (
          <Link
            href={option.route}
            style={{ textDecoration: "none", color: "white" }}
          >
            <TopBarOptionDiv theme={theme}>{option.title}</TopBarOptionDiv>
          </Link>
        );
      })}
    </GlobalTopBarStyle>
  );
}
