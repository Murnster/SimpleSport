import React, { useState, useEffect } from "react";
import { faCog } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import Input from "./Input";
import Toast from "./Toast";
import "../css/System.css";

// System component
const System = ({siteData, updateSiteData, eventTypes, setEventTypes, memberTypes, setMemberTypes}) => {
    // States
    const [systemData, getSysData] = useState({site: {}, eTypes: [], mTypes: []});
    const [sitePanel, openSitePanel] = useState(false);
    const [eventTypesPanel, openEventTypesPanel] = useState(false);
    const [memberTypesPanel, openMemberTypesPanel] = useState(false);
    const [toastObj, setToastObj] = useState({ good: true, toastText: '', isOpen: false });

    // Open System Toast
    const openSystemToast = (good, toastText) => {
        setToastObj({
          good,
          toastText,
          isOpen: true
        });
  
        setTimeout(() => {
          closeSystemToast();
        }, 5000);
    };
    
    // Close System Toast
    const closeSystemToast = () => {
        setToastObj({
          good: toastObj.good,
          text: toastObj.toastText,
          isOpen: false
        });
    };

    // Network calls to get system data
    const fetchSystem = async () => {
        let data = {
            site: {},
            eTypes: [],
            mTypes: []
        };
        
        data.site = siteData;
        data.eTypes = eventTypes;
        data.mTypes = memberTypes;
        
        console.log(data);
        
        getSysData(data);
        updateSiteData(data.site);
    };

    // Open / Close function for settings tabs
    const openClose = (panel) => {
        if (panel === 'Site') {
            const panel = document.getElementById('siteDataPanel');

            if (sitePanel) {
                panel.style.display = 'none';

                openSitePanel(false);
            } else {
                panel.style.display = 'block';

                document.getElementById('newTeamName').value = systemData.site.teamName;
                document.getElementById('newHomeScreen').value = systemData.site.homeScreen;

                openSitePanel(true);
            }
        } else if (panel === 'Events') {
            const panel = document.getElementById('eventTypesPanel');

            if (eventTypesPanel) {
                panel.style.display = 'none';

                openEventTypesPanel(false);
            } else {
                panel.style.display = 'block';

                openEventTypesPanel(true);
            }
        } else if (panel === 'Members') {
            const panel = document.getElementById('memberTypesPanel');

            if (memberTypesPanel) {
                panel.style.display = 'none';

                openMemberTypesPanel(false);
            } else {
                panel.style.display = 'block';

                openMemberTypesPanel(true);
            }
        }
    };

    // Save system data function
    const saveSystem = async () => {
        const teamName = document.getElementById('newTeamName');
        const homeScreen = document.getElementById('newHomeScreen');

        if (teamName.value === '') {
            teamName.focus();
            return;
        } else if (homeScreen.value === '') {
            homeScreen.focus();
            return;
        }

        const payload = {
            teamName: teamName.value,
            homeScreen: homeScreen.value
        };
        
        updateSiteData(payload);
        
        getSysData({
            site: siteData,
            eTypes: eventTypes,
            mTypes: memberTypes
        });
        
        console.log(systemData);
        openSystemToast(true, 'Site Data was successfully saved!');
    };

    // Save Event Types function
    const saveEventType = async () => {
        const newEventType = document.getElementById('newEventType');

        if (newEventType.value === '' || newEventType.value.length > 50) {
            newEventType.focus();
            return;
        }

        const payload = {
            typeID: eventTypes.length + 1,
            title: newEventType.value
        };
        
        setEventTypes([...eventTypes, payload]);
        await fetchSystem();
        
        openSystemToast(true, 'Your new event type was successfully saved!');
    };

    // Save member types function
    const saveMemberType = async () => {
        const newMemberType = document.getElementById('newMemberType');

        if (newMemberType.value === '' || newMemberType.value.length > 50) {
            newMemberType.focus();
            return;
        }

        const payload = {
            typeID: memberTypes.length + 1,
            title: newMemberType.value
        };
        
        setMemberTypes([...memberTypes, payload]);
        await fetchSystem();
        
        openSystemToast(true, 'Your new member type was successfully saved!');
    };

    // Hook
    useEffect(() => {
        const settingsEffect = async () => {
          await fetchSystem();
        }
    
        settingsEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Event type rows
    const eTypesRows = systemData.eTypes.map((eTypes) =>
        <div key={'eType-' + eTypes.typeID} className="systemTableRow">
            <div className="tableCell">{eTypes.typeID}</div>
            <div className="tableCell">{eTypes.title}</div>
        </div>
    );

    // Member types rows
    const mTypesRows = systemData.mTypes.map((mTypes) =>
        <div key={'mType-' + mTypes.typeID} className="systemTableRow">
            <div className="tableCell">{mTypes.typeID}</div>
            <div className="tableCell">{mTypes.title}</div>
        </div>
    );

    // Site data html
    const siteDataJSX = (
        <div id="siteDataPanel">
            <div className="row">
                <Input id="newTeamName" type="shorttext" title="Team Name" helper="Name of your team" />
                <Input id="newHomeScreen" type="screenSelect" title="Home screen" helper="Select your preferred home screen" />
            </div>
            <div className="row">
                <div onClick={() => saveSystem()} className="ssButton">Save Site</div>
            </div>
        </div>
    );
    
    // Event types html
    const eventTypesJSX = (
        <div id="eventTypesPanel">
            <div className="row">
                <Input id="newEventType" type="shorttext" title="Event Type Label" helper="Name of your event type" />
            </div>
            <div className="row">
                <div className="systemTable">
                    <div className="systemTableHeader">
                        <div className="tableCell"><h3>ID</h3></div>
                        <div className="tableCell"><h3>Title</h3></div>
                    </div>
                    <div className="systemTableBody">
                        {eTypesRows}
                    </div>
                </div>
            </div>
            <div onClick={() => saveEventType()} className="ssButton">New Event Type</div>
        </div>
    );

    // Member tyoes html
    const memberTypesJSX = (
        <div id="memberTypesPanel">
            <div className="row">
                <Input id="newMemberType" type="shorttext" title="Member Type Label" helper="Name of your member type" />
            </div>
            <div className="row">
                <div className="systemTable">
                    <div className="systemTableHeader">
                        <div className="tableCell"><h3>ID</h3></div>
                        <div className="tableCell"><h3>Title</h3></div>
                    </div>
                    <div className="systemTableBody">
                        {mTypesRows}
                    </div>
                </div>
            </div>
            <div onClick={() => saveMemberType()} className="ssButton">New Member Type</div>
        </div>
    );
    
    // return system html
    return (
        <div className="system">
            <BigContainer headIcon={faCog} title={"Site Settings"} content={ siteDataJSX } headerClick={() => openClose('Site')} />
            <BigContainer headIcon={faCog} title={"Event Types"} content={ eventTypesJSX } headerClick={() => openClose('Events')} />
            <BigContainer headIcon={faCog} title={"Member Types"} content={ memberTypesJSX } headerClick={() => openClose('Members')} />
            {
                toastObj.isOpen === true
                ? <Toast good={toastObj.good} toastText={toastObj.toastText} closeToast={closeSystemToast} />
                : null
            }
        </div>
    );
}

export default System;