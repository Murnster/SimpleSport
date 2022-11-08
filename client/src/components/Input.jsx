import React from "react";

import moment from "moment";
import "../css/Input.css"

const Input = ({id, type, title, helper, options = []}) => {
    let inputType;
    let inputSize = "small";
    
    switch (type) {
        case 'shorttext':
            inputType = (
                <textarea id={id} name={id} className="shortTextInput"></textarea>
            );
            break;
        case 'typeSelect':
            inputType = (
                <select id={id} name={id} className="selectInput">
                    <option value="-1">Select a type</option>
                    {
                        options.map((opt) => {
                            return <option key={opt.typeID} value={opt.typeID}>{opt.title}</option>
                        })
                    }
                </select>
            );
            break;
        case 'messengerSelect':
            inputType = (
                <select id={id} name={id} className="selectInput">
                    <option value="-1">Send to all members</option>
                    {
                        options.map((opt) => {
                            return <option key={opt.memberID} value={opt.memberID}>{opt.firstName} {opt.lastName}</option>
                        })
                    }
                </select>
            );
            break;
        case 'longtext':
            inputSize = "large";
            inputType = (
                <textarea id={id} name={id} className="longTextInput"></textarea>
            );
            break;
        case 'date':
            inputType = (
                <input id={id} name={id} className="datetimeInput" type="datetime-local" defaultValue={moment().format('YYYY-MM-DDThh:mm:ss')}></input>
            );
            break;
        default:
            inputType = (
                <textarea id={id} name={id} className="shortTextInput"></textarea>
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