import React from "react";

// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';


// ICONS
import { SiAzurepipelines, SiAzuredataexplorer, SiApachespark } from "react-icons/si";


const Skill = (props) => {

    const { useSkillData } = props;


    
    return (
        <>

            <div>

                <Card className="card_skills_custom">

                    <Container>
 

                        {
                            useSkillData.data.map((e, i) => (

                                <figure className="circle_img_card_skill" key={e._id} title={e.title}>
                                    <Image src={e.url_img} alt={e.title} />
                                    <figcaption>

                                        <SiApachespark />
                                        <p>
                                            {e.title}
                                        </p>
                                    </figcaption>
                                </figure>
                            ))
                        }

                    </Container>

                </Card>

            </div>
        </>
    );

}


export default Skill;