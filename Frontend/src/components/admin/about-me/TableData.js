import React from "react";

// Bootstrap
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

// ICONS
import { RiChatDeleteFill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";


export const TableDataLinkSocial = (props) => {


    const { useArrLinkSocialInserts, onToDeleteLinkSocial, onGetToEditLinkSocial, useIsEditOrAddLinkSocial } = props;

    // console.log(props);


    return (
        <>
            {
                useArrLinkSocialInserts.length > 0 ? (
                    <>

                        <Table responsive bordered size="sm">
                            <thead className="text-center table_bg_color_head">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>View site</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table_bg_color_body">

                                {

                                    useArrLinkSocialInserts.map((e, i) => (
                                        <tr key={e.id ? e.id : e._id}>
                                            <td className="text-center">{i + 1}</td>
                                            <td >{e.title_link_social ? e.title_link_social : e.title_link_social}</td>
                                            <td className="text-center">

                                                <span title={e.title_link_social}>
                                                    <a href={e.url_link_social} target="_blank">
                                                        <i className={e.class_ico_link_social}></i>
                                                    </a>
                                                </span>


                                            </td>
                                            <td className="text-center">
                                                <ButtonGroup size="sm">

                                                    <Button style={{ pointerEvents: useIsEditOrAddLinkSocial ? "none" : "", filter: useIsEditOrAddLinkSocial ? "grayscale(1)" : "" }} onClick={() => onToDeleteLinkSocial(e, i + 1)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                                        <RiChatDeleteFill style={{ fontSize: "1.5em" }} />
                                                    </Button>

                                                    <Button style={{ pointerEvents: useIsEditOrAddLinkSocial ? "none" : "", filter: useIsEditOrAddLinkSocial ? "grayscale(1)" : "" }} onClick={() => onGetToEditLinkSocial(e)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
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

