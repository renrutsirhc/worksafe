import React from "react";
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => (
      <footer className="bg-light p-3 text-center">
        <div className="logo" />
        <hr></hr>
        <p>
            <Col className='text-center py-3'>&copy; WorkSafe NZ</Col>
            <Col className='text-center py-3'>Powered by Team Awesomeness</Col>
        </p>
      </footer>
    );

export default Footer;