import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";

//FullContainer component
const FullContainer = ({headIcon, title, content}) => {
    // FullContainer html
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