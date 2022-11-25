import React from "react";

import '../css/App.css';
import '../css/Roster.css';

import { useState, useEffect } from "react";

import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import FullContainer from "./FullContainer";

import { get, post } from "../network";
import Input from "./Input";
import Popup from "./Popup";
import Toast from "./Toast";

const Roster = () => {
    const [rosterData, getRosterData] = useState({roster: [], memberTypes: []});
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedType, setSelectedType] = useState();
    const [toastObj, setToastObj] = useState({ good: true, toastText: '', isOpen: false });

    const openDashToast = (good, toastText) => {
        setToastObj({
            good,
            toastText,
            isOpen: true
        });

        setTimeout(() => {
            closeDashToast();
        }, 5000);
    };
  
    const closeDashToast = () => {
        setToastObj({
          good: toastObj.good,
          text: toastObj.toastText,
          isOpen: false
        });
    };
    
    const fetchRosterData = async () => {
        let rosterData = {
            roster: [],
            memberTypes: []
        }
        
        Promise.all([fetchRoster(), fetchMemberTypes()]).then((arrays) => {
            rosterData.roster = arrays[0];
            rosterData.memberTypes = arrays[1];
        }).then(() => {
            getRosterData(rosterData);
            console.log(rosterData);
        });
    };
    
    const fetchRoster = async () => {
        return await get('roster');
    };

    const fetchMemberTypes = async () => {
        return await get('memberTypes');
    };

    const getMemberType = (id) => {
        const title = rosterData?.memberTypes?.find(t => t.typeID === id)?.title;
        
        return title && title !== '' ? title : 'Unknown Role';
    };

    const newMember = () => {
        setSelectedType(0);
        setOpenPopup(true);
    };

    const editMember = (member) => {
        setOpenPopup(true);
        setSelectedType(member?.memberTypeID ? member?.memberTypeID : 0);

        setTimeout(() => {
            const id = document.getElementById('newMemberID');
            const fname = document.getElementById('newMemberFName');
            const lname = document.getElementById('newMemberLName');
            const phone = document.getElementById('newMemberPhone');
            const email = document.getElementById('newMemberEmail');
            const emName = document.getElementById('newMemberEmName');
            const emPhone = document.getElementById('newMemberEmPhone');
            const emEmail = document.getElementById('newMemberEmEmail');

            id.value = member.memberID;
            fname.value = member.firstName;
            lname.value = member.lastName;
            phone.value = member.phone;
            email.value = member.email;
            emName.value = member.emContactName;
            emPhone.value = member.emPhone;
            emEmail.value = member.emEmail;
        }, 50);
    };

    const saveMember = async () => {
        const id = document.getElementById('newMemberID');
        const fname = document.getElementById('newMemberFName');
        const lname = document.getElementById('newMemberLName');
        const phone = document.getElementById('newMemberPhone');
        const email = document.getElementById('newMemberEmail');
        const memberType = document.getElementById('newMemberType');
        const emName = document.getElementById('newMemberEmName');
        const emPhone = document.getElementById('newMemberEmPhone');
        const emEmail = document.getElementById('newMemberEmEmail');

        if (fname.value === "" || fname.value.length > 50) {
            fname.focus();
            return;
        } else if (lname.value === "" || lname.value.length > 50) {
            lname.focus();
            return;
        } else if (phone.value === "" || phone.value.length > 50) {
            phone.focus();
            return;
        } else if (email.value === "" || email.value.length > 50) {
            email.focus();
            return;
        } else if (selectedType < 0|| !selectedType) {
            memberType.focus();
            return;
        } else if (emName.value === "" || emName.value.length > 50) {
            emName.focus();
            return;
        } else if (emPhone.value === "" || emPhone.value.length > 50) {
            emPhone.focus();
            return;
        } else if (emEmail.value === "" || emEmail.value.length > 50) {
            emEmail.focus();
            return;
        }

        const payload = {
            id: id.value,
            fname: fname.value,
            lname: lname.value,
            phone: phone.value,
            email: email.value,
            memberTypeID: selectedType,
            emName: emName.value,
            emPhone: emPhone.value,
            emEmail: emEmail.value
        }

        const result = await postMember(payload);

        if (result.success) {
            fetchRosterData();
            setOpenPopup(false);
            openDashToast(true, 'Your member was successfully saved!');
        } else {
            openDashToast(false, 'Your member was failed to save');
            console.error('There was a failure trying to save this member');
        }
    };

    const deleteMember = async (memberID) => {
        if (memberID === "-1") {
            setOpenPopup(false);
        } else {
            if (window.confirm('Are you sure you want to delete this member?')) {
                const res = await post('deleteMember', {
                    id: memberID
                });

                if (res.success) {
                    fetchRosterData();
                    setOpenPopup(false);
                    openDashToast(true, 'Your member was successfully deleted!');
                } else {
                    openDashToast(false, 'Your member was not deleted, please refresh and try again');
                }
            }
        }
    };

    const rosterDataMTOptions = rosterData.memberTypes.map((m) => {
        return { value: m.typeID, label: m.title };
      });
    
    const handleMType = (e) => {
        setSelectedType(e.value);
    };

    const postMember = async (member) => {
        const res = await post('postMember', member);

        return res;
    };

    useEffect(() => {
        const rosterEffect = async () => {
          await fetchRosterData();
        }
    
        rosterEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rosterRows = rosterData.roster.map((member) =>
        <div key={'member-' + member.memberID} onClick={() => editMember(member)} className="rosterTableRow">
            <div className="tableCell">{member.firstName} {member.lastName}</div>
            <div className="tableCell">{getMemberType(member.memberTypeID)}</div>
            <div className="tableCell">{member.phone}</div>
            <div className="tableCell">{member.email}</div>
            <div className="tableCell rosterHide">{member.emContactName}</div>
            <div className="tableCell rosterHide">{member.emPhone}</div>
            <div className="tableCell rosterHide">{member.emEmail}</div>
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
                <Input 
                    type="reactSelect"
                    title="Member Type"
                    helper="Please select the type of this member"
                    options={rosterDataMTOptions}
                    changeProp={handleMType}
                    multiple={false}
                    valueProp={rosterDataMTOptions.find((type) => +type.value === selectedType)}
                />
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
                <div className="ssButton" onClick={async () => await saveMember()}>Save</div>
                <div className="ssButton" onClick={() => setOpenPopup(false)}>Cancel</div>
                <div className="ssButton" onClick={async () => await deleteMember(document.getElementById('newMemberID').value)}>Delete</div>
            </div>
        </div>
    );

    const roster = (
        <div>
            <div className="rosterHeader"></div>
            <div className="rosterTable">
                <div className="rosterTableHeader">
                    <div className="tableCell">Name</div>
                    <div className="tableCell">Role</div>
                    <div className="tableCell">Phone</div>
                    <div className="tableCell">Email</div>
                    <div className="tableCell rosterHide">Emergency Contact</div>
                    <div className="tableCell rosterHide">Emergency Phone</div>
                    <div className="tableCell rosterHide">Emergency Email</div>
                </div>
                <div className="rosterTableBody">
                    {rosterRows}
                </div>
            </div>
            <div onClick={() => newMember()} className="ssButton">Add Member</div>
            {  
                openPopup ?
                <Popup title="Add New Member" content={rosterPopup} closePopup={() => setOpenPopup(false)} /> :
                null
            }
            {
                toastObj.isOpen === true
                ? <Toast good={toastObj.good} toastText={toastObj.toastText} closeToast={closeDashToast} />
                : null
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