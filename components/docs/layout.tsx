import styled from "styled-components";
import { useContext } from "react";
import { LocalThemeContext } from "../theme";
import localFont from "next/font/local";

const consolasFont = localFont({
  src: "../../public/Segoe-UI.ttf",
  display: "swap",
  weight: "200",
});

const DocsPageHeadingDiv = styled.div`
  color: ${(props) => props.theme.defaultFontColor};
  font-size: 70px;
  margin-top: 20px;
  font-weight: 300;
  padding-bottom: 30px;
  padding-top: 30px;
  margin-bottom: 40px;
`;

const PageGlobalDiv = styled.div`
  padding-left: 30px;
  color: ${(props) => props.theme.defaultFontColor};
`;

const PageContentGlobalDiv = styled.div`
  width: 80%;
  font-size: 16px;
  line-height: 25px;
`;

export function DocsPageLayout(props: {
  children: React.ReactNode;
  heading: string;
}) {
  const { theme } = useContext(LocalThemeContext);
  return (
    <PageGlobalDiv theme={theme}>
      <DocsPageHeadingDiv theme={theme} className={consolasFont.className}>
        {props.heading}
      </DocsPageHeadingDiv>
      <PageContentGlobalDiv className={consolasFont.className}>
        {props.children}
      </PageContentGlobalDiv>
    </PageGlobalDiv>
  );
}
