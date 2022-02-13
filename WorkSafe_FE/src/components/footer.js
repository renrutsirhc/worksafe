import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => (
    <footer className="bg-light p-3 text-center mt-3">
        <div className="logo">
            <hr></hr>
            <Col className="text-center py-3">&copy; WorkSafe NZ {new Date().getFullYear()}</Col>
            <Col className="text-center py-3">Powered by Team Awesomeness</Col>
        </div>
    </footer>
);

export default Footer;
