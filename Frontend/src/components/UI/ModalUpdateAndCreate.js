
import React from "react";

// BOOTSTRAP
import Modal from 'react-bootstrap/Modal';




export const ModalUpdateAndCreate = (props) => {

    // console.log(props.useIsOpenModal);

    // el children se lo usará para mostrar el componente en si
    const { children, useIsOpenModal, onCloseModal, useModalTitle } = props;


    return (
        <>

            <Modal animation={true} show={useIsOpenModal} onHide={onCloseModal} className="modal_show_details_container ">

                <Modal.Header closeButton className='modal_show_details_content modal_show_details_header' style={{ overflow: "hidden", borderTop: "2px solid #5f9ffd", borderLeft: "2px solid #5f9ffd", borderRight: "2px solid #5f9ffd" }}>
                    <Modal.Title>
                        {useModalTitle}
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body className='modal_show_details_content hmodal_details' style={{ borderBottom: "2px solid #5f9ffd", borderLeft: "2px solid #5f9ffd", borderRight: "2px solid #5f9ffd" }}>

                    {children}

                </Modal.Body>

            </Modal>

        </>
    );

}


