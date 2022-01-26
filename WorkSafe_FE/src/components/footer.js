import React from "react";
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => (
      <footer className="bg-light p-3 text-center">
        <div className="logo" />
        <hr></hr>
        <p>
            <Col className='text-center py-3'>Copyright &copy; WorkSafe New Zealand</Col>
        </p>
      </footer>
    );

export default Footer;