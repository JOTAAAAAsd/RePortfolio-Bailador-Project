import React from "react";

// LOADING
import ReactLoading from 'react-loading';

 
export const LoadingComponent = (props) => {

    const { title }= props;


    return (

        <div className="react_loading_container" >
            Loading {title}...
            <ReactLoading className="react_loading_custom" type="spin" color="rgb(22, 133, 137)" width={50} />
        </div>

    );
}