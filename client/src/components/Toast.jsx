import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Toast = ({good, toastText, closeToast}) => {
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