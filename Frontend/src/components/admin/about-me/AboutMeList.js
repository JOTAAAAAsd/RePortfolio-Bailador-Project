import React, { useState, useEffect } from "react";

// COMPONENTS
import { TableAboutMe } from "./TableAboutMe";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";
import { FormCreateAndUpdateAboutMe } from "./FormCreateAndUpdateAboutMe";
import { ModalUpdateAndCreate } from "../../UI/ModalUpdateAndCreate";

// BOOTSTRAP
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// FILE EXTERNAL
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";


const AboutMeList = () => {


    // DATA FROM API
    const [useAboutMeData, setAboutMeData] = useState([]);
    const [useLoadAboutMeData, setLoadAboutMeData] = useState(true);

    // RENDER PAGE AGAIN
    const [useRenderPage, setRenderPage] = useState();

    // MODAL
    const [useIsOpenModal, setIsOpenModal] = useState(false);
    const [useModalTitle, setModalTitle] = useState("");
    const [useModalContentBody, setModalContentBody] = useState(null);


    useEffect(() => {

        setRenderPage(false);

        endpointConsumeWithToken("/about-me/list-admin", true).then((data) => {
            // console.log(data);
            setLoadAboutMeData(false);
            setAboutMeData(data);
        });


    }, [useRenderPage]);


    const onCloseModal = () => {
        setIsOpenModal(false);
    }


    const onModalAddData = () => {

        setIsOpenModal(true);
        setModalTitle("Add About Me");
        setModalContentBody(<FormCreateAndUpdateAboutMe setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />);
    }

    const onDeleteData = (id_data) => {

        endpointConsumeWithToken(`/about-me/remove/${id_data}`, true, "DELETE").then((data) => {
            // console.log(data);
            setRenderPage(true);
        });

    }

    const onGetToUpdateData = (data_record) => {

        setIsOpenModal(true);
        setModalTitle(`Edit About Me.`);
        setModalContentBody(<FormCreateAndUpdateAboutMe data_record={data_record} setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />);

    }

    // console.log(useAboutMeData)
    return (

        <>

            <Container className="mt-5 mb-5">
                <Row>

                    {/* ABOUT ME */}
                    <Col md={8} className="mx-auto">


                        <div className="mt-3 mb-3 text-end">
                            <Button onClick={() => onModalAddData(1)} className="btn_create_data" onMouseDown={(e) => e.preventDefault()}>Add</Button>{' '}
                        </div>


                        <Card style={{ height: "700px" }} className="card_container_custom_style_admin">

                            <Card.Header className="card_header_section_table_admin">
                                <h4 className="text-center">About Me</h4>
                            </Card.Header>

                            {

                                (!useLoadAboutMeData) ? (
                                    <>
                                        {
                                            (!useAboutMeData.ok) ? <MessageServer message_server={useAboutMeData.message} title="About me" alert_class="alert_message_server_red" /> : null
                                        }
                                        {
                                            useAboutMeData.ok ? <TableAboutMe useAboutMeData={useAboutMeData} onGetToUpdateData={onGetToUpdateData} onDeleteData={onDeleteData} /> : null
                                        }
                                    </>
                                ) : <LoadingComponent title="About me" />
                            }

                        </Card>
                    </Col>

                </Row>
            </Container>


            {/* MODAL */}
            <ModalUpdateAndCreate
                useIsOpenModal={useIsOpenModal}
                onCloseModal={onCloseModal}
                useModalTitle={useModalTitle}>

                {
                    useModalContentBody
                }

            </ModalUpdateAndCreate>

        </>


    );

}


export default AboutMeList;