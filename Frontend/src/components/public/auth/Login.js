
import React, { useState, useContext, useEffect } from "react";

// CONTEXT
import { AuthContext } from "../../../CONTEXT/Auth_context";

// BOOTSTRAP
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Router
import { Link, useHistory } from "react-router-dom";
import { endpointAuth } from "../../../HELPERS/endpointConsume";

// COMPONENTS
import { MessageServer } from "../../UI/MessageServer";

const Login = () => {

    const history = useHistory();

    const auth_context = useContext(AuthContext);

    const { user, isLoading } = auth_context; //cuando ingresemos obtenremos esta informacion

    // console.log(auth_context);

    useEffect(() => {

        //console.log(usuario_context)
        if (user && !isLoading) {

            history.push("/admin");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);



    const [useInputValue, setInputValue] = useState({

        username: "",
        password: ""

    });

    const { username, password } = useInputValue;

    const [useCatchData, setCatchData] = useState([]);
    const [useLoadingData, setLoadingData] = useState(true);


    const onChangeInputValue = (e) => {

        setInputValue({
            ...useInputValue,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitForm = (e) => {

        e.preventDefault();
 
        endpointAuth("/user/login", useInputValue).then((data) => {
            // console.log(data);
            setLoadingData(false);
            setCatchData(data);

            if (data.ok) {

                const { token_access, token_update } = data;

                localStorage.setItem("token_access", token_access);
                localStorage.setItem("token_update", token_update);

                window.location.href = "/admin/types-and-image-lang-project";
            }

        });

        // console.log(useInputValue);

    }

    return (


        <>


            <div className="mt-5">

                <Card className="card_auth_custom">

                    <Container>



                        <Row>


                            <Col md={4} className="mx-auto">
                                {/* <MessageServer message_server={useCatchData.message} title="Login" alert_class="alert_message_server_red"/> */}

                                {
                                    !useLoadingData && !useCatchData.ok ? <MessageServer message_server={useCatchData.message} title="Login" alert_class="alert_message_server_red" /> : (
                                        <div className="text-center mb-3">
                                            <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>
                                                Login
                                            </h1 >
                                        </div>
                                    )
                                }
                                <Form onSubmit={onSubmitForm} autoComplete="off" >

                                    <Form.Group className="mb-3" >
                                        <Form.Label className="color_label_input">Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Username" value={username} name="username" onChange={onChangeInputValue} />
                                    </Form.Group>


                                    <Form.Group className="mb-3" >
                                        <Form.Label className="color_label_input">Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password" value={password} name="password" onChange={onChangeInputValue} />
                                    </Form.Group>

                                    <hr />

                                    <div className="text-end">
                                        <Link to="/auth/register">Register</Link>
                                    </div>

                                    <div className="d-grid gap-2 mt-5">
                                        <Button onMouseDown={(e) => e.preventDefault()} className="btn_create_data" size="sm" type="submit">
                                            Login
                                        </Button>

                                    </div>

                                </Form>

                            </Col>
                        </Row>


                    </Container>

                </Card>
            </div>

        </>
    );
}

export default Login;