import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import React from "react";
import Select from "react-select";
import "../css/Input.css";

// Input component
const Input = ({id, type, title, helper, options = [], changeProp, valueProp, multiple}) => {
    // Variables
    let inputType;
    let inputSize = "small";

    // Custom multi-select function
    const multiSelectDrop = (id) => {
        document.getElementById(id).classList.remove('display-none');
        document.getElementById('overlay').classList.remove('display-none');
    };

    // Multi-select hide
    const multiSelectHide = (id) => {
        var items = document.getElementsByClassName("dropdownMenu");

        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('display-none');
        }
        document.getElementById("overlay").classList.add('display-none');
    };

    // Switch statement based on type requested when initializing input component
    switch (type) {
        // React-Select input case
        case 'reactSelect':
            inputType = (
                <Select
                    id={id}
                    isMulti={multiple}
                    options={options}
                    styles={{
                        control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: 'black',
                        borderWidth: '2px',
                        borderRadius: '10px',
                        width: '107%',
                        fontFamily: 'system-ui',
                        backgroundColor: 'rgba(208, 208, 208, 0.3)'
                        }),
                    }}
                    onChange={changeProp}
                    value={valueProp}
                />
            );
            break;
        // Short text input case
        case 'shorttext':
            inputType = (
                <textarea id={id} name={id} className="shortTextInput"></textarea>
            );
            break;
        // Type selector input case
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
        // Messenger selector options input case
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
        // Long text input case
        case 'longtext':
            inputSize = "large";
            inputType = (
                <textarea id={id} name={id} className="longTextInput"></textarea>
            );
            break;
        // Datetime input case
        case 'date':
            inputType = (
                <input id={id} name={id} className="datetimeInput" type="datetime-local" defaultValue={moment().format('YYYY-MM-DDThh:mm:ss')}></input>
            );
            break;
        // Multselect input case
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
        // screen select input case
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
        // Default to short text if unknown
        default:
            inputType = (
                <textarea id={id} name={id} className="shortTextInput"></textarea>
            );
    }
    
    // Input html
    return (
        <div className={inputSize === "small" ? "input inputSmall" : "input inputLarge"}>
            <div className="inputHeading">{title}</div>
            <div className="inputContent">{inputType}</div>
            <div className="inputHelper">{helper}</div>
        </div>
    );
}

export default Input;