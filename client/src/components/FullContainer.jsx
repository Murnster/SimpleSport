import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FullContainer = ({headIcon, title, content}) => {
    
    return (
        <div className="fullContainer">
            <div className="containerHeader">
                <div className="containerHeaderIcon">
                    <FontAwesomeIcon icon={headIcon} size="xl" />
                </div>
                <div className="containerHeaderTitle">
                    <h3>{title}</h3>
                </div>
            </div>
            <div className="containerBody">
                {content}
            </div>
        </div>
    );
}

export default FullContainer;