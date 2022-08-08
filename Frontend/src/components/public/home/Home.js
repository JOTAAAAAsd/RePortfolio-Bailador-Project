import React, { useState, useEffect } from "react";

// FILE EXTERNAL
import { endpointConsume } from "../../../HELPERS/endpointConsume";

// COMPONENTS
import AboutMe from "./get-data/AboutMe";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";
 
const Home = () => {


    const [useAboutMeData, setAboutMeData] = useState([]);
    const [useLoadAboutMeData, setLoadAboutMeData] = useState(true);


    useEffect(() => {
        endpointConsume("/about-me/list").then((data) => {
            // console.log(data);
            setLoadAboutMeData(false);
            setAboutMeData(data);
        });

    }, []);

    // console.log(useAboutMeData);
    // console.log(useLoadAboutMeData);

    if (!useLoadAboutMeData) {

        // console.log("Load Finish");

        // console.log(useLoadAboutMeData);
        // console.log(useAboutMeData);


        if (!useAboutMeData.ok) {
            // console.log("Error server");
            return <MessageServer message_server={useAboutMeData.message} title="About me" alert_class="alert_message_server_red" />;
        }

        if (useAboutMeData.ok) {
            // console.log("Data");
            return <AboutMe useAboutMeData={useAboutMeData} />;

        } else {
            // console.log("No Data");
            return <MessageServer message_server={useAboutMeData.message} title="About me" alert_class="alert_message_server_red" />;
        }

    } else {
        return <LoadingComponent  title="About Me"/>;
    }
}

export default Home;
