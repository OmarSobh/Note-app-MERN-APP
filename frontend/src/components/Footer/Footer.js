import React from 'react'
import { Col, Container, Navbar, NavbarBrand, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>

        <Row>
          <Col className="text-center py-3"><Navbar.Brand as={Link} to="/"><img src="https://media.easy.co.il/images/UserThumbs/10068364_1598730775197.png" style={{ width: 45 }} alt="Image" /></Navbar.Brand>
            <Navbar.Brand as={Link} to="/">Adasha Mekomet</Navbar.Brand>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Omar Subh & Ahmad AbuFani</Col>
        </Row>

      </Container>
    </footer>
  );
};
