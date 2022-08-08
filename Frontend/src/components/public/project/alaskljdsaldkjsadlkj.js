
// // Bootstrap
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/Card';
// import Image from 'react-bootstrap/Image';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Carousel from 'react-bootstrap/Carousel';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';


// // Icons
// import { FcTodoList, FcIdea, FcAbout } from "react-icons/fc";
// import { SiWebpack, SiCountingworkspro } from "react-icons/si";
// import { FaGithubAlt } from "react-icons/fa";
// import { MdOutlineShortText } from "react-icons/md";
// import { VscDebugBreakpointConditionalUnverified } from "react-icons/vsc";
// import { BsGithub, BsLinkedin } from "react-icons/bs";

// import { GiTechnoHeart, GiPlatform } from "react-icons/gi";

// // Components
// import MyTitleSection from "../UI/MyTitleSection";
// import FormSelectFilterBy from './FormSelectFilterBy';
// import Pagination from "./Pagination";
// import { MessageErrorServer } from '../UI/MessageErrorServer';


// // HOOK
// import { useEndpointConsume } from '../../HOOKS/useEndpointConsume';

// import Badge from 'react-bootstrap/Badge';


// import { useHistory } from 'react-router-dom';

// // usaremos querystring para hacer paginación y también usaremos el withRouter 
// import queryString from "query-string";

// const Project = () => {

//     const [useShowModal, setShowModal] = useState(false);
//     const [useShowDetails, setShowDetails] = useState(null);


    // // --------------------------------------------- PAGINACIÓN VARIABLES Y ESTADOS
    // const history = useHistory();

    // const { location } = history;

    // //  State para la barra de paginación para paginar
    // const [usePageCurrent, setPageCurrent] = useState(1); // propiedad: page 1
    // const [useTotalPages, setTotalPages] = useState(0); // propiedad: total pages: 2

    // // Si no ponemos nada como parámetro de la "url" por defecto nos llevará a la paginación 1 (a la página 1)
    // const { page = 1 } = queryString.parse(location.search); // "page" es la consulta, nombre a elección, ese nombre se lo podemos dar nosotros
    // const limit_record = 20; // Límite de registros por página, puede ser más.

    // const [useSelectByParams, setSelectByParams] = useState(`/project/list3?page=${page}&limit=${limit_record}`);
    // // console.log(useSelectByParams);
    // const [useDataProjects, setDataProjects] = useState([]);
    // const [useLoadingProjects, setLoadingProjects] = useState(true);

 
    // useEffect(() => {

    //     if (location.search) {
    //         fetch("http://localhost:4000/api/v1/project/list3" + location.search + `&page=${page}&limit=${limit_record}`)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 setDataProjects(data);
    //                 setLoadingProjects(false);

    //             });
    //     } else {

    //         // console.log(location.search)
    //         // console.log(useSelectByParams);
    //         // Consumiremos el endpoint con fetch y no con el custom hook
    //         fetch("http://localhost:4000/api/v1" + useSelectByParams)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 // console.log(data);
    //                 setDataProjects(data);
    //                 setLoadingProjects(false);

    //             });

    //     }

    // }, [useSelectByParams, useLoadingProjects]);

//     const { data: data_type_dev, loading: loading_type_dev } = useEndpointConsume("/type-dev/list");
//     const { data: data_type_language, loading: loading_type_language } = useEndpointConsume("/type-language/list");


//     const onCloseModal = () => {
//         setShowDetails(null);
//         setShowModal(false);
//     }


//     const onShowModal = (item_detail) => {
//         console.log(item_detail);
//         setShowDetails(item_detail);
//         setShowModal(true);
//     }

//     const message_error_server = (
//         !useLoadingProjects && !useDataProjects?.ok ? (
//             <>
//                 {useDataProjects?.message}
//             </>
//         ) : null
//     );


//     // console.log(useDataProjects);



//     return (


//         <div>

//             <Card className="card_experience_custom">

//                 <Container>

//                     <MyTitleSection title="Projects" css="section_skill_header" />

//                     <FormSelectFilterBy
//                         data_type_dev={data_type_dev}
//                         loading_type_dev={loading_type_dev}
//                         data_type_language={data_type_language}
//                         loading_type_language={loading_type_language}
//                         useSelectByParams={useSelectByParams}
//                         page={page}
//                         limit_record={limit_record}
//                         setSelectByParams={setSelectByParams}
//                         useDataProjects={useDataProjects}
//                     />

//                     {/* CARDS - RESULT */}

 
//                     <Row>
//                         {
//                             message_error_server ?
//                                 <MessageErrorServer title="Projects" message_error_server={message_error_server} /> :

//                                 (

//                                     <>
//                                         <Row className='mt-3 mb-3'>
//                                             <Col md={3}>
//                                                 <Button style={{ pointerEvents: "none" }} variant="primary" onMouseDown={(e) => e.preventDefault()}>
//                                                     <SiCountingworkspro /> Records <Badge bg="secondary">{useDataProjects.data?.docs.length}</Badge>
//                                                 </Button>
//                                             </Col>
//                                         </Row>

//                                         {
//                                             useDataProjects?.ok && !useLoadingProjects ? (
//                                                 useDataProjects.data?.docs.map((e, i) => (
//                                                     <Col md={3} className="mb-3" key={e._id}>
//                                                         <div className="card_experiences_list">
//                                                             <Card style={{ background: "transparent" }}>
//                                                                 <Image style={{ background: "transparent", border: "0" }} fluid={true} rounded={true} thumbnail={true} alt="" src="https://res.cloudinary.com/da32hm4ja/image/upload/v1642621029/project_MERN_u6iqnf.jpg" />
//                                                                 <Card.Body>
//                                                                     <Card.Title style={{ textAlign: "center" }}>
//                                                                         <h4>{e.title}</h4>
//                                                                     </Card.Title>
//                                                                     <div className="d-grid gap-2 mt-3">
//                                                                         <Button className="" variant="primary" size="sm" onClick={() => onShowModal(e)} onMouseDown={(e) => e.preventDefault()}>
//                                                                             <FcTodoList /> More details
//                                                                         </Button>{' '}
//                                                                     </div>
//                                                                 </Card.Body>
//                                                             </Card>
//                                                         </div>

//                                                         <Modal show={useShowModal} onHide={onCloseModal} className="modal_show_details_container ">
//                                                             <Modal.Header closeButton className='modal_show_details_content modal_show_details_header' style={{ overflow: "hidden", borderTop: "2px solid #5f9ffd", borderLeft: "2px solid #5f9ffd", borderRight: "2px solid #5f9ffd" }}>
//                                                                 <Modal.Title><FcIdea /> {useShowDetails?.title}</Modal.Title>
//                                                             </Modal.Header>
//                                                             <Modal.Body className='modal_show_details_content hmodal_details' style={{ borderBottom: "2px solid #5f9ffd", borderLeft: "2px solid #5f9ffd", borderRight: "2px solid #5f9ffd" }}>
//                                                                 <Carousel variant="dark" >
//                                                                     {
//                                                                         useShowDetails?.url_imgs.map((e) => (
//                                                                             // https://cdn.pixabay.com/photo/2022/07/16/15/34/kid-7325370__340.jpg <-- usar una dimensión para las imagenes como esta
//                                                                             <Carousel.Item key={e._id}>
//                                                                                 <div style={{ margin: "0 auto" }} >
//                                                                                     <Image
//                                                                                         width={300}
//                                                                                         className="d-block  mx-auto"
//                                                                                         src={e.url_img}
//                                                                                         alt={e.title}
//                                                                                     />
//                                                                                 </div>

//                                                                             </Carousel.Item>

//                                                                         ))
//                                                                     }

//                                                                 </Carousel>
//                                                                 <span>
//                                                                     <em>Img total: {useShowDetails?.url_imgs.length}</em>
//                                                                 </span>

//                                                                 <div className="d-grid gap-2 mt-3">
//                                                                     <ButtonGroup aria-label="Basic example">
//                                                                         <a href={useShowDetails?.url_repo} target="_blank" className="btn btn-danger" onMouseDown={(e) => e.preventDefault()}> <FaGithubAlt style={{ fontSize: "2em" }} /> <em>Repo</em></a>
//                                                                         <a href={useShowDetails?.url_demo} target="_blank" className="btn btn-success" onMouseDown={(e) => e.preventDefault()}><SiWebpack style={{ fontSize: "2em" }} /> <em>Demo</em></a>
//                                                                     </ButtonGroup>
//                                                                 </div>

//                                                                 <div className='mt-5'>

//                                                                     <div className='modal_show_details_header_description'>
//                                                                         <h5 >Description<MdOutlineShortText style={{ fontSize: "1.5em" }} /></h5>

//                                                                     </div>

//                                                                     <div className='modal_show_details_p_description'>
//                                                                         <VscDebugBreakpointConditionalUnverified /> {useShowDetails?.description}
//                                                                     </div>

//                                                                     <div className="modal_show_details_tech_used">
//                                                                         <h5>Used in this development</h5>
//                                                                         <ul>
//                                                                             {
//                                                                                 useShowDetails?.tags.map((e) => (
//                                                                                     <>
//                                                                                         <li>{e.title}</li>
//                                                                                     </>
//                                                                                 ))
//                                                                             }

//                                                                             <hr />
//                                                                             <div style={{ textAlign: "center" }}>
//                                                                                 <li><GiTechnoHeart style={{ fontSize: "2em" }} /> {e.type_language_id.title}</li>
//                                                                                 <li><GiPlatform style={{ fontSize: "2em" }} /> {e.type_dev_id.title}</li>
//                                                                             </div>


//                                                                         </ul>
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className='modal_show_details_content modal_show_details_footer mt-5' style={{ overflow: "hidden" }}>

//                                                                     <Modal.Title  ><FcAbout /> My Networks </Modal.Title>
//                                                                     <hr />

//                                                                     <span>
//                                                                         <a href="#" target="__blank">
//                                                                             <BsGithub />
//                                                                         </a>
//                                                                     </span>

//                                                                     <span>
//                                                                         <a href="#" target="__blank">
//                                                                             <BsLinkedin />
//                                                                         </a>
//                                                                     </span>
//                                                                 </div>

//                                                             </Modal.Body>

//                                                         </Modal>

//                                                     </Col>

//                                                 )
//                                                 )

//                                             ) : "Cargando..."
//                                         }
//                                     </>
//                                 )}
//                     </Row>

//                     {
//                         /*
                        
//                             <Pagination 
//                                         usePageCurrent={usePageCurrent}
//                                         useTotalPages={useTotalPages}
                                        
                                        
//                                         />
                        
//                         */
//                     }

//                 </Container>
//             </Card>
//         </div>
//     );
// }


// export default Project;