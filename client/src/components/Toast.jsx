import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import React from "react";

// Toast component
const Toast = ({good, toastText, closeToast}) => {
    // Toast html
    return (
        <div className="ssToast">
            <div className={good ? 'green' : 'red'}></div>
            <div className="toastName">
              {toastText}
            </div>
            <div className="toastExit">
              <FontAwesomeIcon icon={faCircleXmark} className="cursorPointer" onClick={() => (closeToast())} />
            </div>
        </div>
    );
}

export default Toast;