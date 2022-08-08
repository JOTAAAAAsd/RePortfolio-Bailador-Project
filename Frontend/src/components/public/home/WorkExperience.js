import React, { useState, useEffect } from "react";

// FILE EXTERNAL
import { endpointConsume } from "../../../HELPERS/endpointConsume";

// COMPONENTS
import Experience from "./get-data/Experience";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";


const WorkExperience = () => {

    const [useWorkExperienceData, setWorkExperienceData] = useState([]);
    const [useLoadWorkExperienceData, setLoadWorkExperienceData] = useState(true);


    useEffect(() => {
        endpointConsume("/work-experience/list").then((data) => {
            // console.log(data);
            setLoadWorkExperienceData(false);
            setWorkExperienceData(data);
        });

    }, []);

    // console.log(useWorkExperienceData);
    // console.log(useLoadWorkExperienceData);

    if (!useLoadWorkExperienceData) {

        // console.log("Load Finish");

        // console.log(useLoadWorkExperienceData);
        // console.log(useWorkExperienceData);


        if (!useWorkExperienceData.ok) {
            // console.log("Error server");
            return <MessageServer message_server={useWorkExperienceData.message} title="Work Experience" alert_class="alert_message_server_red" />;
        }

        if (useWorkExperienceData.ok) {
            // console.log("Data");
            return <Experience useWorkExperienceData={useWorkExperienceData} />;

        } else {
            // console.log("No Data");
            return <MessageServer message_server={useWorkExperienceData.message} title="Work Experience" alert_class="alert_message_server_red" />;
        }

    } else {
        return <LoadingComponent title="Work Experience" />;
    }
}

export default WorkExperience;
