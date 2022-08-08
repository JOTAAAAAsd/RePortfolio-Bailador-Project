
import React, { useState, useEffect } from "react";


// COMPONENTS
import { TableProject } from "./TableProject";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";
import { FormCreateAndUpdateProject } from "./FormCreateAndUpdateProject";
import { ModalUpdateAndCreate } from "../../UI/ModalUpdateAndCreate";

// BOOTSTRAP
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// FILE EXTERNAL
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";


const ProjectList = () => {


    // DATA FROM API
    const [useProjectData, setProjectData] = useState([]);
    const [useLoadProjectData, setLoadProjectData] = useState(true);

    const [useOnlyAddDataToDb, setOnlyAddDataToDb] = useState(false);

    // RENDER PAGE AGAIN
    const [useRenderPage, setRenderPage] = useState(false);


    // MODAL
    const [useIsOpenModal, setIsOpenModal] = useState(false);
    const [useModalTitle, setModalTitle] = useState("");
    const [useModalContentBody, setModalContentBody] = useState(null);

    useEffect(() => {

        setOnlyAddDataToDb(false);
        setRenderPage(false);

        endpointConsumeWithToken("/project/list-admin", true).then((data) => {
            // console.log(data);
            setLoadProjectData(false);
            setProjectData(data);
        });

    }, [useRenderPage]);


    const onCloseModal = () => {
        setOnlyAddDataToDb(false);

        setIsOpenModal(false);
    }


    const onModalAddData = () => {


        setOnlyAddDataToDb(true);
        setIsOpenModal(true);
        setModalTitle("Add Project");
        setModalContentBody(<FormCreateAndUpdateProject setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal}

            useOnlyAddDataToDb={useOnlyAddDataToDb}
            setOnlyAddDataToDb={setOnlyAddDataToDb}

        />);
    }

    const onDeleteData = (id_data) => {
        setOnlyAddDataToDb(false);

        endpointConsumeWithToken(`/project/remove/${id_data}`, true, "DELETE").then((data) => {
            // console.log(data);
            setRenderPage(true);
        });

    }

    const onGetToUpdateData = (data_record) => {
        // console.log(data_record);
        setOnlyAddDataToDb(false);
        setIsOpenModal(true);
        setModalTitle(`Edit ${data_record.title}.`);
        setModalContentBody(<FormCreateAndUpdateProject data_record={data_record} setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal}
            useOnlyAddDataToDb={useOnlyAddDataToDb}
            setOnlyAddDataToDb={setOnlyAddDataToDb} />);

    }

    return (

        <>

            <Container className="mt-5 mb-5">
                <Row>

                    {/* PROJECTS */}
                    <Col md={8} className="mx-auto">
                        <div className="mt-3 mb-3 text-end">
                            <Button onClick={() => onModalAddData()} className="btn_create_data" onMouseDown={(e) => e.preventDefault()}>Add</Button>{' '}
                        </div>

                        <Card style={{ height: "700px" }} className="card_container_custom_style_admin">

                            <Card.Header className="card_header_section_table_admin">
                                <h4 className="text-center">Projects</h4>
                            </Card.Header>

                            {

                                (!useLoadProjectData) ? (
                                    <>
                                        {
                                            (!useProjectData.ok) ? <MessageServer message_server={useProjectData.message} title="Project" alert_class="alert_message_server_red" /> : null
                                        }
                                        {
                                            useProjectData.ok ?
                                                <TableProject useProjectData={useProjectData} onGetToUpdateData={onGetToUpdateData}
                                                    onDeleteData={onDeleteData} /> : null
                                        }
                                    </>
                                ) : <LoadingComponent title="Project" />
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


export default ProjectList;