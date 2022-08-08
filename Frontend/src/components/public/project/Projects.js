import React, { useState, useEffect } from 'react';


// FILE EXTERNAL
import { endpointConsume } from '../../../HELPERS/endpointConsume';

// COMPONENTS
import Project from "./get-data/Project";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";




const Projects = () => {

    const [useProjectData, setProjectData] = useState([]);
    const [useLoadProjectData, setLoadProjectData] = useState(true);


    // EFFECT 
    useEffect(() => {
        endpointConsume("/project/list").then((data) => {
            console.log(data);
            setLoadProjectData(false);
            setProjectData(data);
        });

    }, []);

    // console.log(useLoadProjectData);
    // console.log(useProjectData);

    if (!useLoadProjectData) {

        // console.log("Load Finish");

        // console.log(useLoadProjectData);
        // console.log(useProjectData);

        if (!useProjectData.ok) {
            // console.log("Error server");
            return <MessageServer message_server={useProjectData.message} title="Project" alert_class="alert_message_server_red" />;
        }

        if (useProjectData.ok) {
            // console.log("Data");
            return <Project useProjectData={useProjectData} />;

        } else {
            // console.log("No Data");
            return <MessageServer message_server={useProjectData.message} title="Project" alert_class="alert_message_server_red" />;
        }

    } else {
        return <LoadingComponent title="Projects" />;
    }
}

export default Projects;

