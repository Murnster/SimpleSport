import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";

// BigContainer component 
const BigContainer = ({headIcon, title, content, headerClick}) => {
    // BigContainer html
    return (
        <div className="bigContainer">
            <div className="containerHeader" onClick={headerClick}>
                <div className="containerHeaderIcon">
                    <FontAwesomeIcon icon={headIcon} size="xl"/>
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

export default BigContainer;