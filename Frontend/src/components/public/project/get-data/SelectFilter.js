
import React, { useEffect, useState } from "react";



// BOOTSTRAP
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';


// Icons
import { SiSteinberg, SiSinglestore } from "react-icons/si";

import { useHistory } from 'react-router-dom';




const SelectFilter = (props) => {


    const { useTypeDevData, useTypeLanguageData } = props;

    const [useTypeLanguageId, setTypeLanguageId] = useState({ param: "", value: "" });
    const [useTypeDevId, setTypeDevId] = useState({ param: "", value: "" });


    const history = useHistory();


    // setSelectByParam(e.target.name + e.target.value);
    const onChangeTypeLanguage = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        if (e.target.name === "type_language_id") {

            if (e.target.value === "") {
                setTypeLanguageId({ param: "", value: "" });
                setTypeDevId({ param: "", value: "" });

                
            } else {
                setTypeLanguageId({ param: "type_language_id=", value: e.target.value });
            }
        }
    }

    const onChangeTypeDev = (e) => {
        // console.log(e.target.name);
        //   console.log(e.target.value);

        if (e.target.name === "type_dev_id") {

            if (e.target.value === "") {
                setTypeLanguageId({ param: "", value: "" });
                setTypeDevId({ param: "", value: "" });
                history.push(`/projects`);

            } else {
                setTypeDevId({ param: "type_dev_id=", value: e.target.value });

            }
        }
    }



    // console.log(useTypeDevData, useTypeLanguageData);

    return (
        <>


            {/*SELECT BY SOME CATEGORY */}
            <div className="mt-3 mb-4">
                <Row>
                    <Col md={2} className="mb-3">
                        <span style={{ marginLeft: "3%" }}><SiSteinberg style={{ marginRight: "3%" }} />Languages</span>
                        <Form.Select aria-label="Default select example" className="mt-2" name="type_language_id" defaultValue={""} value={useTypeLanguageId.value} onChange={onChangeTypeLanguage}>
                            <option value="">All</option>
                            {
                                useTypeLanguageData.data.map((e, i) => (
                                    <option key={e._id} value={e._id} >{e.title}</option>
                                ))

                            }
                        </Form.Select>
                    </Col>

                    <Col md={2} className="mb-3">
                        <span style={{ marginLeft: "3%" }}><SiSinglestore style={{ marginRight: "3%" }} />Development</span>
                        <Form.Select aria-label="Default select example" className="mt-2" name="type_dev_id" defaultValue={""} value={useTypeDevId.value} onChange={onChangeTypeDev}>
                            <option value="">All</option>

                            {
                                useTypeDevData.data.map((e, i) => (
                                    <option key={e._id} value={e._id}>{e.title}</option>
                                ))
                            }

                        </Form.Select>
                    </Col>
                </Row>

            </div>
        </>
    );

}

export default SelectFilter;