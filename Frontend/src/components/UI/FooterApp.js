import React from "react";

import Card from 'react-bootstrap/Card';



export const FooterApp = () => {


    // Date copy right
    let yearCreate = 2022;
    let today = new Date();
    let yearCurrent = today.getFullYear();


    return (
        <>



            <Card className="card_footer_custom">
                <Card.Body>

                    <div >
                             &copy;Gastón E. Bailador & Bailador Project All rights reserved 2022
                            {(yearCurrent !== yearCreate) ? `- ${yearCurrent}` : null}
 
                    </div>
                </Card.Body>
            </Card>



        </>
    );
}


 