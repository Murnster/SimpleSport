import React from "react";

import "../css/Input.css"

const Input = ({id, type, title, helper, options = {}}) => {
    let inputType;
    let inputSize = "small";

    switch (type) {
        case 'shorttext':
            inputType = (
                <textarea id={id} className="shortTextInput"></textarea>
            );
            break;
        case 'selector':
            inputSize = "large";
            inputType = (
                <textarea id={id} className="longTextInput"></textarea>
            );
            break;
        case 'longtext':
            inputSize = "large";
            inputType = (
                <textarea id={id} className="longTextInput"></textarea>
            );
            break;
        default:
            inputType = (
                <textarea id={id} className="shortTextInput"></textarea>
            );
    }

    return (
        <div className={inputSize === "small" ? "input inputSmall" : "input inputLarge"}>
            <div className="inputHeading">{title}</div>
            <div className="inputContent">{inputType}</div>
            <div className="inputHelper">{helper}</div>
        </div>
    );
}

export default Input;