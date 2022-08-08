import React, { useState, useEffect } from "react";


// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

// COMPONENTS
import { TableDataTechUsage } from "./TableData";

// ICONS
import { BiLinkAlt } from "react-icons/bi";

// SHORT ID
import shortid from "shortid";

// FILE EXTERNAL
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";

export const FormCreateAndUpdateWorkExperience = (props) => {

    const { data_record, setRenderPage, setIsOpenModal, useOnlyAddDataToDb, setOnlyAddDataToDb } = props;

    const [useInputValues, setInputValues] = useState({
        name_company: "",
        title_job: "",
        url_img_company: "",
        role_description: "",
        role_tech_usage: []
    });

    const { name_company, title_job, url_img_company, role_description } = useInputValues;

    // ------------------------- Add TECH USAGED
    const [useInputRoleTechUsagedValue, setInputRoleTechUsagedValue] = useState({
        id: "",
        title: ""
    });
    const [useArrRoleTechUsagedInserts, setArrRoleTechUsagedInserts] = useState([]);
    const { title } = useInputRoleTechUsagedValue;
    const [useIsEditOrAddRoleTechUsaged, setIsEditOrAddRoleTechUsaged] = useState(false);

    // Effect ToEdit data
    useEffect(() => {

        if (data_record !== null) {

            // // console.log(data_record);
            setInputValues({
                name_company: data_record?.name_company,
                title_job: data_record?.title_job,
                url_img_company: data_record?.url_img_company,
                role_description: data_record?.role_description,
            });

            setArrRoleTechUsagedInserts(data_record?.role_tech_usage);

            // console.log(useArrRoleTechUsagedInserts);
            // console.log(useArrImagesInserts) 

        } else {
            // console.log(data_record); "undefined"
            setInputValues({
                name_company: "",
                title_job: "",
                url_img_company: "",
                role_description: "",
                role_tech_usage: []
            });
        }

        setArrRoleTechUsagedInserts(data_record?.role_tech_usage ? data_record?.role_tech_usage : []);

    }, []);

    const onChangeInputValueAddNewRoleTechUsaged = (e) => {
        setInputRoleTechUsagedValue({
            ...useInputRoleTechUsagedValue,
            [e.target.name]: e.target.value
        });
    }

    // console.log(useInputLinkSocialValue);

    const onAddAndEditRoleTechUsaged = () => {

        // console.log(shortid.generate());
        // console.log("We are Add or Edit...");
        // console.log(data_record);
        // console.log(useIsEditOrAddLinkSocial)

        if (!useIsEditOrAddRoleTechUsaged) {
            // console.log("LinkSocial Added.");
            useInputRoleTechUsagedValue.id = shortid.generate();
            // console.log(useInputLinkSocialValue);

            setArrRoleTechUsagedInserts(item => item && [...item, useInputRoleTechUsagedValue]);

        } else {
            // console.log("LinkSocial Updated.");
            // console.log(useInputLinkSocialValue);

            setInputRoleTechUsagedValue({
                id: useInputRoleTechUsagedValue._id ? useInputRoleTechUsagedValue._id : useInputRoleTechUsagedValue.id,
                title: useInputRoleTechUsagedValue.title ? useInputRoleTechUsagedValue.title : useInputRoleTechUsagedValue.title,
            });

            // console.log(useInputLinkSocialValue);

            var arr_upd = useArrRoleTechUsagedInserts.map((data) => ((data._id ? data._id : data.id) == (useInputRoleTechUsagedValue._id ? useInputRoleTechUsagedValue._id : useInputRoleTechUsagedValue.id) ? useInputRoleTechUsagedValue : data));

            // console.log(arr_upd);

            setArrRoleTechUsagedInserts(arr_upd);
            setIsEditOrAddRoleTechUsaged(false);
        }

        // ADD

        // console.log(useOnlyAddDataToDb);
        if (useOnlyAddDataToDb) {
            // console.log(useArrLinkSocialInserts);

            setArrRoleTechUsagedInserts(item => item && [...item, useInputRoleTechUsagedValue]);
            setOnlyAddDataToDb(false);
        }

        setInputRoleTechUsagedValue({
            id: "",
            title: ""
        });
    }


    const onGetToEditRoleTechUsaged = (object) => {
        // console.log(object._id);
        setIsEditOrAddRoleTechUsaged(true);

        // console.log(object)

        setInputRoleTechUsagedValue({
            id: object._id ? object._id : object.id,
            title: object.title ? object.title : object.title,

        });
    }

    const onToDeleteRoleTechUsaged = (data_id) => {

        // console.log(useArrLinkSocialInserts);
        // console.log(data_id);

        // return;
        useArrRoleTechUsagedInserts.forEach((e) => {
            // console.log(e.id);

            // var arr_upd = useArrLinkSocialInserts.map((data) => ((data._id ? data._id : data.id) == 
            // (useInputLinkSocialValue._id ? useLinkSocialImageValue._id : useInputLinkSocialValue.id) ? useInputLinkSocialValue : data));

            if ((e._id ? e._id : e.id) == (data_id._id ? data_id._id : data_id.id)) {

                let arr_del = useArrRoleTechUsagedInserts.filter((item) => (item._id ? item._id : item.id) !== (data_id._id ? data_id._id : data_id.id));

                // console.log(arr_del);
                setArrRoleTechUsagedInserts(arr_del);
            }
        });
    }

    const onChangeInputValue = (e) => {
        setInputValues({
            ...useInputValues,
            [e.target.name]: e.target.value
        });
    }


    const onSubmitForm = (e) => {
        e.preventDefault();

        // console.log(useArrImagesAdded);
        // console.log(useArrTagsAdded);
        // console.log(useInputValues);

        var arr_RoleTechUsaged_new = [];
        for (let i in useArrRoleTechUsagedInserts) {
            let element = useArrRoleTechUsagedInserts[i];

            // console.log(element);
            arr_RoleTechUsaged_new.push({
                title: element.title ? element.title : element.title,
            });
        }

        // console.log(arr_linkSocial_new);

        useInputValues.role_tech_usage = arr_RoleTechUsaged_new;

        // console.log(useInputValues);

        if (data_record) {

            // console.log("Editing...");
            // console.log(useInputValues);

            endpointConsumeWithToken(`/work-experience/update/${data_record._id}`, false, "PUT", useInputValues).then((data) => {
                // console.log(data);
                setRenderPage(true);
                setIsOpenModal(false);
            });

        } else {
            // console.log("Adding");

            // console.log(useInputValues)
            // console.log(type_dev_id, type_language_id, image_lang_project_id)
            endpointConsumeWithToken(`/work-experience/create`, false, "POST", useInputValues).then((data) => {
                // console.log(data);
                setRenderPage(true);
                setIsOpenModal(false);
            });
        }

    }

    return (

        <>

            {/* <i class="fa-solid fa-earth-europe"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-github"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-square-twitter"></i>
            <i class="fa-brands fa-square-instagram"></i>
            <i class="fa-brands fa-youtube"></i>

            <i class="fa-brands fa-spotify"></i> */}

            <Form onSubmit={onSubmitForm} autoComplete="off" >
                {/* <AlertMessageError value_logic_data={useTitleAndDescriptionIsRequired} /> */}

                <Form.Group className="mb-3" >
                    <Form.Label className="color_label_input">Title Home</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title"  value={title_job || ""} name="title_job" onChange={onChangeInputValue} />
                </Form.Group>

                <Form.Group className="mb-3 mt-3" >

                    <FloatingLabel controlId="floatingTextarea2" label="Role Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter a description"
                            style={{ height: '200px', resize: "none" }}
                            value={role_description} name="role_description"
                            onChange={onChangeInputValue}
                        />
                    </FloatingLabel>
                </Form.Group>

                <hr />


                <Row>
                    <Col>
                        <Form.Group >
                            <Form.Label className="color_label_input">Name Company </Form.Label>
                            <Form.Control type="text" placeholder="Name Company" name="name_company" value={name_company || ""} onChange={onChangeInputValue} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Url Image Company</Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                                <Form.Control className="input2_style_custom_admin" type="text" placeholder="Enter URL Image" name="url_img_company" value={url_img_company || ""}  onChange={onChangeInputValue} />
                            </InputGroup>
                        </Form.Group>
                    </Col>

                </Row>


                <hr />
                <h4 className="color_label_input text-center">Tech Usaged</h4>
                <hr />

                <TableDataTechUsage useArrRoleTechUsagedInserts={useArrRoleTechUsagedInserts} onToDeleteRoleTechUsaged={onToDeleteRoleTechUsaged}
                    onGetToEditRoleTechUsaged={onGetToEditRoleTechUsaged} useIsEditOrAddRoleTechUsaged={useIsEditOrAddRoleTechUsaged} />
                <Row>
                    <Col>
                        <Form.Group >
                            <Form.Label className="color_label_input">Title </Form.Label>
                            <Form.Control type="text" placeholder="Title" name="title" value={title || ""} onChange={onChangeInputValueAddNewRoleTechUsaged} />
                        </Form.Group>
                    </Col>



                    <div className="text-end mt-3">
                        <Button onMouseDown={(e) => e.preventDefault()} onClick={onAddAndEditRoleTechUsaged} className={` ${!useIsEditOrAddRoleTechUsaged ? "btn_create_data" : 'btn_edit_data'}`} size="sm">
                            {!useIsEditOrAddRoleTechUsaged ? "Add Link Social" : "Edit Link Social"}
                        </Button>{' '}
                    </div>
                </Row>

                <div className="d-grid gap-2 mt-5">
                    <Button onMouseDown={(e) => e.preventDefault()} className={`${data_record ? "btn_edit_data" : "btn_create_data"}`} size="sm" type="submit">

                        {
                            data_record ? "Edit Experience" : "Create Experience"
                        }
                    </Button>
                </div>
            </Form>
        </>
    );

}


