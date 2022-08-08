
import React, { useEffect, useState } from "react";

// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// ICONS
import { BiLinkAlt } from "react-icons/bi";
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";



export const FormCreateAndUpdateSkill = (props) => {

    const { data_record, setRenderPage, setIsOpenModal } = props;

    const [useInputValue, setInputValue] = useState({
        title: "",
        url_img: ""
    });


    useEffect(() => {

        if (data_record !== null) {

            setInputValue({
                title: data_record?.title || "",
                url_img: data_record?.url_img || "",
            });

        } else {
            setInputValue({
                title: "",
                url_img: ""
            });
        }

    }, []);


    const { title, url_img } = useInputValue;

    const onChangeInputValue = (e) => {

        setInputValue({
            ...useInputValue,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (data_record) {

            // console.log("Editing...");
            endpointConsumeWithToken(`/skill/update/${data_record._id}`, false, "PUT", useInputValue).then((data) => {
                // console.log(data);
                setRenderPage(true);
                setIsOpenModal(false);
            });

        } else {
            // console.log("Adding");

            endpointConsumeWithToken(`/skill/create`, false, "POST", useInputValue).then((data) => {
                console.log(data);
                setRenderPage(true);
                setIsOpenModal(false);
            });
        }
    }

    return (
        <>

            <Form onSubmit={onSubmitForm} autoComplete="off" >

                <Form.Group className="mb-3">
                    <Form.Label className="color_label_input">Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" value={title || ""} name="title" onChange={onChangeInputValue} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="color_label_input">URL Image</Form.Label>

                    <InputGroup className="mb-3">
                        <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                        <Form.Control className="input2_style_custom_admin" type="text" placeholder="Enter URL Image Skill" name="url_img" value={url_img || ""} onChange={onChangeInputValue} />
                    </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2 mt-5">
                    <Button onMouseDown={(e) => e.preventDefault()} className={`${data_record ? "btn_edit_data" : "btn_create_data"}`} size="sm" type="submit">

                        {
                            data_record ? "Edit Skill" : "Create Skill"
                        }
                    </Button>

                </div>

            </Form>

        </>
    );
}
