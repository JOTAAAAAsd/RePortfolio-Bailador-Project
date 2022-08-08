import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../CONTEXT/Auth_context";


// ROUTER
import { Link, NavLink, useHistory } from "react-router-dom";


// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import bailador_project from "../../statics/img/bailador_project_logo.png";


 
const data_nav = [
    [
        {
            to: "/",
            exact: true,
            title: "Home"
        },
        {
            to: "/projects",
            exact: true,
            title: "Projects"
        } 

    ],
    [
        {
            to: "/admin/types-and-image-lang-project",
            exact: true,
            title: "Admin"
        },
        {
            to: "/admin/project-list",
            exact: true,
            title: "Projects"
        },
        {
            to: "/admin/skill-list",
            exact: true,
            title: "Skills"
        },
        {
            to: "/admin/work-experience-list",
            exact: true,
            title: "Experiences"
        },
        {
            to: "/admin/about-me-list",
            exact: true,
            title: "About"
        },

    ]
];

export const MenuApp = () => {

    // console.log(data_nav);
    const history = useHistory();

    const onUpSmooth = () => {
        document.getElementById("up_smooth").scrollIntoView({ behavior: 'smooth' });
    }



    const auth_context = useContext(AuthContext);

    const { user, isLoading } = auth_context; //cuando ingresemos obtenremos esta informacion

    // console.log(auth_context);

    // console.log(auth_context);

    useEffect(() => {

        //console.log(usuario_context)
        if (!user && !isLoading) {

            history.push("/admin");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);



    const onLogout = () => {

        localStorage.removeItem("token_access");
        localStorage.removeItem("token_update");
        window.location.href = "/";
    }



    return (

        <>

            <Navbar className="navbar_custom_container" expand="lg" >
                <Container fluid>
                    <Navbar.Brand >
                        <Link to="/" onClick={onUpSmooth}>
                            <Image width={100} fluid={true} src={bailador_project} alt="Bailador Project :)" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        {
                            user && !isLoading ? (

                                <>
                                    <Nav className="m-auto">

                                        {
                                            data_nav[1].map((e, i) => (
                                                <NavLink key={i} to={e.to} onClick={onUpSmooth} exact={e.exact} activeClassName="navbar_custom_li_menu_active" className=" navbar_custom_style_li">{e.title}</NavLink>
                                            ))
                                        }

                                        <div className="text-end">
                                            <Button onClick={onLogout} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">Logout</Button>{' '}
                                        </div>
                                    </Nav>
                                </>

                            ) : (

                                <>
                                    <Nav className="ms-auto navbar_custom_content_li">
                                        {
                                            data_nav[0].map((e, i) => (
                                                <NavLink key={i} to={e.to} onClick={onUpSmooth} exact={e.exact} activeClassName="navbar_custom_li_menu_active" className=" navbar_custom_style_li">{e.title}</NavLink>
                                            ))
                                        }
                                    </Nav>
                                </>

                            )
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}







