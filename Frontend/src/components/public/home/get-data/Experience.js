import React from "react";

// BOOTSTRAP
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/esm/Image";

// ICONS
import { SiAzuredataexplorer } from "react-icons/si";
import { FcServices } from "react-icons/fc";


const Experiencie = (props) => {


    const { useWorkExperienceData } = props;

    // console.log(useWorkExperienceData);


    return (
        <>

            <Card className="card_experience_custom">



                {
                    useWorkExperienceData.data.map((e) => (


                        <Col key={e._id} className="mx-auto experience_content mt-5">
                            <Card.Body>

                                <div className="card_experience_container">

                                    <Row>

                                        <Col md={3}>
                                            <Image className="experience_img_round" src={e.url_img_company} alt="user" />
                                        </Col>

                                        <Col md={9}>

                                            <div className="card_experiences_list">

                                                <h4 className="experience_name_company">{e.name_company}</h4>

                                                <div className="experience_separator"></div>


                                                <div className="card_experience_description">
                                                    <p className="experience_title_job" style={{ color: "white", fontSize: "1.5em" }}>[ <b> {e.title_job} </b> ]</p>

                                                    <span>
                                                        {e.role_description}
                                                    </span>
                                                </div>

                                                <ul className="experience_tech_usaged">
                                                    {
                                                        e.role_tech_usage.map((e) => (
                                                            <li key={e._id}><FcServices /> {e.title}</li>
                                                        ))
                                                    }

                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                            </Card.Body>

                        </Col>


                    ))
                }





            </Card>

        </>
    );
}


export default Experiencie;