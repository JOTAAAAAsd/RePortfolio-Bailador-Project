import React from "react";

// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// ICONS
import { RiChatDeleteFill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";




export const TableTypeLanguage = (props) => {

    // console.log(props);

    const { useTypeLangData, onGetToUpdateData, onDeleteData } = props;

    return (
        <Table responsive bordered size="sm" className="card_table_borders_admin">
            <thead>
                <tr className="text-center card_table_header_admin">
                    <th>#</th>
                    <th>Title</th>

                    <th >Actions</th>
                </tr>
            </thead>
            <tbody className="card_table_body_admin">


                {
                    useTypeLangData.data.map((e, i) => (
                        <tr key={e._id}>
                            <td>{i + 1}</td>
                            <td>{e.title}</td>
                            <td className="text-center">
                                <ButtonGroup size="sm">
                                    <Button onClick={() => onDeleteData(e._id, 1)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                        <RiChatDeleteFill style={{ fontSize: "2em" }} />
                                    </Button>
                                    <Button onClick={() => onGetToUpdateData(e, 1)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
                                        <AiOutlineEdit style={{ fontSize: "2em" }} />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }


            </tbody>
        </Table>
    )


}

export const TableTypeDev = (props) => {

    // console.log(props);

    const { useTypeDevData, onGetToUpdateData, onDeleteData } = props;

    return (
        <Table responsive bordered size="sm" className="card_table_borders_admin">
            <thead>
                <tr className="text-center card_table_header_admin">
                    <th>#</th>
                    <th>Title</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody className="card_table_body_admin">


                {
                    useTypeDevData.data.map((e, i) => (
                        <tr key={e._id}>
                            <td>{i + 1}</td>
                            <td className="text-center">
                                {e.title}
                            </td>
                            <td className="text-center">
                                <ButtonGroup size="sm">
                                    <Button onClick={() => onDeleteData(e._id, 2)} onMouseDown={(e) => e.preventDefault()} className="btn_delete_data">
                                        <RiChatDeleteFill style={{ fontSize: "2em" }} />
                                    </Button>
                                    <Button onClick={() => onGetToUpdateData(e, 2)} onMouseDown={(e) => e.preventDefault()} className="btn_edit_data">
                                        <AiOutlineEdit style={{ fontSize: "2em" }} />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </Table>
    )
}


export const TableImageLangProject = (props) => {

    // console.log(props);

    const { useImageLangProjectData, onGetToUpdateData, onDeleteData } = props;

    return (
        <Table responsive bordered size="sm" className="card_table_borders_admin">
            <thead>
                <tr className="text-center card_table_header_admin">
                    <th>#</th>
                    <th>Image</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody className="card_table_body_admin">


                {
                    useImageLangProjectData.data.map((e, i) => (
                        <tr key={e._id}>
                            <td>{i + 1}</td>
                            <td className="text-center">

                                <div>
                                    <Image width={100} fluid={true} src={e.url_img} title={e.title} />
                                </div>

                                {e.title}



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
    )


}