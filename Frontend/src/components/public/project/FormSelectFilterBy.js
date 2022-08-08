
import React, { useState, useEffect } from "react";
 

// FILE EXTERNAL
import { endpointConsume } from '../../../HELPERS/endpointConsume';
import { MessageServer } from "../../UI/MessageServer";

// COMPONENTS
import SelectFilter from "./get-data/SelectFilter";
  
 
const FormSelectFilterBy= ()=>{



    const [useTypeDevData, setTypeDevData] = useState([]);
    const [useLoadTypeDevData, setLoadTypeDevData] = useState(true);

    
    const [useTypeLanguageData, setTypeLanguageData] = useState([]);
    const [useLoadLanguageDevData, setLoadTypeLanguageData] = useState(true);
 

    useEffect(() => {

        // Type Dev
        endpointConsume("/type-language/list").then((data) => {
            // console.log(data);
            setLoadTypeLanguageData(false);
            setTypeLanguageData(data);
        });

        // Type Dev
        endpointConsume("/type-dev/list").then((data) => {
            // console.log(data);
            setLoadTypeDevData(false);
            setTypeDevData(data);
        });

    }, []);



    // console.log({ useTypeDevData, useLoadTypeDevData });
    // console.log({ useTypeLanguageData, useLoadLanguageDevData });


    if (!useLoadTypeDevData || !useTypeLanguageData) {

        // console.log("Load Finish");

        // console.log(useTypeDevData);
        // console.log(useTypeLanguageData);
        if(!useTypeDevData.ok && !useTypeLanguageData.ok){
            return <MessageServer message_server={"Type Dev and Type Language: " + useTypeDevData.message + " and " + useTypeLanguageData.message} title="Type Dev or Type Language" alert_class="alert_message_server_red" />;
        
        } else if (!useTypeDevData.ok ) {
            // console.log("Error server");
            return <MessageServer message_server={"Type Dev: " + useTypeDevData.message } title="Type Dev" alert_class="alert_message_server_red" />;
         
        }else if(!useTypeLanguageData.ok){
            return <MessageServer message_server={"Type Language: " + useTypeLanguageData.message } title="Type Language" alert_class="alert_message_server_red" />;
        
        }

        if (useTypeDevData.ok || useTypeLanguageData.ok) {
            // console.log("Data");
            return <SelectFilter useTypeDevData={useTypeDevData} useTypeLanguageData={useTypeLanguageData}/>;

        }  

    } else {
        return "Cargando";
        // return <LoadingComponent title="Projects" />;
    }

}

export default FormSelectFilterBy;






// import React, { useEffect, useState } from "react";

// // Bootstrap
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form';


// // Icons
// import { SiSteinberg, SiSinglestore } from "react-icons/si";
// import { MessageErrorServer } from "../UI/MessageErrorServer";



// import { useHistory } from 'react-router-dom';




// const FormSelectFilterBy = (props) => {


//     const { data_type_dev, loading_type_dev, data_type_language, loading_type_language,
//         setSelectByParams, page, limit_record, useSelectByParams } = props;

//     const history = useHistory();

//     const [useTypeLanguageId, setTypeLanguageId] = useState({ param: "", value: "" });
//     const [useTypeDevId, setTypeDevId] = useState({ param: "", value: "" });

//     var URL_endpoint = `/project/list3?page=${page}&limit=${limit_record}`;

//     // &${useTypeLanguageId.param + useTypeLanguageId.value}
//     useEffect(() => {

//         URL_endpoint = `/project/list3?page=${page}&limit=${limit_record}`;

//         // console.log(loading_type_dev, loading_type_language)

//         // console.log(location.search)
 

//         if (useTypeLanguageId.value && useTypeDevId.value) {
//             URL_endpoint += `&${useTypeLanguageId.param + useTypeLanguageId.value}&${useTypeDevId.param + useTypeDevId.value}`;
//             // setCatchByParam(`projects?${useTypeLanguageId.param + useTypeLanguageId.value}&${useTypeDevId.param + useTypeDevId.value}&page=${page}&limit=${limit_record}`);

            
//         } else if (useTypeLanguageId.value) {

//             URL_endpoint += `&${useTypeLanguageId.param + useTypeLanguageId.value}`;
//             // setCatchByParam(`projects?${useTypeLanguageId.param + useTypeLanguageId.value}`);

            
//             // setCatchTypeLanguageIdValue();

//         } else if (useTypeDevId.value) {
//             URL_endpoint += `&${useTypeDevId.param + useTypeDevId.value}`;
//             // setCatchByParam(`projects?${useTypeDevId.param + useTypeDevId.value}`);

            

//         } // show all data
//         else if (useTypeLanguageId.value === "" || useTypeDevId.value === "") {
//             URL_endpoint = `/project/list3?page=${page}&limit=${limit_record}`;
//             // setCatchByParam(`projects/`);
//             // history.push(`/projects`);

//         }

//         setSelectByParams(URL_endpoint);

//     }, [useTypeLanguageId.value, useTypeDevId.value, useSelectByParams]);



//     // setSelectByParam(e.target.name + e.target.value);
//     const onChangeTypeLanguage = (e) => {
//         // console.log(e.target.name);
//         // console.log(e.target.value);
//         if (e.target.name === "type_language_id") {

//             if (e.target.value === "") {
//                 setTypeLanguageId({ param: "", value: "" });
//                 setTypeDevId({ param: "", value: "" });

                
//             } else {
//                 setTypeLanguageId({ param: "type_language_id=", value: e.target.value });
//             }
//         }
//     }

//     const onChangeTypeDev = (e) => {
//         // console.log(e.target.name);
//         //   console.log(e.target.value);

//         if (e.target.name === "type_dev_id") {

//             if (e.target.value === "") {
//                 setTypeLanguageId({ param: "", value: "" });
//                 setTypeDevId({ param: "", value: "" });
//                 history.push(`/projects`);

//             } else {
//                 setTypeDevId({ param: "type_dev_id=", value: e.target.value });

//             }
//         }
//     }

//     const message_error_server1 = (
//         !loading_type_dev && !data_type_dev?.ok ? (
//             <>
//                 {data_type_dev.message}
//             </>
//         ) : null
//     );

//     const message_error_server2 = (
//         !loading_type_language && !data_type_language?.ok ? (
//             <>
//                 {data_type_language.message}
//             </>
//         ) : null
//     );



//     return (
//         <>

//             {/*SELECT BY SOME CATEGORY */}
//             <div className="mt-3 mb-4">
//                 <Row>
//                     <Col md={2} className="mb-3">
//                         <span style={{ marginLeft: "3%" }}><SiSteinberg style={{ marginRight: "3%" }} />Languages</span>
//                         <Form.Select aria-label="Default select example" className="mt-2" name="type_language_id" defaultValue={""} value={useTypeLanguageId.value} onChange={onChangeTypeLanguage}>
//                             <option value="">All</option>


//                             {
//                                 message_error_server1 ?
//                                     <MessageErrorServer title="Type Language" message_error_server={message_error_server1} /> : (

//                                         <>

//                                             {
//                                                 data_type_language?.ok && !loading_type_language ? (

//                                                     data_type_language.data.map((e, i) => (
//                                                         <option key={e._id} value={e._id}
//                                                             selected={useTypeLanguageId.value === e._id ? true : false}>{e.title}</option>

//                                                     )
//                                                     )

//                                                 ) : "Cargando..."
//                                             }

//                                         </>
//                                     )
//                             }

//                         </Form.Select>
//                     </Col>

//                     <Col md={2} className="mb-3">
//                         <span style={{ marginLeft: "3%" }}><SiSinglestore style={{ marginRight: "3%" }} />Dev Type</span>
//                         <Form.Select aria-label="Default select example" className="mt-2" name="type_dev_id" defaultValue={""} value={useTypeDevId.value} onChange={onChangeTypeDev}>
//                             <option value="">All</option>

//                             {
//                                 message_error_server2 ?
//                                     <MessageErrorServer title="Type Dev" message_error_server={message_error_server2} /> : (

//                                         <>

//                                             {
//                                                 data_type_dev?.ok && !loading_type_dev ? (

//                                                     data_type_dev.data.map((e, i) => (
//                                                         <option key={e._id} value={e._id}
//                                                             selected={useTypeDevId.value === e._id ? true : false}>{e.title}</option>

//                                                     )
//                                                     )

//                                                 ) : "Cargando..."
//                                             }

//                                         </>
//                                     )
//                             }

//                         </Form.Select>
//                     </Col>
//                 </Row>

//             </div>
//         </>
//     );

// }


// export default FormSelectFilterBy;