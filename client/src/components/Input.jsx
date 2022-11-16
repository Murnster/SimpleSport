import React from "react";

import moment from "moment";
import "../css/Input.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

const Input = ({id, type, title, helper, options = []}) => {
    let inputType;
    let inputSize = "small";

    const multiSelectDrop = (id) => {
        document.getElementById(id).classList.remove('display-none');
        document.getElementById('overlay').classList.remove('display-none');
    };

    const multiSelectHide = (id) => {
        var items = document.getElementsByClassName("dropdownMenu");

        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('display-none');
        }
        document.getElementById("overlay").classList.add('display-none');
    };

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
                    <option value="-2">Send to all members</option>
                    <option value="-1">Send to selected member types</option>
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
        case 'multiSelect':
            inputType = (
                <div id={id}>
                    <button className="multiSelectInput" onClick={(e) => multiSelectDrop('dropdownMenu-'+id)}><span>Select</span><FontAwesomeIcon icon={faChevronCircleDown}/></button>
                    <div id={'dropdownMenu-'+id} className='dropdownMenu display-none'>
                        <span value="-2" className="dropdownOption"><label><input type="checkbox" />Send to all members</label></span>
                        <span value="-1" className="dropdownOption"><label><input type="checkbox" />Send to selected member type</label></span>
                        {
                            options.map((opt) => {
                                return <span key={opt.memberID} value={opt.memberID} className="dropdownOption"><label><input type="checkbox" />{opt.firstName} {opt.lastName}</label></span>
                            })
                        }
                    </div>
                    <div id="overlay" className="display-none" onClick={() => multiSelectHide('dropdownMenu-'+id)}></div>
                </div>
            );
            break;
        case 'screenSelect':
            inputType = (
                <select id={id} name={id} className="selectInput">
                    <option value="Dashboard">Dashboard</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Roster">Roster</option>
                    <option value="Messenger">Messenger</option>
                </select>
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