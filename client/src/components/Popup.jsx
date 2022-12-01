import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import "../css/Popup.css";

// Popup componenet
const Popup = ({title, content, closePopup}) => {
    // Popup html
    return (
        <div className="popupWrapper">
            <div className="popupContainer">
                <div className="popupHeader">
                    <h3>{title}</h3>
                    <FontAwesomeIcon icon={faCircleXmark} size="xl" className="cursorPointer" onClick={() => (closePopup())} />
                </div>
                <div className="popupBody">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Popup;