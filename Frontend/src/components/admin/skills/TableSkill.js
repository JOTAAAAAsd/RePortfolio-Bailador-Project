import React from "react";

// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from 'react-bootstrap/Image';

// ICONS
import { AiOutlineEdit } from "react-icons/ai";
import { RiChatDeleteFill } from "react-icons/ri";


export const TableSkill = (props) => {


    // console.log(props);

    const { useSkillData, onGetToUpdateData, onDeleteData } = props;

    return (

        <>
            <Table responsive bordered size="sm" className="card_table_borders_admin">
                <thead>
                    <tr className="text-center card_table_header_admin">
                        <th>#</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody className="card_table_body_admin">

                    {
                        useSkillData.data.map((e, i) => (
                            <tr key={e._id}>
                                <td>{i + 1}</td>
                                <td className="text-center">
                                    {e.title}
                                </td>

                                <td className="text-center">
                                    <Image width={100} fluid={true} src={e.url_img} title={e.title} />
                                </td>

                                <td className="text-center">
                                    <ButtonGroup size="sm">
                                        <Button onClick={() => onDeleteData(e._id, 3)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                            <RiChatDeleteFill style={{ fontSize: "2em" }} />
                                        </Button>
                                        <Button onClick={() => onGetToUpdateData(e, 3)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
                                            <AiOutlineEdit style={{ fontSize: "2em" }} />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </>
    );
}

