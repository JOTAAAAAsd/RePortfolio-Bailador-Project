import React from "react";

// Bootstrap
import Alert from 'react-bootstrap/Alert';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

// Icons
import { FiAlertCircle } from "react-icons/fi";





export const MessageServer = (props) => {


    const { message_server, title, alert_class } = props;



    return (
        <>

            <Container className="mt-5 mb-5">
                <Row>
                    <Col md={7} style={{ margin: "0 auto" }}>
                        <Alert className={alert_class}>
                            <Alert.Heading><FiAlertCircle /> {title} said:</Alert.Heading>
                            <p style={{ marginLeft: "5%" }}>
                                {message_server}
                            </p>
                        </Alert>

                    </Col>
                </Row>
            </Container>

        </>
    );

}