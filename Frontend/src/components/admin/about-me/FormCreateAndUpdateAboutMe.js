import React, { useState, useEffect } from "react";


// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

// COMPONENTS
import { TableDataLinkSocial } from "./TableData";

// ICONS
import { BiLinkAlt } from "react-icons/bi";

// SHORT ID
import shortid from "shortid";

// FILE EXTERNAL
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";



const level_english = [
    {
        id: 0,
        title: "A1"
    },
    {
        id: 1,
        title: "A2"
    },
    {
        id: 2,
        title: "B1"
    },
    {
        id: 3,
        title: "B2"
    },
    {
        id: 4,
        title: "C1"
    },
    {
        id: 5,
        title: "C2"
    }
];

const icos = [

    {
        id: 0,
        title: "Site Web",
        class: "fa-solid fa-earth-europe"
    },
    {
        id: 1,
        title: "LinkedIn",
        class: "fa-brands fa-linkedin"
    },
    {
        id: 2,
        title: "Github",
        class: "fa-brands fa-github"
    },
    {
        id: 3,
        title: "Facebook",
        class: "fa-brands fa-facebook"
    },
    {
        id: 4,
        title: "Twitter",
        class: "fa-brands fa-square-twitter"
    },
    {
        id: 5,
        title: "Instagram",
        class: "fa-brands fa-square-instagram"
    },
    {
        id: 6,
        title: "Youtube",
        class: "fa-brands fa-youtube"
    },
    {
        id: 7,
        title: "Spotify",
        class: "fa-brands fa-spotify"
    }
];



export const FormCreateAndUpdateAboutMe = (props) => {

    const { data_record, setRenderPage, setIsOpenModal, useOnlyAddDataToDb, setOnlyAddDataToDb } = props;

    const [useInputValues, setInputValues] = useState({
        title_home: "",
        url_img_profile: "",
        description: "",
        email: "",
        location: {},
        level_english: {},
        links_social: []
    });

    const { title_home, url_img_profile, description, email } = useInputValues;

    const [useLocation, setLocation] = useState({
        location: "",
        country: "",
        nationality: "",
        url_flag_nationality: ""
    });

    const { location, country, nationality, url_flag_nationality } = useLocation;

    const [useLevelEnglish, setLevelEnglish] = useState({
        level: "",
        url_flag_usa: ""
    });

    const { level, url_flag_usa } = useLevelEnglish;


    // ------------------------- Add Link Social
    const [useInputLinkSocialValue, setInputLinkSocialValue] = useState({
        id: "",
        title_link_social: "",
        class_ico_link_social: "",
        url_link_social: ""
    });
    const [useArrLinkSocialInserts, setArrLinkSocialInserts] = useState([]);
    const { title_link_social, class_ico_link_social, url_link_social } = useInputLinkSocialValue;
    const [useIsEditOrAddLinkSocial, setIsEditOrAddLinkSocial] = useState(false);


    // Effect ToEdit data
    useEffect(() => {

        if (data_record !== null) {

            // // console.log(data_record);
            setInputValues({
                title_home: data_record?.title_home,
                url_img_profile: data_record?.url_img_profile,
                description: data_record?.description,
                email: data_record?.email,
            });

            setLocation(data_record?.location);

            setArrLinkSocialInserts(data_record?.links_social);

            setLevelEnglish(data_record?.level_english);

            // console.log(useArrImagesInserts) 

        } else {
            // console.log(data_record); "undefined"
            setInputValues({
                title_home: "",
                url_img_profile: "",
                description: "",
                email: "",
                location: {},
                level_english: {},
                links_social: []
            });
        }

        setLocation(data_record?.location ? data_record?.location : {});
        setArrLinkSocialInserts(data_record?.links_social ? data_record?.links_social : []);
        setLevelEnglish(data_record?.level_english ? data_record?.level_english : []);

    }, []);

    const onChangeInputValueAddNewLinkSocial = (e) => {
        setInputLinkSocialValue({
            ...useInputLinkSocialValue,
            [e.target.name]: e.target.value
        });
    }

    // console.log(useInputLinkSocialValue);

    const onAddAndEditLinkSocial = () => {

        // console.log(shortid.generate());
        // console.log("We are Add or Edit...");
        // console.log(data_record);
        // console.log(useIsEditOrAddLinkSocial)

        if (!useIsEditOrAddLinkSocial) {
            // console.log("LinkSocial Added.");
            useInputLinkSocialValue.id = shortid.generate();
            // console.log(useInputLinkSocialValue);

            setArrLinkSocialInserts(item => item && [...item, useInputLinkSocialValue]);

        } else {
            // console.log("LinkSocial Updated.");

            // console.log(useInputLinkSocialValue);

            setInputLinkSocialValue({
                id: useInputLinkSocialValue._id ? useInputLinkSocialValue._id : useInputLinkSocialValue.id,
                title_link_social: useInputLinkSocialValue.title_link_social ? useInputLinkSocialValue.title_link_social : useInputLinkSocialValue.title_link_social,
                class_ico_link_social: useInputLinkSocialValue.class_ico_link_social ? useInputLinkSocialValue.class_ico_link_social : useInputLinkSocialValue.class_ico_link_social,
                url_link_social: useInputLinkSocialValue.url_link_social ? useInputLinkSocialValue.url_link_social : useInputLinkSocialValue.url_link_social

            });

            // console.log(useInputLinkSocialValue);

            var arr_upd = useArrLinkSocialInserts.map((data) => ((data._id ? data._id : data.id) == (useInputLinkSocialValue._id ? useInputLinkSocialValue._id : useInputLinkSocialValue.id) ? useInputLinkSocialValue : data));

            // console.log(arr_upd);

            setArrLinkSocialInserts(arr_upd);

            setIsEditOrAddLinkSocial(false);
        }

        // ADD

        // console.log(useOnlyAddDataToDb);
        if (useOnlyAddDataToDb) {
            // console.log(useArrLinkSocialInserts);

            setArrLinkSocialInserts(item => item && [...item, useInputLinkSocialValue]);
            setOnlyAddDataToDb(false);
        }

        setInputLinkSocialValue({
            id: "",
            title_link_social: "",
            class_ico_link_social: "",
            url_link_social: ""
        });
    }


    const onGetToEditLinkSocial = (object) => {
        // console.log(object._id);
        setIsEditOrAddLinkSocial(true);

        // console.log(object)

        setInputLinkSocialValue({
            id: object._id ? object._id : object.id,
            title_link_social: object.title_link_social ? object.title_link_social : object.title_link_social,
            class_ico_link_social: object.class_ico_link_social ? object.class_ico_link_social : object.class_ico_link_social,
            url_link_social: object.url_link_social ? object.url_link_social : object.url_link_social
        });
    }

    const onToDeleteLinkSocial = (data_id) => {

        // console.log(useArrLinkSocialInserts);
        // console.log(data_id);

        // return;
        useArrLinkSocialInserts.forEach((e) => {
            // console.log(e.id);

            // var arr_upd = useArrLinkSocialInserts.map((data) => ((data._id ? data._id : data.id) == 
            // (useInputLinkSocialValue._id ? useLinkSocialImageValue._id : useInputLinkSocialValue.id) ? useInputLinkSocialValue : data));

            if ((e._id ? e._id : e.id) == (data_id._id ? data_id._id : data_id.id)) {

                let arr_del = useArrLinkSocialInserts.filter((item) => (item._id ? item._id : item.id) !== (data_id._id ? data_id._id : data_id.id));

                // console.log(arr_del);
                setArrLinkSocialInserts(arr_del);
            }
        });
    }

    const onChangeInputValue = (e) => {
        setInputValues({
            ...useInputValues,
            [e.target.name]: e.target.value
        });
    }

    const onChangeInputValueLocation = (e) => {
        setLocation({
            ...useLocation,
            [e.target.name]: e.target.value
        });
    }

    const onChangeInputValueLevelEnglish = (e) => {
        setLevelEnglish({
            ...useLevelEnglish,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        console.log({
            useInputValues,
            useLocation,
            useLevelEnglish,
            useArrLinkSocialInserts
        });

        // console.log(useArrImagesAdded);
        // console.log(useArrTagsAdded);
        // console.log(useInputValues);

        var arr_linkSocial_new = [];
        for (let i in useArrLinkSocialInserts) {
            let element = useArrLinkSocialInserts[i];

            // console.log(element);
            arr_linkSocial_new.push({
                title_link_social: element.title_link_social ? element.title_link_social : element.title_link_social,
                class_ico_link_social: element.class_ico_link_social ? element.class_ico_link_social : element.class_ico_link_social,
                url_link_social: element.url_link_social ? element.url_link_social : element.url_link_social,
            });
        }

        // console.log(arr_linkSocial_new);

        useInputValues.links_social = arr_linkSocial_new;


        useInputValues.level_english = useLevelEnglish;
        useInputValues.location = useLocation;

        // console.log(useInputValues);

        if (data_record) {

            console.log("Editing...");
            // console.log(useInputValues);

            endpointConsumeWithToken(`/about-me/update/${data_record._id}`, false, "PUT", useInputValues).then((data) => {
                // console.log(data);
                setRenderPage(true);
                setIsOpenModal(false);
            });

        } else {
            console.log("Adding");
            // console.log(type_dev_id, type_language_id, image_lang_project_id)
            endpointConsumeWithToken(`/about-me/create`, false, "POST", useInputValues).then((data) => {
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

                <Form.Group className="mb-3">
                    <Form.Label className="color_label_input">Title Home</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" value={title_home || ""} name="title_home" onChange={onChangeInputValue} />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">

                    <FloatingLabel controlId="floatingTextarea2" label="Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter a description"
                            style={{ height: '200px', resize: "none" }}
                            value={description || ""} name="description"
                            onChange={onChangeInputValue}
                        />
                    </FloatingLabel>
                </Form.Group>

                <hr />


                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="color_label_input">Email </Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" name="email" value={email || ""} onChange={onChangeInputValue} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Url Image Profile</Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                                <Form.Control className="input2_style_custom_admin" type="text" placeholder="Enter URL Image" name="url_img_profile" value={url_img_profile || ""} onChange={onChangeInputValue} />
                            </InputGroup>
                        </Form.Group>
                    </Col>

                </Row>

                <hr />
                <h4 className="color_label_input text-center">Location</h4>
                <hr />


                <Row>


                    <Col>
                        <Form.Group>
                            <Form.Label className="color_label_input">Location </Form.Label>
                            <Form.Control type="text" placeholder="Email" name="location" value={location || ""} onChange={onChangeInputValueLocation} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label className="color_label_input">Country </Form.Label>
                            <Form.Control type="text" placeholder="Email" name="country" value={country || ""} onChange={onChangeInputValueLocation} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label className="color_label_input">Nationality </Form.Label>
                            <Form.Control type="text" placeholder="Nationality" name="nationality" value={nationality || ""} onChange={onChangeInputValueLocation} />
                        </Form.Group>
                    </Col>

                </Row>

                <Col >
                    <Form.Group className="mt-3 mb-3">
                        <Form.Label className="color_label_input">Url Image Flag Country</Form.Label>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                            <Form.Control className="input2_style_custom_admin" type="text" placeholder="URL Flag Country" name="url_flag_nationality" value={url_flag_nationality || ""} onChange={onChangeInputValueLocation} />
                        </InputGroup>
                    </Form.Group>
                </Col>

                <hr />
                <h4 className="color_label_input text-center">English</h4>
                <hr />

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">English Level</Form.Label>
                            <Form.Select value={level || ""} name="level" onChange={onChangeInputValueLevelEnglish}>
                                <option value="">All</option>
                                {
                                    level_english.map((e) => (
                                        <option key={e.id} value={e.title}>{e.title}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Url Image Flag USA</Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                                <Form.Control className="input2_style_custom_admin" type="text" placeholder="URL Flag USA" name="url_flag_usa" value={url_flag_usa || ""} onChange={onChangeInputValueLevelEnglish} />
                            </InputGroup>
                        </Form.Group>
                    </Col>

                </Row>

                <hr />
                <h4 className="color_label_input text-center">Networks</h4>
                <hr />

                <TableDataLinkSocial useArrLinkSocialInserts={useArrLinkSocialInserts} onToDeleteLinkSocial={onToDeleteLinkSocial}
                    onGetToEditLinkSocial={onGetToEditLinkSocial} useIsEditOrAddLinkSocial={useIsEditOrAddLinkSocial} />
                <Row>
                    <Col>
                        <Form.Group >
                            <Form.Label className="color_label_input">Title </Form.Label>
                            <Form.Control type="text" placeholder="Title" name="title_link_social" value={title_link_social || ""} onChange={onChangeInputValueAddNewLinkSocial} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Ico</Form.Label>

                            <Form.Select name="class_ico_link_social" value={class_ico_link_social || ""} onChange={onChangeInputValueAddNewLinkSocial} >
                                <option value="">All</option>
                                {
                                    icos.map((e) => (
                                        <option key={e.id} value={e.class}>{e.title}</option>
                                    ))
                                }
                            </Form.Select>

                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Url Link Social</Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                                <Form.Control className="input2_style_custom_admin" type="text" placeholder="URL Link Social" name="url_link_social" value={url_link_social || ""} onChange={onChangeInputValueAddNewLinkSocial} />
                            </InputGroup>
                        </Form.Group>
                    </Col>


                    <div className="text-end mt-3">
                        <Button onMouseDown={(e) => e.preventDefault()} onClick={onAddAndEditLinkSocial} className={` ${!useIsEditOrAddLinkSocial ? "btn_create_data" : 'btn_edit_data'}`} size="sm">
                            {!useIsEditOrAddLinkSocial ? "Add Link Social" : "Edit Link Social"}
                        </Button>{' '}
                    </div>
                </Row>

                <div className="d-grid gap-2 mt-5">
                    <Button onMouseDown={(e) => e.preventDefault()} className={`${data_record ? "btn_edit_data" : "btn_create_data"}`} size="sm" type="submit">

                        {
                            data_record ? "Edit Project" : "Create Project"
                        }
                    </Button>
                </div>
            </Form>
        </>
    );

}

