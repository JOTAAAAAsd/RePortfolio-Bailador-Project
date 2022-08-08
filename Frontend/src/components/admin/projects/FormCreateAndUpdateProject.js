
import React, { useState, useEffect } from "react";


// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

// COMPONENTS
import { TableDataImages, TableDataTags } from "./TableData";

// ICONS
import { BiLinkAlt } from "react-icons/bi";

// SHORT ID
import shortid from "shortid";

// FILE EXTERNAL
import { endpointConsumeWithToken } from "../../../HELPERS/endpointConsume";



export const FormCreateAndUpdateProject = (props) => {

    const { data_record, setRenderPage, setIsOpenModal, useOnlyAddDataToDb, setOnlyAddDataToDb } = props;

    const [useInputValues, setInputValues] = useState({
        type_dev_id: "",
        type_language_id: "",
        image_lang_project_id: "",
        title: "",
        url_repo: "",
        url_demo: "",
        url_imgs: [],
        description: "",
        tags: []
    });

    const { type_dev_id, type_language_id, image_lang_project_id, title, url_repo, url_demo, description } = useInputValues;
    const [useTitleAndDescriptionIsRequired, setTitleAndDescriptionIsRequired] = useState("");
    const [useSelectIsRequired, setSelectIsRequired] = useState("");

    const [useTypeLangData, setTypeLangData] = useState([]);
    const [useLoadTypeLangData, setLoadTypeLangData] = useState(true);

    const [useTypeDevData, setTypeDevData] = useState([]);
    const [useLoadTypeDevData, setLoadTypeDevData] = useState(true);

    const [useImageLangProjectData, setImageLangProjectData] = useState([]);
    const [useLoadImageLangProjectData, setLoadImageLangProjectData] = useState(true);

    const onChangeInputValue = (e) => {
        setInputValues({
            ...useInputValues,
            [e.target.name]: e.target.value
        });
    }


    // ------------------------- Add Image
    const [useInputImageValue, setInputImageValue] = useState({
        id: "",
        title_image: "",
        url_image: ""
    });
    const [useArrImagesInserts, setArrImagesInserts] = useState([]);
    const { title_image, url_image } = useInputImageValue;
    const [useIsEditOrAddImage, setIsEditOrAddImage] = useState(false);


    const onChangeInputValueAddNewImage = (e) => {
        setInputImageValue({
            ...useInputImageValue,
            [e.target.name]: e.target.value
        });
    }

    // console.log(useInputImageValue);

    const onAddAndEditImage = () => {

        // console.log(shortid.generate());
        // console.log("We are Add or Edit...");
        // console.log(data_record);
        // console.log(useIsEditOrAddImage)

        if (!useIsEditOrAddImage) {
            // console.log("Image Added.");
            useInputImageValue.id = shortid.generate();
            // console.log(useInputImageValue);

            setArrImagesInserts(item => item && [...item, useInputImageValue]);

        } else {
            // console.log("Imagen Updated.");

            // console.log(useInputImageValue);

            setInputImageValue({
                id: useInputImageValue._id ? useInputImageValue._id : useInputImageValue.id,
                title_image: useInputImageValue.title ? useInputImageValue.title : useInputImageValue.title_image,
                url_image: useInputImageValue.url_img ? useInputImageValue.url_img : useInputImageValue.url_image
            });

            // console.log(useInputImageValue);

            var arr_upd = useArrImagesInserts.map((data) => ((data._id ? data._id : data.id) == (useInputImageValue._id ? useInputImageValue._id : useInputImageValue.id) ? useInputImageValue : data));

            // console.log(arr_upd);

            setArrImagesInserts(arr_upd);

            setIsEditOrAddImage(false);
        }

        // ADD

        // console.log(useOnlyAddDataToDb);
        if (useOnlyAddDataToDb) {
            // console.log(useArrImagesInserts);

            setArrImagesInserts(item => item && [...item, useInputImageValue]);
            setOnlyAddDataToDb(false);
        }

        setInputImageValue({
            id: "",
            title_image: "",
            url_image: ""
        });
    }

    // console.log(useInputImwageValue)
    const onGetToEditImage = (object) => {
        // console.log(object._id);
        setIsEditOrAddImage(true);

        // console.log(object)

        setInputImageValue({
            id: object._id ? object._id : object.id,
            title_image: object.title ? object.title : object.title_image,
            url_image: object.url_img ? object.url_img : object.url_image
        });
    }

    const onToDeleteImage = (data_id) => {

        // console.log(useArrImagesInserts);
        // console.log(data_id);

        // return;
        useArrImagesInserts.forEach((e) => {
            // console.log(e.id);

            // var arr_upd = useArrImagesInserts.map((data) => ((data._id ? data._id : data.id) == 
            // (useInputImageValue._id ? useInputImageValue._id : useInputImageValue.id) ? useInputImageValue : data));

            if ((e._id ? e._id : e.id) == (data_id._id ? data_id._id : data_id.id)) {

                let arr_del = useArrImagesInserts.filter((item) => (item._id ? item._id : item.id) !== (data_id._id ? data_id._id : data_id.id));

                // console.log(arr_del);
                setArrImagesInserts(arr_del);
            }
        });
    }

    // ------------------------- Add Tag
    const [useInputTagValue, setInputTagValue] = useState({
        id: "",
        title_tag: ""
    });
    const [useArrTagsInserts, setArrTagsInserts] = useState([]);
    const { title_tag } = useInputTagValue;
    const [useIsEditOrAddTag, setIsEditOrAddTag] = useState(false);

    const onChangeInputValueAddNewTag = (e) => {
        setInputTagValue({
            ...useInputTagValue,
            [e.target.name]: e.target.value
        });
    }

    // console.log(useInputImageValue);

    const onAddAndEditTag = () => {

        // console.log(shortid.generate());

        // console.log("We are Add or Edit...");

        // console.log(data_record);
        // console.log(useIsEditOrAddImage)

        if (!useIsEditOrAddTag) {
            // console.log("Image Added.");

            useInputTagValue.id = shortid.generate();

            // console.log(useInputImageValue);
            setArrTagsInserts(item => [...item, useInputTagValue]);

        } else {
            // console.log("Imagen Updated.");

            // console.log(useInputImageValue);

            setInputTagValue({
                id: useInputTagValue._id ? useInputTagValue._id : useInputTagValue.id,
                title_tag: useInputTagValue.title ? useInputTagValue.title : useInputTagValue.title_tag
            });

            // console.log(useInputImageValue);

            var arr_upd = useArrTagsInserts.map((data) => ((data._id ? data._id : data.id) == (useInputImageValue._id ? useInputTagValue._id : useInputTagValue.id) ? useInputTagValue : data));

            // console.log(arr_upd);

            setArrTagsInserts(arr_upd);

            setIsEditOrAddTag(false);
        }

        setInputTagValue({
            id: "",
            title_tag: ""
        });
    }

    // console.log(useInputImwageValue)
    const onGetToEditTag = (object) => {
        // console.log(object._id);
        setIsEditOrAddTag(true);

        // console.log(object)

        setInputTagValue({
            id: object._id ? object._id : object.id,
            title_tag: object.title ? object.title : object.title_tag
        });
    }

    const onToDeleteTag = (data_id) => {

        // console.log(useArrImagesInserts);
        // console.log(data_id);

        useArrTagsInserts.forEach((e) => {
            // console.log(e.id);

            if ((e._id ? e._id : e.id) == (data_id._id ? data_id._id : data_id.id)) {

                let arr_del = useArrTagsInserts.filter((item) => (item._id ? item._id : item.id) !== (data_id._id ? data_id._id : data_id.id));

                // console.log(arr_del);
                setArrTagsInserts(arr_del);
            }
        });
    }



    // Effect ToEdit data
    useEffect(() => {

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

        if (data_record !== null) {

            // console.log(data_record);
            setInputValues({
                type_dev_id: data_record?.type_dev_id,
                type_language_id: data_record?.type_language_id._id,
                image_lang_project_id: data_record?.image_lang_project_id,
                title: data_record?.title,
                url_repo: data_record?.url_repo,
                url_demo: data_record?.url_demo,
                description: data_record?.description,
            });

            setArrImagesInserts(data_record?.url_imgs);

            // console.log(useArrImagesInserts)
            setArrTagsInserts(data_record?.tags);

        } else {
            // console.log(data_record); "undefined"
            setInputValues({
                type_dev_id: "",
                type_language_id: "",
                image_lang_project_id: "",
                title: "",
                url_repo: "",
                url_demo: "",
                url_imgs: [],
                description: "",
                tags: []
            });
        }

        setArrImagesInserts(data_record?.url_imgs ? data_record?.url_imgs : []);
        setArrTagsInserts(data_record?.tags ? data_record?.tags : []);

    }, []);


    const onSubmitForm = (e) => {
        e.preventDefault();

        // console.log(useArrImagesAdded);
        // console.log(useArrTagsAdded);
        // console.log(useInputValues);

        var arr_imgs_new = [];
        for (let i in useArrImagesInserts) {
            let element = useArrImagesInserts[i];

            // console.log(element);
            arr_imgs_new.push({
                title: element.title_image ? element.title_image : element.title,
                url_img: element.url_image ? element.url_image : element.url_img
            });
        }

        var arr_tags_new = [];
        for (let i in useArrTagsInserts) {
            let element = useArrTagsInserts[i];

            arr_tags_new.push({
                title: element.title_tag ? element.title_tag : element.title,
            });
        }

        // console.log(arr_tags_new)

        useInputValues.url_imgs = arr_imgs_new;
        useInputValues.tags = arr_tags_new;


        // console.log(useArrImagesInserts);
        // console.log(useInputValues);

        if (data_record) {

            // console.log("Editing...");
            // console.log(useInputValues);

            useInputValues.type_language_id = type_language_id._id ? type_language_id._id : type_language_id;
            useInputValues.type_dev_id = type_dev_id._id ? type_dev_id._id : type_dev_id;
            useInputValues.image_lang_project_id = image_lang_project_id._id ? image_lang_project_id._id : image_lang_project_id;
            // console.log(useInputValues);

            endpointConsumeWithToken(`/project/update/${data_record._id}`, false, "PUT", useInputValues).then((data) => {
                // console.log(data);
                setRenderPage(true);
                setIsOpenModal(false);
            });

        } else {
            // console.log("Adding");
            // console.log(type_dev_id, type_language_id, image_lang_project_id)
            endpointConsumeWithToken(`/project/create`, false, "POST", useInputValues).then((data) => {
                // console.log(data);
                setRenderPage(true);
                setIsOpenModal(false);
            });
        }

        setTitleAndDescriptionIsRequired("");
        setSelectIsRequired("");
    }


    // console.log(type_language_id._id ? type_language_id._id : type_language_id);
    // console.log(type_language_id);

    return (

        <>

            <Form onSubmit={onSubmitForm} autoComplete="off" >
                {/* <AlertMessageError value_logic_data={useTitleAndDescriptionIsRequired} /> */}

                <Form.Group className="mb-3">
                    <Form.Label className="color_label_input">Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" value={title || ""} name="title" onChange={onChangeInputValue} />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">

                    <FloatingLabel controlId="floatingTextarea2" label="Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter a description"
                            style={{ height: '100px', resize: "none" }}
                            value={description} name="description"
                            onChange={onChangeInputValue}
                        />
                    </FloatingLabel>
                </Form.Group>

                <hr />

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Language Type</Form.Label>

                            {

                                (!useLoadTypeLangData) ? (
                                    <>
                                        {
                                            (!useTypeLangData.ok) ? useTypeLangData.message : null
                                        }
                                        {
                                            useTypeLangData.ok ? (

                                                <Form.Select value={type_language_id?._id ? type_language_id._id : type_language_id} name="type_language_id" onChange={onChangeInputValue}>
                                                    <option value="">All</option>

                                                    {
                                                        useTypeLangData?.data.map((e) => (
                                                            <option key={e._id} value={e._id}>{e.title}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            ) : null
                                        }
                                    </>
                                ) : "Loading Type Language..."
                            }


                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Dev Type</Form.Label>
                            {


                                (!useLoadTypeDevData) ? (
                                    <>
                                        {
                                            (!useTypeDevData.ok) ? useTypeDevData.message : null
                                        }
                                        {
                                            useTypeDevData.ok ? (

                                                <Form.Select value={type_dev_id?._id ? type_dev_id._id : type_dev_id} name="type_dev_id" onChange={onChangeInputValue}>
                                                    <option value="">All</option>

                                                    {
                                                        useTypeDevData?.data.map((e) => (
                                                            <option key={e._id} value={e._id}>{e.title}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            ) : null
                                        }
                                    </>
                                ) : "Loading Dev Type..."
                            }
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">Language Image</Form.Label>


                            {


                                (!useLoadImageLangProjectData) ? (
                                    <>
                                        {
                                            (!useImageLangProjectData.ok) ? useImageLangProjectData.message : null
                                        }
                                        {
                                            useImageLangProjectData.ok ? (

                                                <Form.Select value={image_lang_project_id?._id ? image_lang_project_id._id : image_lang_project_id} name="image_lang_project_id" onChange={onChangeInputValue}>
                                                    <option value="">All</option>

                                                    {
                                                        useImageLangProjectData?.data.map((e) => (
                                                            <option key={e._id} value={e._id}>{e.title}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            ) : null
                                        }
                                    </>
                                ) : "Loading Image Lang Project..."
                            }


                        </Form.Group>
                    </Col>
                </Row>

                <Row>

                    <Col md={6}>

                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">URL Repository</Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                                <Form.Control className="input2_style_custom_admin" type="text" placeholder="Enter URL Repo" value={url_repo || ""} name="url_repo" onChange={onChangeInputValue} />

                            </InputGroup>
                        </Form.Group>

                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">URL Demo</Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                                <Form.Control className="input2_style_custom_admin" type="text" placeholder="Enter URL Demo" value={url_demo || ""} name="url_demo" onChange={onChangeInputValue} />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <hr />
                <h4 className="color_label_input text-center">Images</h4>
                <hr />

                <TableDataImages useArrImagesInserts={useArrImagesInserts} onToDeleteImage={onToDeleteImage}
                    onGetToEditImage={onGetToEditImage} useIsEditOrAddImage={useIsEditOrAddImage} />
                {/* <AlertMessageError value_logic_data={useMsjArrsInputImage} /> */}
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="color_label_input">Title </Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name="title_image" value={title_image || ""} onChange={onChangeInputValueAddNewImage} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="color_label_input">URL Image</Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text className="input1_style_custom_admin"><BiLinkAlt /></InputGroup.Text>
                                <Form.Control className="input2_style_custom_admin" type="text" placeholder="Enter URL Image" name="url_image" value={url_image || ""} onChange={onChangeInputValueAddNewImage} />
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <div className="text-end mt-3">
                        <Button onMouseDown={(e) => e.preventDefault()} onClick={onAddAndEditImage} className={` ${!useIsEditOrAddImage ? "btn_create_data" : 'btn_edit_data'}`} size="sm">
                            {!useIsEditOrAddImage ? "Add Image" : "Edit Image"}
                        </Button>{' '}
                    </div>
                </Row>

                <hr />
                <h4 className="color_label_input text-center">Tags</h4>
                <hr />


                <TableDataTags useArrTagsInserts={useArrTagsInserts} onToDeleteTag={onToDeleteTag}
                    onGetToEditTag={onGetToEditTag} useIsEditOrAddTag={useIsEditOrAddTag} />

                {/* <AlertMessageError value_logic_data={useMsjArrsInputImage} /> */}

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="color_label_input">Title </Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name="title_tag" value={title_tag || ""} onChange={onChangeInputValueAddNewTag} />
                        </Form.Group>
                    </Col>

                    <div className="text-end mt-3">
                        <Button onMouseDown={(e) => e.preventDefault()} onClick={onAddAndEditTag} className={` ${!useIsEditOrAddTag ? "btn_create_data" : 'btn_edit_data'}`} size="sm">
                            {!useIsEditOrAddTag ? "Add Tag" : "Edit Tag"}
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


