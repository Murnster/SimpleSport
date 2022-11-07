import React from "react";

import '../css/App.css';
import '../css/Roster.css';

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import FullContainer from "./FullContainer";

import { get } from "../network";
import Input from "./Input";
import Popup from "./Popup";

const Roster = () => {
    const [rosterData, getRosterData] = useState([{}]);
    const [openPopup, setOpenPopup] = useState(false);

    const fakeDataTypes = [
        { typeID: "1", label: "Player" },
        { typeID: "2", label: "Coach" },
        { typeID: "3", label: "Other" }
    ];

    const fetchRoster = async () => {
        const data = await get('roster');
        getRosterData(data);
    };
    
    const getMemberType = (id) => {
        return fakeDataTypes.find(t => t.typeID === id)?.label;
    };

    const editMember = () => {

    };

    const saveMember = async () => {

    };

    const deleteMember = async () => {

    };

    const postMember = async () => {

    };

    useEffect(() => {
        const rosterEffect = async () => {
          await fetchRoster();
        }
    
        rosterEffect();
    }, []);

    const rosterRows = rosterData.map((member) =>
        <div key={'member-' + member.memberID} className="rosterTableRow">
            <div className="tableCell">{member.firstName}</div>
            <div className="tableCell">{member.lastName}</div>
            <div className="tableCell">{getMemberType(member.memberID)}</div>
            <div className="tableCell">{member.phone}</div>
            <div className="tableCell">{member.email}</div>
        </div>
    );
    
    const rosterPopup = (
        <div className="createMember">
            <div className="createMemberHeader"></div>
            <div className="createMemberBody">
                <input id="newMemberID" type={'hidden'} value="-1"></input>
                <div className="row">
                    <Input id="newMemberFName" type="shortText" title="First Name" helper="Please enter first name" />
                    <Input id="newMemberLName" type="shortText" title="Last Name" helper="Please enter last name" />
                </div>
                <div className="row">
                    <Input id="newMemberPhone" type="shortText" title="Phone" helper="Please enter phone number" />
                    <Input id="newMemberEmail" type="shortText" title="Email" helper="Please enter email" />
                </div>
                <div className="row">
                <Input id="newMemberType" type="select" title="Member Type" helper="Please select the type of this member" options={fakeDataTypes} />
                </div>
                <div className="row">
                    <Input id="newMemberEmName" type="shortText" title="Emergency Contact" helper="Please enter name of emergency contact" />
                    <Input id="newMemberEmPhone" type="shortText" title="Emergency Contact Phone" helper="Please enter phone of emergency contact" />
                </div>
                <div className="row">
                    <Input id="newMemberEmEmail" type="shortText" title="Emergency Contact Email" helper="Please enter email of emergency contact" />
                </div>
            </div>
            <div className="createMemberFooter">
                <button onClick={async () => await saveMember()}>Save</button>
                <button onClick={() => setOpenPopup(false)}>Cancel</button>
                <button onClick={async () => await deleteMember(document.getElementById('newMemberID').value)}>Delete</button>
            </div>
        </div>
    );

    const roster = (
        <div>
            <div className="rosterHeader">
                <button onClick={() => setOpenPopup(true)} className="rosterButton">Add Team Member</button>
            </div>
            <div className="rosterTable">
                <div className="rosterTableHeader">
                    <div className="tableCell"><h3>First Name</h3></div>
                    <div className="tableCell"><h3>Last Name</h3></div>
                    <div className="tableCell"><h3>Role</h3></div>
                    <div className="tableCell"><h3>Phone</h3></div>
                    <div className="tableCell"><h3>Email</h3></div>
                </div>
                <div className="rosterTableBody">
                    {rosterRows}
                </div>
            </div>
            {  
                openPopup ?
                <Popup title="Add New Member" content={rosterPopup} closePopup={() => setOpenPopup(false)} /> :
                null
            }
        </div>
    );

    return (
        <div className="roster">
            <FullContainer headIcon={faPeopleGroup} title={'Roster'} content={roster} />
        </div>
    );
}

export default Roster;