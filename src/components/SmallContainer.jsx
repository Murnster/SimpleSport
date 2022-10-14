import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SmallContainer = ({headIcon, title}) => {
    return (
        <div className="smallContainer">
            <div className="containerHeader">
                <div className="containerHeaderIcon">
                    <FontAwesomeIcon icon={headIcon}/>
                </div>
                <div className="containerHeaderTitle">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
}

export default SmallContainer;