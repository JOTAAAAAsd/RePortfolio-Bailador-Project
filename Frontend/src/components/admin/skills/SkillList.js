import React, { useState, useEffect } from "react";


// BOOTSTRAP
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// COMPONENTS
import { TableSkill } from "./TableSkill";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";
import { FormCreateAndUpdateSkill } from "./FormCreateAndUpdateSkill";
import { ModalUpdateAndCreate } from "../../UI/ModalUpdateAndCreate";

// FILE EXTERNAL
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";


const SkillList = () => {


    // DATA FROM API
    const [useSkillData, setSkillData] = useState([]);
    const [useLoadSkillData, setLoadSkillData] = useState(true);

    // RENDER PAGE AGAIN
    const [useRenderPage, setRenderPage] = useState();

    // MODAL
    const [useIsOpenModal, setIsOpenModal] = useState(false);
    const [useModalTitle, setModalTitle] = useState("");
    const [useModalContentBody, setModalContentBody] = useState(null);


    useEffect(() => {

        setRenderPage(false);

        endpointConsumeWithToken("/skill/list-admin", true).then((data) => {
            // console.log(data);
            setLoadSkillData(false);
            setSkillData(data);
        });


    }, [useRenderPage]);


    const onCloseModal = () => {
        setIsOpenModal(false);
    }


    const onModalAddData = () => {

        setIsOpenModal(true);
        setModalTitle("Add Skill");
        setModalContentBody(<FormCreateAndUpdateSkill setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />);
    }

    const onDeleteData = (id_data) => {

        endpointConsumeWithToken(`/skill/remove/${id_data}`, true, "DELETE").then((data) => {
            // console.log(data);
            setRenderPage(true);
        });

    }

    const onGetToUpdateData = (data_record) => {

        setIsOpenModal(true);
        setModalTitle(`Edit ${data_record.title}.`);
        setModalContentBody(<FormCreateAndUpdateSkill data_record={data_record} setRenderPage={setRenderPage} setIsOpenModal={setIsOpenModal} />);

    }

    return (

        <>

            <Container className="mt-5 mb-5">
                <Row>

                    {/* SKILLS */}
                    <Col md={8} className="mx-auto">
                        <div className="mt-3 mb-3 text-end">
                            <Button onClick={() => onModalAddData(1)} className="btn_create_data" onMouseDown={(e) => e.preventDefault()}>Add</Button>{' '}
                        </div>

                        <Card style={{ height: "500px" }} className="card_container_custom_style_admin">

                            <Card.Header className="card_header_section_table_admin">
                                <h4 className="text-center">Skills</h4>
                            </Card.Header>

                            {

                                (!useLoadSkillData) ? (
                                    <>
                                        {
                                            (!useSkillData.ok) ? <MessageServer message_server={useSkillData.message} title="Skills" alert_class="alert_message_server_red" /> : null
                                        }
                                        {
                                            useSkillData.ok ? <TableSkill useSkillData={useSkillData} onGetToUpdateData={onGetToUpdateData} onDeleteData={onDeleteData} /> : null
                                        }
                                    </>
                                ) : <LoadingComponent title="Skills" />
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


export default SkillList;