import styled from "styled-components";
import {
  DocsNavBarEntryShape,
  NAV_BAR_STRUCTURE,
} from "../../utils/docs/nav_data";
import { useContext, useState } from "react";
import StyledLink from "../link";
import { ArrowForwardIcon, ArrowUpwardIcon } from "../icons";
import { LocalThemeContext } from "../theme";

const FlexStyled = styled.div`
  display: flex;
`;

const NavBarTabStyle = styled.div<{
  leftPaddingValue: string;
  isLeaf: boolean;
}>`
  width: 100%;
  padding-left: ${(props) => props.leftPaddingValue}px;
  padding-right: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 300;
  border-bottom: 1px solid #343636;
  color: ${(props) => props.theme.defaultFontColor};
  display: flex;
  &:hover {
    background-color: #343636;
    cursor: pointer;
  }
`;

const RecursiveNavBarOpenStyle = styled.div`
  background-color: #1c2633;
  border-bottom: 1px solid #5b77a3;
`;

const NavBarGlobalStyle = styled.div`
  width: 18%;
  height: 100vh;
  background-color: ${(props) => props.theme.lighterBackgroundColor};
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  overflow: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function DropDownArrowIcon(props: { isOpen: boolean | null }) {
  return (
    <div>
      {props.isOpen ? (
        <ArrowUpwardIcon size={20} />
      ) : (
        <ArrowForwardIcon size={20} />
      )}
    </div>
  );
}

function NavBarTab(props: {
  tabName: string;
  onClickFunc: React.MouseEventHandler<HTMLDivElement>;
  level: number;
  isOpen: boolean | null;
  isLeaf: boolean;
}) {
  var leftPaddingValue = (20 + props.level * 20).toString();
  const { theme } = useContext(LocalThemeContext);
  return (
    <NavBarTabStyle
      onClick={props.onClickFunc}
      leftPaddingValue={leftPaddingValue}
      isLeaf={props.isLeaf}
      theme={theme}
    >
      <FlexStyled>
        <div>{props.tabName}</div>
        {props.isOpen == null ? null : (
          <DropDownArrowIcon isOpen={props.isOpen} />
        )}
      </FlexStyled>
    </NavBarTabStyle>
  );
}

function RecursiveNavBarTab(props: {
  name: string;
  data: DocsNavBarEntryShape[] | null;
  level: number;
  route: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function dropDown() {
    setIsOpen(!isOpen);
  }

  if (props.data == null) {
    return (
      <StyledLink href={`${props.route}`}>
        <NavBarTab
          tabName={props.name}
          onClickFunc={dropDown}
          level={props.level}
          isOpen={null}
          isLeaf={true}
        />
      </StyledLink>
    );
  }

  if (isOpen) {
    return (
      <RecursiveNavBarOpenStyle>
        <NavBarTab
          tabName={props.name}
          onClickFunc={dropDown}
          level={props.level}
          isOpen={true}
          isLeaf={false}
        />
        {props.data.map((item) => {
          return (
            <div>
              <RecursiveNavBarTab
                name={item["name"]}
                data={item["_sub_data"]}
                level={props.level + 1}
                route={item["route"]}
              />
            </div>
          );
        })}
      </RecursiveNavBarOpenStyle>
    );
  } else {
    return (
      <NavBarTab
        tabName={props.name}
        onClickFunc={dropDown}
        level={props.level}
        isOpen={false}
        isLeaf={false}
      />
    );
  }
}

export default function NavBar() {
  const { theme } = useContext(LocalThemeContext);
  return (
    <NavBarGlobalStyle theme={theme}>
      {NAV_BAR_STRUCTURE.map((item) => {
        return (
          <RecursiveNavBarTab
            name={item["name"]}
            data={item["_sub_data"]}
            level={0}
            route={item["route"]}
          />
        );
      })}
    </NavBarGlobalStyle>
  );
}
