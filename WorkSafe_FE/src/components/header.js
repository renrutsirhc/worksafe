// src/components/nav-bar.js

import React, { useState } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

import AuthenticationButton from "../components/authentication-button";
import ProfileIcon from "../components/profile-icon";

const Header = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expanded={expanded} sticky="top" collapseOnSelect expand="md" className="header">
            <Container>
                <Navbar.Brand className="header-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 54">
                        <g fill="currentColor">
                            <path d="M58.1 7.45a8 8 0 0 1 7.9 7.18 2.72 2.72 0 0 1 .63-.08A2.46 2.46 0 0 1 69 16.26a5.75 5.75 0 0 0 0-.83 11 11 0 1 0-.58 3.47v-.16a3 3 0 0 0 0-.6 2.16 2.16 0 0 0-4.3-.1v.1a2.19 2.19 0 0 0 .55 1.44 8 8 0 1 1-6.76-12.11m0-7.09a15 15 0 1 1-15 15.06 15.07 15.07 0 0 1 15-15m0 27.09A12 12 0 1 0 46 15.28v.13a12.07 12.07 0 0 0 12 12.05M131.51.9h-4.28l-11.35 10.8V.79h-3v17.83zM125 12.69L137.43.9h-4.33L121 12.38l13.33 17.45h3.76zm-12.2 7.49v9.65h3v-8.37l4.07-3.86 9.35 12.23H133l-12.72-16.69zm-4.08 9.65h3V.79h-2.92zM98.07 19.19A9.89 9.89 0 0 0 94 .27H76.16v29.56h3V3.29h14.93a6.91 6.91 0 1 1 .53 13.81H93l8.86 12.76h3.63zm-6.49-2.12H80.23v12.76h3.07V20.1h6.89L97 29.83h3.63zM83.3 13h10.86a2.82 2.82 0 1 0 0-5.64H83.3zm16.7-2.81A5.82 5.82 0 0 1 94.16 16H80.25V4.36h13.84a5.82 5.82 0 0 1 5.81 5.8M39.52.79h-3.08L31 17.63 26.16.79H23l7.88 27.06zm-25 29h3.11l4.75-16.38 4.82 16.42h3.11L22.43 2.75zM1 .79l9.34 29h3.13L4.15.79zm20.87 0h-3.12l-4.86 16.84L8.43.79H5.3L14 27.85zm18.87 0h3.13l-9.34 29h-3.11z"></path>
                            <path d="M229.39.79v29H254v-3h-21.55v-23h21.31v-3zm4.08 4.12v9.87h17.61v-3h-14.59V7.86h17.22V4.91zm0 11v9.89H254v-3h-17.54v-3.95h14.59v-3zm-31.14 14h3V3.77h21.31v-3H202.3zm4.09-15.08H224v-3h-14.57v-4h17.19V4.91h-20.2zm0 15.08h3v-11H224v-3h-17.58zM179 .84l-13.36 29h3.24l13.36-29zm0 16.91h7.85l-3.93-8.51zm12.52 3h-17.24l8.59-18.65zM186.8.84h-3.24l13.23 29H200zm-13 21.07l-3.68 8h3.24l2.32-5.06H190l2.31 5h3.24l-3.7-8zm-13-8.56a27.05 27.05 0 0 0-7.75-1.62 22.14 22.14 0 0 1-5.58-1.08c-.87-.38-.87-.64-.87-1.17 0-.29 0-.6.68-1a10.23 10.23 0 0 1 5-.91c2.59 0 5.51.41 7.33 3.37l2.54-1.62c-2-3.24-5.14-4.78-9.87-4.78-7.54 0-8.67 3.06-8.67 4.86a3.94 3.94 0 0 0 2.65 3.91 24.38 24.38 0 0 0 6.49 1.31 25.05 25.05 0 0 1 6.89 1.45 5.18 5.18 0 0 1 3.26 5 5.25 5.25 0 0 1-2.66 4.72 15.49 15.49 0 0 1-7.91 1.62c-5.92 0-9.73-2-11.77-6.18l-2.69 1.3a13 13 0 0 0 5.36 5.77 18.44 18.44 0 0 0 9.15 2.11 18.07 18.07 0 0 0 9.48-2.09 8.29 8.29 0 0 0 4.14-7.2 8.4 8.4 0 0 0-1.51-5 9 9 0 0 0-3.64-2.86m-8.42 13.07c-5.45 0-9-1.81-10.78-5.56l2.69-1.3c.88 1.8 2.58 3.88 8.11 3.88a11.33 11.33 0 0 0 5.77-1 1.21 1.21 0 0 0 .71-1.23c0-.68 0-1-1-1.36a22.14 22.14 0 0 0-5.7-1.11 27.07 27.07 0 0 1-7.6-1.62 8.2 8.2 0 0 1-.86-14.78 19.89 19.89 0 0 1 16.7 0 13.49 13.49 0 0 1 5.17 4.86l-2.54 1.62c-2.21-3.58-5.74-5.32-10.82-5.32a14.24 14.24 0 0 0-7 1.45 5.22 5.22 0 0 0-2.11 7.07 5.16 5.16 0 0 0 2.68 2.38 25.14 25.14 0 0 0 6.75 1.41 24 24 0 0 1 6.48 1.35 4.12 4.12 0 0 1 2.77 4.05 4.18 4.18 0 0 1-2.14 3.78 14.34 14.34 0 0 1-7.34 1.47M230.26 50.43c0-1.18 1-1.93 2.73-1.93a10.13 10.13 0 0 1 2.74.39v.89a2.83 2.83 0 0 1-3.08 2.54c-1.27 0-2.36-.68-2.36-1.88m-.16-4.75A6.58 6.58 0 0 1 233 45c1.75 0 2.78.86 2.78 2.55v.32a9.56 9.56 0 0 0-2.86-.41c-2.35 0-4 1.06-4 3a3.12 3.12 0 0 0 3.28 2.93h.19a4 4 0 0 0 3.36-1.62v1.4H237v-5.66a3.46 3.46 0 0 0-3.14-3.75 3.66 3.66 0 0 0-.81 0 7.7 7.7 0 0 0-3.37.77zm-7.91-.69a3.53 3.53 0 0 1 3.46 3.58v.06a3.44 3.44 0 0 1-3.27 3.6h-.15a3.5 3.5 0 0 1-3.44-3.56v-.07a3.4 3.4 0 0 1 3.18-3.67h.23m0 8.49a4.87 4.87 0 1 0-4.86-4.88 4.87 4.87 0 0 0 4.86 4.86m-9.58-3.92c0-2.82 1.62-4.28 3.68-4.28h.11v-1.39a4 4 0 0 0-3.79 2.59V44h-1.4v9.31h1.4zm-10.93.92c0-1.18 1-1.93 2.71-1.93a9.76 9.76 0 0 1 2.74.39v.89a2.83 2.83 0 0 1-3.08 2.54c-1.27 0-2.34-.68-2.34-1.88m-.16-4.75a6.44 6.44 0 0 1 2.81-.67c1.75 0 2.77.86 2.77 2.55v.32a9.63 9.63 0 0 0-2.87-.41c-2.35 0-4 1.06-4 3a3.15 3.15 0 0 0 3.32 2.93h.15a4 4 0 0 0 3.37-1.62v1.4h1.33v-5.66a3.44 3.44 0 0 0-3.1-3.75 2.89 2.89 0 0 0-.83 0 7.82 7.82 0 0 0-3.39.77zm-9.84 2.37a3.23 3.23 0 0 1 3-3.24 3.06 3.06 0 0 1 3 3.12v.12zm3.25 4.19a3.25 3.25 0 0 1-3.24-3.15h7.39a3.23 3.23 0 0 0 0-.44 4.44 4.44 0 0 0-4-4.84h-.34a4.87 4.87 0 1 0 4 8l-.88-.78a3.86 3.86 0 0 1-2.93 1.31m-9-7.13h3V44h-3v-2.91h-1.4v2.81h-1.3v1.23h1.29v5.61a2.38 2.38 0 0 0 2.08 2.63 2.53 2.53 0 0 0 .55 0 3.65 3.65 0 0 0 1.62-.39v-1.19a2.83 2.83 0 0 1-1.34.33 1.4 1.4 0 0 1-1.63-1.1 1.63 1.63 0 0 1 0-.54zm-8.9-.2a3.52 3.52 0 0 1 3.48 3.55 3.44 3.44 0 0 1-3.27 3.6h-.15a3.5 3.5 0 0 1-3.44-3.56v-.07a3.43 3.43 0 0 1 3.28-3.61h.18m0 8.49a4.87 4.87 0 1 0-4.86-4.88 4.87 4.87 0 0 0 4.86 4.86m-9.34-4.86H162l2.88-6.49zm-2.19-8.11h-1.33l-5.74 12.68H160l1.49-3.24h6.86l1.48 3.24h1.52zm-15.87 8.79a2.76 2.76 0 0 1-2.59 2.92H147a2.48 2.48 0 0 1-2.6-2.35 3.23 3.23 0 0 1 0-.44V43.9H143v5.79a3.4 3.4 0 0 0 3.06 3.71h.5a3.52 3.52 0 0 0 3.25-1.83v1.63h1.36v-9.3h-1.41zm-12.34.28c0-2.82 1.62-4.28 3.7-4.28h.09v-1.38a4 4 0 0 0-3.79 2.59V44H136v9.31h1.39zm-10.93.92c0-1.18 1-1.93 2.73-1.93a9.62 9.62 0 0 1 2.72.39v.89a2.83 2.83 0 0 1-3.08 2.54c-1.25 0-2.34-.68-2.34-1.88m-.16-4.75a6.58 6.58 0 0 1 2.82-.66c1.75 0 2.77.86 2.77 2.55v.32a9.45 9.45 0 0 0-2.85-.41c-2.37 0-4 1.06-4 3a3.13 3.13 0 0 0 3.32 2.93h.17a4 4 0 0 0 3.39-1.64v1.4h1.33v-5.64a3.44 3.44 0 0 0-3.1-3.75 2.89 2.89 0 0 0-.83 0 7.82 7.82 0 0 0-3.39.77zm-6.82-2a3.73 3.73 0 0 0-3.25 1.85 3.23 3.23 0 0 0-3-1.85 3.42 3.42 0 0 0-3 1.74v-1.58h-1.38v9.3h1.38V47.9a2.68 2.68 0 0 1 2.43-2.9h.16c1.48 0 2.4 1 2.4 2.77v5.43h1.36v-5.36A2.6 2.6 0 0 1 119 45h.27c1.51 0 2.42 1 2.42 2.8v5.4H123v-5.75a3.33 3.33 0 0 0-2.89-3.72h-.56m-15 5.53a2.76 2.76 0 0 1-2.55 2.92h-.23a2.48 2.48 0 0 1-2.6-2.35 1.62 1.62 0 0 1 0-.44V43.9h-1.28v5.79A3.4 3.4 0 0 0 101 53.4h.55a3.52 3.52 0 0 0 3.25-1.83v1.63h1.2v-9.3h-1.37zM88.4 50.43c0-1.18 1-1.93 2.73-1.93a10.13 10.13 0 0 1 2.74.39v.89a2.84 2.84 0 0 1-3.09 2.54c-1.26 0-2.35-.68-2.35-1.88m-.16-4.75a6.66 6.66 0 0 1 2.81-.69c1.73 0 2.77.86 2.77 2.55v.32a9.45 9.45 0 0 0-2.85-.41c-2.35 0-4 1.06-4 3a3.1 3.1 0 0 0 3.26 2.93h.21a4 4 0 0 0 3.37-1.62v1.4h1.33v-5.66a3.45 3.45 0 0 0-3.89-3.69 7.67 7.67 0 0 0-3.39.76zm-4.7 1.87v5.64H85V40.57h-1.51v5.6h-7.23v-5.6h-1.41v12.6h1.41v-5.62zM65 53.2h1.39v-9.3H65zm-.1-11.34h1.62v-1.54h-1.66zm-9.55 6A2.74 2.74 0 0 1 57.87 45h.23a2.49 2.49 0 0 1 2.6 2.36 3.38 3.38 0 0 1 0 .45v5.43h1.38v-5.81A3.42 3.42 0 0 0 59 43.71h-.52a3.53 3.53 0 0 0-3.24 1.82v-5.46h-1.4V53.2h1.4zm-11 2.57c0-1.18 1-1.93 2.72-1.93a9.62 9.62 0 0 1 2.72.39v.89a2.83 2.83 0 0 1-3.08 2.54c-1.26 0-2.33-.68-2.33-1.88m-.17-4.75A6.39 6.39 0 0 1 47 45c1.76 0 2.78.86 2.78 2.55v.32a9.69 9.69 0 0 0-2.78-.41c-2.36 0-4 1.06-4 3a3.15 3.15 0 0 0 3.32 2.93h.15a4.08 4.08 0 0 0 3.38-1.62v1.4h1.33v-5.66A3.45 3.45 0 0 0 48 43.79a3.57 3.57 0 0 0-.8 0 7.67 7.67 0 0 0-3.39.76zm-9.43 4.07L30.12 43v10.2h-1.38V40.57h1.44l4.59 6.88 4.59-6.88h1.44v12.6h-1.42V43z"></path>
                        </g>
                    </svg>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <NavLink
                            to="/"
                            exact
                            activeClassName="router-link-exact-active"
                            className="nav-button"
                            onClick={() => setExpanded(false)}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/projects"
                            exact
                            activeClassName="router-link-exact-active"
                            className="nav-button"
                            onClick={() => setExpanded(false)}
                        >
                            Projects
                        </NavLink>


                        <NavLink
                            to="/reports"
                            exact
                            activeClassName="router-link-exact-active"
                            className="nav-button"
                            onClick={() => setExpanded(false)}
                        >
                            Reports
                        </NavLink>
                    </Nav>
                    <Nav className="ms-auto">
                        <ProfileIcon expanded={expanded} setExpanded={setExpanded}/>
                        <AuthenticationButton />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};


export default Header;