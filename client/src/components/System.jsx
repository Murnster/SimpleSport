import React, { useState, useEffect } from "react";
import { get, post } from "../network";
import { faCog } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import Input from "./Input";
import Toast from "./Toast";
import "../css/System.css";

// System component
const System = ({updateSiteData}) => {
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

        Promise.all([
            get('siteData'),
            get('eventTypes'),
            get('memberTypes')
        ]).then((arrays) => {
            data.site = arrays[0][0];
            data.eTypes = arrays[1];
            data.mTypes = arrays[2];
        }).then(() => {
            getSysData(data);
            updateSiteData(data.site);
        });
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

        const result = await post('postSiteData', payload);

        if (result.success) {
            await fetchSystem();
            openSystemToast(true, 'Site Data was successfully saved!');
        } else {
            openSystemToast(false, 'There was an issue saving Site Data, please refresh and try again');
            console.error('There was a failure trying to save site');
        }
    };

    // Save Event Types function
    const saveEventType = async () => {
        const newEventType = document.getElementById('newEventType');

        if (newEventType.value === '' || newEventType.value.length > 50) {
            newEventType.focus();
            return;
        }

        const payload = {
            id: '-1',
            title: newEventType.value
        };

        const result = await post('postEventType', payload);

        if (result.success) {
            newEventType.value = '';
            openSystemToast(true, 'Your new event type was successfully saved!');
            fetchSystem();
        } else {
            openSystemToast(false, 'There was a failure trying to save this event type');
            console.error('There was a failure trying to save this event type');
        }
    };

    // Save member types function
    const saveMemberType = async () => {
        const newMemberType = document.getElementById('newMemberType');

        if (newMemberType.value === '' || newMemberType.value.length > 50) {
            newMemberType.focus();
            return;
        }

        const payload = {
            id: '-1',
            title: newMemberType.value
        };

        const result = await post('postMemberType', payload);

        if (result.success) {
            newMemberType.value = '';
            openSystemToast(true, 'Your new member type was successfully saved!');
            fetchSystem();
        } else {
            openSystemToast(false, 'There was a failure trying to save this member type');
            console.error('There was a failure trying to save this member type');
        }
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