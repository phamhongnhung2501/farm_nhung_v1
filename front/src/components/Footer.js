import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row >
        <Col xs="12" className="text-right">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span href="/" className="text-center">
              Học viện Công nghệ Bưu chính Viễn Thông
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
