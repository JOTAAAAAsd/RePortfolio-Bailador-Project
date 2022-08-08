import React, { useState, useEffect } from "react";

import { RiChatDeleteFill } from "react-icons/ri";

import { AiOutlineEdit } from "react-icons/ai";


// Bootstrap
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Button from 'react-bootstrap/Button';
 
export const TableDataImages = (props) => {


    const { useArrImagesInserts, onToDeleteImage, onGetToEditImage, useIsEditOrAddImage } = props;


    // console.log(props);


    
    return (
        <>
            {
                useArrImagesInserts.length > 0 ? (
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

                                    useArrImagesInserts.map((e, i) => (
                                        <tr key={e.id ? e.id : e._id}>
                                            <td className="text-center">{i + 1}</td>
                                            <td >{e.title_image ? e.title_image : e.title}</td>
                                            <td className="text-center"><a href={e.url_image ? e.url_image : e.url_img} target="_blank">View Image</a></td>
                                            <td className="text-center">
                                                <ButtonGroup size="sm">

                                                    <Button style={{ pointerEvents: useIsEditOrAddImage ? "none" : "", filter: useIsEditOrAddImage ? "grayscale(1)" : "" }} onClick={() => onToDeleteImage(e, i + 1)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                                        <RiChatDeleteFill style={{ fontSize: "1.5em" }} />
                                                    </Button>

                                                    <Button style={{ pointerEvents: useIsEditOrAddImage ? "none" : "", filter: useIsEditOrAddImage ? "grayscale(1)" : "" }} onClick={() => onGetToEditImage(e)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
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


export const TableDataTags = (props) => {


    const { useArrTagsInserts, onToDeleteTag, onGetToEditTag, useIsEditOrAddTag } = props;
 
    // console.log(props);


    return (
        <>
            {
                useArrTagsInserts?.length > 0 ? (
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

                                    useArrTagsInserts.map((e, i) => (
                                        <tr key={e.id ? e.id : e._id}>
                                            <td className="text-center">{i + 1}</td>
                                            <td >{e.title_tag ? e.title_tag : e.title}</td>
                                            <td className="text-center">
                                                <ButtonGroup size="sm">

                                                    <Button style={{ pointerEvents: useIsEditOrAddTag ? "none" : "", filter: useIsEditOrAddTag ? "grayscale(1)" : "" }} onClick={() => onToDeleteTag(e)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                                        <RiChatDeleteFill style={{ fontSize: "1.5em" }} />
                                                    </Button>

                                                    <Button style={{ pointerEvents: useIsEditOrAddTag ? "none" : "", filter: useIsEditOrAddTag ? "grayscale(1)" : "" }} onClick={() => onGetToEditTag(e)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
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