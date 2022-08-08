import React from "react";

import { SiAzurepipelines, SiAzuredataexplorer} from "react-icons/si";

const MyTitleSection = (props) => {

    //console.log(props);

 

    return (
        <div className={props.css}>

            <h1 style={{ fontSize: "4em", fontWeight: "bold"}}>
                {props.title}

               <span style={{padding:"1%", color:"white"}}>

                    {
                    props.title === "Skills" ? <SiAzurepipelines/> : null
                }

                {
                    props.title === "Experience" ? <SiAzuredataexplorer /> : null
                }
               </span>

             

                

                
 

                
            </h1 >


        </div >
    );
}

export default MyTitleSection;