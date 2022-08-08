
import React, { useState, useEffect } from "react";

// BOOTSTRAP
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// COMPONENTS
import { TableImageLangProject, TableTypeDev, TableTypeLanguage } from "./TableComponent";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";
import { FormCreateAndUpdateImageLangProject, FormCreateAndUpdateTypeDev, FormCreateAndUpdateTypeLanguage } from "./FormCreateAndUpdate";
import { ModalUpdateAndCreate } from "../../UI/ModalUpdateAndCreate";

// FILE EXTERNAL
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";


const TypesAndImageLangProjectList = () => {

    // DATA FROM API
    const [useTypeLangData, setTypeLangData] = useState([]);
    const [useLoadTypeLangData, setLoadTypeLangData] = useState(true);

    const [useTypeDevData, setTypeDevData] = useState([]);
    const [useLoadTypeDevData, setLoadTypeDevData] = useState(true);

    const [useImageLangProjectData, setImageLangProjectData] = useState([]);
    const [useLoadImageLangProjectData, setLoadImageLangProjectData] = useState(true);

    // RENDER PAGE AGAIN
    const [useRenderPage, setRenderPage] = useState();


    // MODAL
    const [useIsOpenModal, setIsOpenModal] = useState(false);
    const [useModalTitle, setModalTitle] = useState("");
    const [useModalContentBody, setModalContentBody] = useState(null);


    useEffect(() => {

        setRenderPage(false);

        endpointConsumeWithToken("/type-language/list-admin", true).then((data) => {
            // console.log(data);
            setLoadTypeLangData(false);
            setTypeLangData(data);
        });

        endpointConsumeWithToken("/type-dev/list-admin", true).then((data) => {
            // console.log(data);
            setLoadTypeDevData(false);
            setTypeDevData(data);
        });

        endpointConsumeWithToken("/image-lang-project/list-admin", true).then((data) => {
            // console.log(data);
            setLoadImageLangProjectData(false);
            setImageLangProjectData(data);
        });

    }, [useRenderPage]);



    const onCloseModal = () => {
        setIsOpenModal(false);
    }


    const onModalAddData = (table_num) => {

        // console.log("ADD");

        var name_title;
        var component_show;

        switch (table_num) {
            case 1:
                name_title = "Add Type";
                component_show = <FormCreateAndUpdateTypeLanguage setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />;
                break;

            case 2:
                name_title = "Add Type";
                component_show = <FormCreateAndUpdateTypeDev setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />;
                break;

            case 3:
                name_title = "Add Image";
                component_show = <FormCreateAndUpdateImageLangProject setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />;
                break;
        }

        setIsOpenModal(true);
        setModalTitle(name_title);
        setModalContentBody(component_show);
    }

    const onDeleteData = (id_data, table_num) => {

        var url_param;

        switch (table_num) {
            case 1:
                url_param = `/type-language/remove/${id_data}`;
                break;

            case 2:
                url_param = `/type-dev/remove/${id_data}`;
                break;

            case 3:
                url_param = `/image-lang-project/remove/${id_data}`;
                break;
        }

        // console.log(url_param);

        endpointConsumeWithToken(url_param, true, "DELETE").then((data) => {
            // console.log(data);
            setRenderPage(true);
        });
    }


    const onGetToUpdateData = (data_record, table_num) => {

        var name_title;
        var component_show;

        switch (table_num) {
            case 1:
                name_title = `Edit ${data_record.title}.`;
                component_show = <FormCreateAndUpdateTypeLanguage data_record={data_record} setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />;
                break;

            case 2:
                name_title = `Edit ${data_record.title}.`;
                component_show = <FormCreateAndUpdateTypeDev data_record={data_record} setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />;
                break;

            case 3:
                name_title = `Edit ${data_record.title}.`;
                component_show = <FormCreateAndUpdateImageLangProject data_record={data_record} setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />;
                break;
        }

        setIsOpenModal(true);
        setModalTitle(name_title);
        setModalContentBody(component_show);

    }

    return (
        <>

            <Container className="mt-5 mb-5">
                <Row>

                    {/* TYPE LANGUAGE */}
                    <Col md={4}>
                        <div className="mt-3 mb-3 text-end">
                            <Button onClick={() => onModalAddData(1)} className="btn_create_data" onMouseDown={(e) => e.preventDefault()}>Add</Button>{' '}
                        </div>

                        <Card style={{ height: "500px" }} className="card_container_custom_style_admin">

                            <Card.Header className="card_header_section_table_admin">
                                <h4 className="text-center">Type Language</h4>
                            </Card.Header>

                            {

                                (!useLoadTypeLangData) ? (
                                    <>
                                        {
                                            (!useTypeLangData.ok) ? <MessageServer message_server={useTypeLangData.message} title="Type Language" alert_class="alert_message_server_red" /> : null
                                        }
                                        {
                                            useTypeLangData.ok ? <TableTypeLanguage useTypeLangData={useTypeLangData} onGetToUpdateData={onGetToUpdateData} onDeleteData={onDeleteData} /> : null
                                        }
                                    </>
                                ) : <LoadingComponent title="Type Languages" />
                            }

                        </Card>
                    </Col>

                    {/* TYPE DEV */}
                    <Col md={4}>
                        <div className="mt-3 mb-3 text-end">
                            <Button onClick={() => onModalAddData(2)} className="btn_create_data" onMouseDown={(e) => e.preventDefault()}>Add</Button>{' '}
                        </div>

                        <Card style={{ height: "500px" }} className="card_container_custom_style_admin">

                            <Card.Header className="card_header_section_table_admin">
                                <h4 className="text-center">Type Development</h4>
                            </Card.Header>

                            {

                                (!useLoadTypeDevData) ? (
                                    <>
                                        {
                                            (!useTypeDevData.ok) ? <MessageServer message_server={useTypeDevData.message} title="Type Development" alert_class="alert_message_server_red" /> : null
                                        }
                                        {
                                            useTypeDevData.ok ? <TableTypeDev useTypeDevData={useTypeDevData} onGetToUpdateData={onGetToUpdateData} onDeleteData={onDeleteData} /> : null
                                        }
                                    </>
                                ) : <LoadingComponent title="Type Development" />
                            }

                        </Card>
                    </Col>


                    {/* Image Lang Project */}
                    <Col md={4}>
                        <div className="mt-3 mb-3 text-end">
                            <Button onClick={() => onModalAddData(3)} className="btn_create_data" onMouseDown={(e) => e.preventDefault()}>Add</Button>{' '}
                        </div>

                        <Card style={{ height: "500px" }} className="card_container_custom_style_admin">

                            <Card.Header className="card_header_section_table_admin">
                                <h4 className="text-center">Image Lang Project</h4>
                            </Card.Header>

                            {

                                (!useLoadImageLangProjectData) ? (
                                    <>
                                        {
                                            (!useImageLangProjectData.ok) ? <MessageServer message_server={useImageLangProjectData.message} title="Image Lang Project" alert_class="alert_message_server_red" /> : null
                                        }
                                        {
                                            useImageLangProjectData.ok ? <TableImageLangProject useImageLangProjectData={useImageLangProjectData} onGetToUpdateData={onGetToUpdateData} onDeleteData={onDeleteData} /> : null
                                        }
                                    </>
                                ) : <LoadingComponent title="Image Lang Project" />
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

export default TypesAndImageLangProjectList;