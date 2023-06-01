import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  background-color: #151c26;
  height: 100vh;
`;

export function BootstrapWrapper(props: { children: JSX.Element }) {
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <ContainerWrapper>
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </ContainerWrapper>
    </Container>
  );
}

export function BootstrapCenterWrapper(props: { children: JSX.Element }) {
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row
        className="justify-content-center"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <Col xs={11} md={10} style={{ paddingLeft: 0, paddingRight: 0 }}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}
