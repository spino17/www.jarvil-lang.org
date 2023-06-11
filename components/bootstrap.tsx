import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { Theme } from "@/utils/theme";

const ContainerWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  height: 100vh;
  overflow-y: scroll;
`;

export const noPaddingMarginStyle = {
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
};

export function BootstrapWrapper(props: { children: JSX.Element }) {
  return (
    <Container fluid style={noPaddingMarginStyle}>
      <ContainerWrapper>
        <Row style={noPaddingMarginStyle}>
          <Col style={noPaddingMarginStyle}>{props.children}</Col>
        </Row>
      </ContainerWrapper>
    </Container>
  );
}

export function BootstrapCenterWrapper(props: {
  theme: Theme;
  children: JSX.Element;
}) {
  return (
    <Container fluid style={noPaddingMarginStyle}>
      <ContainerWrapper theme={props.theme}>
        <Row className="justify-content-center" style={noPaddingMarginStyle}>
          <Col xs={11} md={10} style={noPaddingMarginStyle}>
            {props.children}
          </Col>
        </Row>
      </ContainerWrapper>
    </Container>
  );
}
