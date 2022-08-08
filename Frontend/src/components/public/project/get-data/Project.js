import React, { useState, useEffect } from "react";

// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';

// ROUTER
import { useHistory } from 'react-router-dom';

// QUERYSTRING
import queryString from "query-string";


// Icons
import { FcTodoList, FcIdea, FcAbout } from "react-icons/fc";
import { SiWebpack, SiCountingworkspro } from "react-icons/si";
import { FaGithubAlt } from "react-icons/fa";
import { MdOutlineShortText } from "react-icons/md";
import { VscDebugBreakpointConditionalUnverified } from "react-icons/vsc";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { GiTechnoHeart, GiPlatform } from "react-icons/gi";

 

const Project = (props) => {


    const { useProjectData  } = props;

    const [useShowModal, setShowModal] = useState(false);
    const [useShowDetails, setShowDetails] = useState(null);


    // console.log(useProjectData);


    const onCloseModal = () => {
        setShowDetails(null);
        setShowModal(false);
    }


    const onShowModal = (item_detail) => {
        // console.log(item_detail);
        setShowDetails(item_detail);
        setShowModal(true);
    }
    return (
        <>

            <div>

                <Card className="card_project_custom ">

                    <Container>


                        {/* 
                        <FormSelectFilterBy
                            useSelectByParams={useSelectByParams}
                            page={page}
                            limit_record={limit_record}
                            setSelectByParams={setSelectByParams}

                        /> */}


                        <Row className='mt-5 mb-3'>
                            <Col md={3} className="project_card_btn_length_record_content">
                                <Button style={{ pointerEvents: "none" }} className="project_card_btn_length_record" onMouseDown={(e) => e.preventDefault()}>
                                    {/* <SiCountingworkspro /> Records <Badge bg="secondary">{useProjectData.data?.docs.length}</Badge> */}
                                    <SiCountingworkspro /> Records <span className="project_card_btn_length_record_badge" >{useProjectData.data.length}</span>
                                </Button>
                            </Col>
                        </Row>

                        <Row>


                            {
                                //                             useProjectData.data?.docs.map((e, i) => (

                                useProjectData.data.map((e, i) => (
                                    <Col md={3} className="mb-3" key={e._id}>
                                        <div className="card_project_custom_content">
                                            <Card style={{ background: "transparent" }}>
                                                <Image style={{ background: "transparent", border: "0" }} fluid={true} rounded={true} thumbnail={true} alt="" src="https://res.cloudinary.com/da32hm4ja/image/upload/v1642621029/project_MERN_u6iqnf.jpg" />
                                                <Card.Body>
                                                    <Card.Title style={{ textAlign: "center" }}>
                                                        <h4 className="card_project_custom_title">{e.title}</h4>
                                                    </Card.Title>
                                                    <div className="d-grid gap-2 mt-3">
                                                        <Button className="project_card_btn_more_details" size="sm" onClick={() => onShowModal(e)} onMouseDown={(e) => e.preventDefault()}>
                                                            <FcTodoList /> More details
                                                        </Button>{' '}
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <Modal show={useShowModal} onHide={onCloseModal} className="modal_show_details_container ">
                                            <Modal.Header closeButton className='modal_show_details_content modal_show_details_header' style={{ overflow: "hidden", borderTop: "2px solid #5f9ffd", borderLeft: "2px solid #5f9ffd", borderRight: "2px solid #5f9ffd" }}>
                                                <Modal.Title><FcIdea /> {useShowDetails?.title}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className='modal_show_details_content hmodal_details' style={{ borderBottom: "2px solid #5f9ffd", borderLeft: "2px solid #5f9ffd", borderRight: "2px solid #5f9ffd" }}>
                                                <Carousel variant="dark" >
                                                    {
                                                        useShowDetails?.url_imgs.map((e) => (
                                                            // https://cdn.pixabay.com/photo/2022/07/16/15/34/kid-7325370__340.jpg <-- usar una dimensión para las imagenes como esta
                                                            <Carousel.Item key={e._id}>
                                                                <div style={{ margin: "0 auto" }} >
                                                                    <Image
                                                                        width={300}
                                                                        className="d-block  mx-auto"
                                                                        src={e.url_img}
                                                                        alt={e.title}
                                                                    />
                                                                </div>

                                                            </Carousel.Item>

                                                        ))
                                                    }

                                                </Carousel>
                                                <span style={{ color: "rgb(0, 98, 255)" }}>
                                                    <em>Img total: {useShowDetails?.url_imgs.length}</em>
                                                </span>

                                                <div className="d-grid gap-2 mt-3">
                                                    <ButtonGroup aria-label="Basic example">
                                                        <a href={useShowDetails?.url_repo} target="_blank" className="  project_card_btn_view_github" onMouseDown={(e) => e.preventDefault()}> <FaGithubAlt style={{ fontSize: "2em" }} /> <em>Repo</em></a>
                                                        <a href={useShowDetails?.url_demo} target="_blank" className="  project_card_btn_view_demo" onMouseDown={(e) => e.preventDefault()}><SiWebpack style={{ fontSize: "2em" }} /> <em>Demo</em></a>
                                                    </ButtonGroup>
                                                </div>

                                                <div className='mt-5'>

                                                    <div className='modal_show_details_header_description'>
                                                        <h5 >Description<MdOutlineShortText style={{ fontSize: "1.5em" }} /></h5>

                                                    </div>

                                                    <div className='modal_show_details_p_description'>
                                                        <VscDebugBreakpointConditionalUnverified /> {useShowDetails?.description}
                                                    </div>

                                                    <div className="modal_show_details_tech_used">
                                                        <h5>Used in this development</h5>
                                                        <ul>
                                                            {
                                                                useShowDetails?.tags.map((e) => (
                                                                    <>
                                                                        <li>{e.title}</li>
                                                                    </>
                                                                ))
                                                            }

                                                            <hr />
                                                            <div style={{ textAlign: "center" }}>
                                                                <li><GiTechnoHeart style={{ fontSize: "2em" }} /> {e.type_language_id?.title}</li>
                                                                <li><GiPlatform style={{ fontSize: "2em" }} /> {e.type_dev_id?.title}</li>
                                                            </div>


                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className='modal_show_details_content modal_show_details_footer mt-5' style={{ overflow: "hidden" }}>

                                                    <Modal.Title  ><FcAbout /> My Networks </Modal.Title>
                                                    <hr />


                                                    <span title="Github">
                                                        <a href="https://github.com/bailadev93" target="__blank">
                                                            <BsGithub />
                                                        </a>
                                                    </span>

                                                    <span title={e.title_link_social}>
                                                        <a href="https://www.linkedin.com/in/gastonebailador/" target="__blank">
                                                            <BsLinkedin />
                                                        </a>
                                                    </span>

                                                </div>

                                            </Modal.Body>

                                        </Modal>

                                    </Col>

                                )
                                )

                            }


                        </Row>
                    </Container>

                </Card>
            </div>


        </>
    );
}


export default Project;