import React from "react";

// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { RiChatDeleteFill } from "react-icons/ri";
import Image from 'react-bootstrap/Image';


// ICONS
import { AiOutlineEdit } from "react-icons/ai";


export const TableAboutMe = (props) => {


    // console.log(props);

    const { useAboutMeData, onGetToUpdateData, onDeleteData } = props;

    return (

        <>
            <Table responsive bordered size="sm" className="card_table_borders_admin">
                <thead>
                    <tr className="text-center card_table_header_admin">
                        <th>#</th>
                        <th>Section</th>
                        <th>Picture</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody className="card_table_body_admin">

                    {
                        useAboutMeData.data.map((e, i) => (
                            <tr key={e._id}>
                                <td className="text-center">-</td>
                                <td className="text-center">
                                    About Me
                                </td>

                                <td>
                                    <div className="text-center">
                                        <Image width={100} fluid={true} src={e.url_img_profile} title="Pic Gastón E. Bailador" />
                                    </div>
                                </td>

                                <td className="text-center">
                                    <ButtonGroup size="sm">
                                        <Button onClick={() => onDeleteData(e._id)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                            <RiChatDeleteFill style={{ fontSize: "2em" }} />
                                        </Button>
                                        <Button onClick={() => onGetToUpdateData(e)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
                                            <AiOutlineEdit style={{ fontSize: "2em" }} />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )).slice(0, 1)
                    }

                </tbody>
            </Table>
        </>
    );
}

