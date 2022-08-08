import React, { useEffect, useState } from "react";

// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';

// ICONS
import { SiFoodpanda } from "react-icons/si";



const AboutMe = (props) => {


    const { useAboutMeData } = props;

    // console.log(useAboutMeData);

    const [useStatusLevel, setStatusLevel] = useState({
        a1: false,
        a2: false,
        b1: false,
        b2: false,
        c1: false,
        c2: false
    });


    const { a1, a2, b1, b2, c1, c2 } = useStatusLevel;


    useEffect(() => {

        switch (useAboutMeData.data[0].level_english.level) {

            case "A1":
                // console.log("A1");
                setStatusLevel({
                    a1: true,
                    a2: false,
                    b1: false,
                    b2: false,
                    c1: false,
                    c2: false
                });
                break;
            case "A2":
                // console.log("A2, A1");
                setStatusLevel({
                    a1: true,
                    a2: true,
                    b1: false,
                    b2: false,
                    c1: false,
                    c2: false
                });
                break;
            case "B1":
                // console.log("A1, A2, B1");
                setStatusLevel({
                    a1: true,
                    a2: true,
                    b1: true,
                    b2: false,
                    c1: false,
                    c2: false
                });

                break;

            case "B2":
                // console.log("A1, A2, B1, B2");
                setStatusLevel({
                    a1: true,
                    a2: true,
                    b1: true,
                    b2: true,
                    c1: false,
                    c2: false
                });
                break;

            case "C1":
                // console.log("A1, A2, B1, B2, C1");
                setStatusLevel({
                    a1: true,
                    a2: true,
                    b1: true,
                    b2: true,
                    c1: true,
                    c2: false
                });
                break;

            case "C2":
                // console.log("A1, A2, B1, B2, C1, C2");
                setStatusLevel({
                    a1: true,
                    a2: true,
                    b1: true,
                    b2: true,
                    c1: true,
                    c2: true
                });
                break;
        }

    }, [])


    // console.log(useStatusLevel)


    // console.log(useAboutMeData.data[0].links_social)

    return (
        <>

            <div >

                <Card className="home_about_me_card_custom">

                    <Container>

                        <Row className=" mt-5">

                            <Col md={6} >
                                <Card.Body style={{ margin: "10% auto" }}>

                                    <h2 className="home_about_me_card_custom_h1_title" data-text={useAboutMeData.data[0].title_home}>
                                        <span>{useAboutMeData.data[0].title_home}</span>
                                    </h2>

                                </Card.Body>
                            </Col>

                            <Col md={6} >

                                <div className="home_about_me_card_custom_div_content_about_me" >


                                    <div>
                                        <div className="text-center mb-3" >
                                            <Image width={30} src={useAboutMeData.data[0].level_english.url_flag_usa} alt="Flag USA" />
                                        </div>

                                        <ProgressBar>

                                            <ProgressBar style={{ filter: a1 ? "" : "grayscale(1)" }} title="Level English: Beginner" className="progress_bar_a1" now={17} key={1} animated={a1} label="(A1)" striped={a1} />
                                            <ProgressBar style={{ filter: a2 ? "" : "grayscale(1)" }} title="Level English: Elementary English" className="progress_bar_a2" now={17} key={2} animated={a2} label="(A2)" striped={a2} />
                                            <ProgressBar style={{ filter: b1 ? "" : "grayscale(1)" }} title="Level English: Intermediate English" className="progress_bar_b1" now={17} key={3} animated={b1} label="(B1)" striped={b1} />
                                            <ProgressBar style={{ filter: b2 ? "" : "grayscale(1)" }} title="Level English: Upper Intermediate" className="progress_bar_b2" now={17} key={4} animated={b2} label="(B2)" striped={b2} />
                                            <ProgressBar style={{ filter: c1 ? "" : "grayscale(1)" }} title="Level English: Advanced English" className="progress_bar_c1" now={17} key={5} animated={c1} label="(C1)" striped={c1} />
                                            <ProgressBar style={{ filter: c2 ? "" : "grayscale(1)" }} title="Level English: Profeciency" className="progress_bar_c2" now={17} key={6} animated={c2} label="(C2)" striped={c2} />

                                        </ProgressBar>

                                    </div>

                                    <Card.Body>

                                        <div className="home_about_me_card_custom_div_contentainer_profile_banner mt-3">

                                            <div className="home_about_me_card_custom_profile_picture">
                                                <div className="home_about_me_card_custom_profile_banner"></div>
                                                <Image src={useAboutMeData.data[0].url_img_profile} alt="Picture Gastón E. Bailador" />
                                            </div>

                                            <div className="home_card_links_social">

                                                {
                                                    useAboutMeData.data[0].links_social.length === 0 ? null : (

                                                        useAboutMeData.data[0].links_social.map((e) => (

                                                            <span key={e._id} title={e.title_link_social}>
                                                                <a href={e.url_link_social} target="_blank">
                                                                    <i className={e.class_ico_link_social}></i>
                                                                </a>
                                                            </span>
                                                        )))
                                                }

                                            </div>

                                            <div >
                                                <h3 className="home_about_me_card_custom_h3_title">About me <SiFoodpanda /></h3>
                                            </div>

                                            <p className="home_about_me_card_custom_p_description">
                                                {useAboutMeData.data[0].description}
                                            </p>

                                            <div className="mb-5 home_about_me_card_custom_div_location">
                                                <i className="fa-solid fa-envelope"></i> {useAboutMeData.data[0].email} <br />
                                                {useAboutMeData.data[0].location.location + " " + useAboutMeData.data[0].location.country} <Image width={50} src={useAboutMeData.data[0].location.url_flag_nationality} alt={useAboutMeData.data[0].location.country} />
                                            </div>

                                        </div>

                                    </Card.Body>



                                </div>


                            </Col>

                        </Row>
                    </Container>
                </Card>

            </div>
        </>
    );

}


export default AboutMe;