import React, { useState, useEffect } from "react";
import { faCog } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import "../css/System.css";
import Input from "./Input";
import { get, post } from "../network";

const System = () => {
    const [systemData, getSysData] = useState({site: {}, eTypes: [], mTypes: []});
    const [sitePanel, openSitePanel] = useState(false);
    const [eventTypesPanel, openEventTypesPanel] = useState(false);
    const [memberTypesPanel, openMemberTypesPanel] = useState(false);

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
        });
    };

    const openClose = (panel) => {
        if (panel === 'Site') {
            const panel = document.getElementById('siteDataPanel');

            if (sitePanel) {
                panel.style.display = 'none';

                openSitePanel(false);
            } else {
                panel.style.display = 'block';
                console.log(systemData);

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
        } else {
            console.error('There was a failure trying to save site');
        }
    };

    const saveEventType = async () => {
        const newEventType = document.getElementById('newEventType');

        if (newEventType.value === '') {
            newEventType.focus();
            return;
        }

        const payload = {
            id: '-1',
            title: newEventType.value
        };

        const result = await post('postEventType', payload);

        if (result.success) {
            fetchSystem();
        } else {
            console.error('There was a failure trying to save this event type');
        }
    };

    const saveMemberType = async () => {
        const newMemberType = document.getElementById('newMemberType');

        if (newMemberType.value === '') {
            newMemberType.focus();
            return;
        }

        const payload = {
            id: '-1',
            title: newMemberType.value
        };

        const result = await post('postMemberType', payload);

        if (result.success) {
            fetchSystem();
        } else {
            console.error('There was a failure trying to save this member type');
        }
    };

    useEffect(() => {
        const settingsEffect = async () => {
          await fetchSystem();
        }
    
        settingsEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eTypesRows = systemData.eTypes.map((eTypes) =>
        <div key={'eType-' + eTypes.typeID} className="systemTableRow">
            <div className="tableCell">{eTypes.typeID}</div>
            <div className="tableCell">{eTypes.title}</div>
        </div>
    );

    const mTypesRows = systemData.mTypes.map((mTypes) =>
        <div key={'mType-' + mTypes.typeID} className="systemTableRow">
            <div className="tableCell">{mTypes.typeID}</div>
            <div className="tableCell">{mTypes.title}</div>
        </div>
    );

    const siteDataJSX = (
        <div id="siteDataPanel">
            <div className="row">
                <Input id="newTeamName" type="shorttext" title="Team Name" helper="Name of your team" />
                <Input id="newHomeScreen" type="screenSelect" title="Home screen" helper="Select your preferred home screen" />
            </div>
            <div className="row">
                <button onClick={() => saveSystem()} className="systemButton">Save Site</button>
            </div>
        </div>
    );
    
    const eventTypesJSX = (
        <div id="eventTypesPanel">
            <button onClick={() => saveEventType()} className="systemButton">Add New Event Type</button>
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
        </div>
    );

    const memberTypesJSX = (
        <div id="memberTypesPanel">
            <button onClick={() => saveMemberType()} className="systemButton">Add New Member Type</button>
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
        </div>
    );
    
    return (
        <div className="system">
            <BigContainer headIcon={faCog} title={"Site Settings"} content={ siteDataJSX } headerClick={() => openClose('Site')} />
            <BigContainer headIcon={faCog} title={"Event Types"} content={ eventTypesJSX } headerClick={() => openClose('Events')} />
            <BigContainer headIcon={faCog} title={"Member Types"} content={ memberTypesJSX } headerClick={() => openClose('Members')} />
        </div>
    );
}

export default System;