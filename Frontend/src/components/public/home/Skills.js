import React, { useState, useEffect } from "react";

// FILE EXTERNAL
import { endpointConsume } from "../../../HELPERS/endpointConsume";

// COMPONENTS
import Skill from "./get-data/Skill";
import { MessageServer } from "../../UI/MessageServer";
import { LoadingComponent } from "../../UI/LoadingComponent";


const Skills = () => {


    const [useSkillData, setSkillData] = useState([]);
    const [useLoadSkillData, setLoadSkillData] = useState(true);


    useEffect(() => {
        endpointConsume("/skill/list").then((data) => {
            // console.log(data);
            setLoadSkillData(false);
            setSkillData(data);
        });

    }, []);

    // console.log(useLoadSkillData);
    // console.log(useSkillData);

    if (!useLoadSkillData) {

        // console.log("Load Finish");

        // console.log(useLoadSkillData);
        // console.log(useSkillData);

        if (!useSkillData.ok) {
            // console.log("Error server");
            return <MessageServer message_server={useSkillData.message} title="Skill" alert_class="alert_message_server_red" />;
        }

        if (useSkillData.ok) {
            // console.log("Data");
            return <Skill useSkillData={useSkillData} />;

        } else {
            // console.log("No Data");
            return <MessageServer message_server={useSkillData.message} title="About me" alert_class="alert_message_server_red" />;
        }

    } else {
        return <LoadingComponent title="Skills" />;
    }
}

export default Skills;