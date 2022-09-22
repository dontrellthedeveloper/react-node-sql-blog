import React, {useEffect, useContext} from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    Nav,
    Container,
    UncontrolledTooltip,
} from "reactstrap";
// core components

import { AuthContext } from "../../helpers/AuthContext";

function ColorNavbar() {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [bodyClick, setBodyClick] = React.useState(false);
    const [collapseOpen, setCollapseOpen] = React.useState(false);

    const { authState, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        // initialise
        headroom.init();
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 499 ||
                document.body.scrollTop > 499
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 500 ||
                document.body.scrollTop < 500
            ) {
                setNavbarColor("navbar-transparent");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });


    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
    };

    return (
        <>
            {bodyClick ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setBodyClick(false);
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar
                className={classnames("fixed-top", navbarColor)}
                expand="lg"
                id="navbar-main"
            >
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand id="navbar-brand" to="/" tag={Link}>
                            React-Node-SQL Blog
                        </NavbarBrand>
                        <button
                            className="navbar-toggler"
                            id="navigation"
                            type="button"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setBodyClick(true);
                                setCollapseOpen(true);
                            }}
                        >
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                    </div>

                    <Collapse navbar isOpen={collapseOpen}>
                        <Nav className="ml-auto" navbar>
                            {!authState.status ? (
                                <>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className="mr-2" color="default" nav to="/login" tag={Link}>
                                            Login
                                        </DropdownToggle>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className="mr-2" color="default" nav to="/register" tag={Link}>
                                            Register
                                        </DropdownToggle>
                                    </UncontrolledDropdown>
                                </>
                            ):(
                                <>
                                    {/*<UncontrolledDropdown nav inNavbar>*/}
                                    {/*    <DropdownToggle className="mr-2" color="default" nav to="/create-post" tag={Link}>*/}
                                    {/*        Create Post*/}
                                    {/*    </DropdownToggle>*/}
                                    {/*</UncontrolledDropdown>*/}
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className="mr-2" color="default" caret nav>
                                            {authState.username}
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-danger" right>
                                            <DropdownItem to={`/profile/${authState.id}`} tag={Link}>
                                                <i className="nc-icon nc-bank" />
                                                Profile
                                            </DropdownItem>
                                            <DropdownItem to="/create-post" tag={Link}>
                                                <i className="nc-icon nc-bank" />
                                                Create Post
                                            </DropdownItem>

                                            <DropdownItem onClick={logout}>
                                                <i className="nc-icon nc-bank" />
                                                Logout
                                            </DropdownItem>
                                        </DropdownMenu>

                                    </UncontrolledDropdown>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default ColorNavbar;
