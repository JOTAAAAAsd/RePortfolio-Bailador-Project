import React, { useState, useEffect } from "react";


// Bootstrap

// Location
import { useHistory } from "react-router-dom";




const Pagination = (props) => {


    const { usePageCurrent, useTotalPages} = props;


    const history = useHistory();

    const { location } = history;



    // FOOTER PAGINACIÓN 
    const onClickBarPaginationByNumber = (pag_num) => {
        console.log(pag_num);
    }


    // Paginación: Flecha Izquierda
    const onClickBarPaginationLeftArrow = () => {

        console.log("Back");

    }

    // Paginación: Flecha Right
    const onClickBarPaginationRightArrow = () => {

        console.log("Next");
    }


    // Mostraremos los números a desplazarnos en nuestra paginación en base al registro que tengamos 
    let pagination_item_active = 1;

    let btn_item_pagination = [];

    for (let pag = 1; pag <= 12; pag++) {

        btn_item_pagination.push(
            // Se desactivará el items si estamos posicionado en él para evitar la propagación de clicks
            <Pagination.Item disabled={pag === pagination_item_active}
                onClick={() => onClickBarPaginationByNumber(pag)} key={pag}
                active={pag === pagination_item_active}>

                {pag}

            </Pagination.Item>
        );

    }


    return (
        <>
            <div className="pagination pagination justify-content-center">

{/*


                <Pagination size="sm">

                    {
                        (usePageCurrent === 1) ? null : (
                            <Pagination.Prev onClick={onClickBarPaginationLeftArrow} />
                        )
                    }

                    {
                        btn_item_pagination
                    }

                    {
                        (usePageCurrent === useTotalPages) ? null : (
                            <Pagination.Next onClick={onClickBarPaginationRightArrow} />
                        )
                    }

                </Pagination>

 */}

            </div>
        </>
    );

}






export default Pagination;