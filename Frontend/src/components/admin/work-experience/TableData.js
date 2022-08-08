import React from "react";


// Bootstrap
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

// ICONS
import { RiChatDeleteFill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";

 

export const TableDataTechUsage= (props)=>{


    const { useArrRoleTechUsagedInserts, onToDeleteRoleTechUsaged, onGetToEditRoleTechUsaged, useIsEditOrAddRoleTechUsaged } = props;

    // console.log(props);


    // console.log(useArrRoleTechUsagedInserts)


    return (
        <>
            {
                useArrRoleTechUsagedInserts.length > 0 ? (
                    <>

                        <Table responsive bordered size="sm">
                            <thead className="text-center table_bg_color_head">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table_bg_color_body">

                                {

                                    useArrRoleTechUsagedInserts.map((e, i) => (
                                        <tr key={e.id ? e.id : e._id}>
                                            <td className="text-center">{i + 1}</td>
                                            <td >{e.title ? e.title : e.title}</td>
                                            
                                            <td className="text-center">
                                                <ButtonGroup size="sm">

                                                    <Button style={{ pointerEvents: useIsEditOrAddRoleTechUsaged? "none" : "", filter: useIsEditOrAddRoleTechUsaged ? "grayscale(1)" : "" }} onClick={() => onToDeleteRoleTechUsaged(e, i + 1)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                                        <RiChatDeleteFill style={{ fontSize: "1.5em" }} />
                                                    </Button>

                                                    <Button style={{ pointerEvents: useIsEditOrAddRoleTechUsaged? "none" : "", filter: useIsEditOrAddRoleTechUsaged ? "grayscale(1)" : "" }} onClick={() => onGetToEditRoleTechUsaged(e)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
                                                        <AiOutlineEdit style={{ fontSize: "1.5em" }} />
                                                    </Button>

                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>

                    </>
                ) : null
            }

        </>
    );
}

 