"use client"; // This is a client component 👈🏽

import { useContext } from "react";
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
  height: 300px;
  width: 60%;
  margin-left: 70px;
  margin-top: 100px;
`;

const GlobalGetStartedDiv = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  width: 40%;
  margin-top: 70px;
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
  font-weight: 200;
`;

const GetStartedButtonDiv = styled.div`
  font-size: 20px;
  border-radius: 2px;
  background-color: #fddd00;
  width: 50%;
  padding: 40px;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: 350;
  height: fit-content;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #f5d500;
  }
`;

const WhyJarvilGlobalDiv = styled.div`
  background-color: white;
  height: 700px;
  padding-top: 50px;
`;

const WhyJarvilContentGlobalDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  padding-top: 40px;
`;

const WhyJarvilTextDiv = styled.div`
  text-align: center;
  padding: 30px;
  color: black;
  font-size: 50px;
  font-weight: 200;
`;

const WhyJarvilContentDiv = styled.div`
  padding: 10px;
  margin: 10px;
  height: 300px;
  width: 30%;
`;

const WhyJarvilContentHeadingDiv = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 400;
`;

const WhyJarvilContentTextDiv = styled.div`
  padding: 30px;
  font-size: 20px;
  line-height: 25px;
  font-weight: 300;
`;

export default function Home() {
  const { theme } = useContext(LocalThemeContext);
  return (
    <BootstrapCenterWrapper theme={theme}>
      <div>
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
          <GlobalGetStartedDiv>
            <GetStartedButtonDiv theme={theme}>
              {"Get Started"}
            </GetStartedButtonDiv>
          </GlobalGetStartedDiv>
        </FlexDisplay>
        <WhyJarvilGlobalDiv>
          <WhyJarvilTextDiv>
            Why <span className={consolasFont.className}>Jarvil</span> ?
          </WhyJarvilTextDiv>
          <WhyJarvilContentGlobalDiv>
            <WhyJarvilContentDiv>
              <WhyJarvilContentHeadingDiv>
                {"Type Checking"}
              </WhyJarvilContentHeadingDiv>
              <WhyJarvilContentTextDiv>
                {
                  "Jarvil comes with a static type-checking system which catch errors at compile time rather than runtime! To achieve this Jarvil provides syntax for type annotations. It can automatically infer types wherever possible."
                }
              </WhyJarvilContentTextDiv>
            </WhyJarvilContentDiv>
            <WhyJarvilContentDiv>
              <WhyJarvilContentHeadingDiv>
                {"Transpiles to Python"}
              </WhyJarvilContentHeadingDiv>
              <WhyJarvilContentTextDiv>
                {
                  "Jarvil transpiles to clean formatted Python code which you can trust does not have any type related bugs. This also lets you gradually integrate jarvil in your existing Python projects."
                }
              </WhyJarvilContentTextDiv>
            </WhyJarvilContentDiv>
            <WhyJarvilContentDiv>
              <WhyJarvilContentHeadingDiv>
                {"Modern features"}
              </WhyJarvilContentHeadingDiv>
              <WhyJarvilContentTextDiv>
                {
                  "Jarvil adds modern features like lambda support, structural-typing, error-tolerant lossless parsing, distinct namespaces, conditional and loop blocks scoping and much more."
                }
              </WhyJarvilContentTextDiv>
            </WhyJarvilContentDiv>
          </WhyJarvilContentGlobalDiv>
        </WhyJarvilGlobalDiv>
      </div>
    </BootstrapCenterWrapper>
  );
}
