import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";

// SmallContainer component
const SmallContainer = ({headIcon, title, content}) => {
    // SmallContainer html
    return (
        <div className="smallContainer">
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

export default SmallContainer;