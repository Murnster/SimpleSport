import React from "react";
import { useState, useEffect } from "react";
import { get, post } from "../network"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import moment from "moment";

import { faCalendar, faCalendarCheck, faPeopleGroup, faMessage } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import SmallContainer from "./SmallContainer";
import Input from "./Input";

const Dashboard = () => {
    const [dashboardData, getDashboardData] = useState({events: [], roster: [], eventTypes: [], memberTypes: []});

    const fetchDashboard = async () => {
      let data = {
        events: [],
        roster: [],
        eventTypes: [],
        memberTypes: []
      };

      Promise.all([fetchEvents(), fetchRoster(), fetchEventTypes(), fetchMemberTypes()]).then((arrays) => {
        data.events = arrays[0];
        data.roster = arrays[1];
        data.eventTypes = arrays[2];
        data.memberTypes = arrays[3];
      }).then(() => {
        getDashboardData(data);
      });
    };

    const fetchEvents = async () => {
      return await get('events');
    };

    const fetchRoster = async () => {
      return await get('roster');
    };

    const fetchEventTypes = async () => {
      return await get('eventTypes');
    };

    const fetchMemberTypes = async () => {
      return await get('memberTypes');
    };

    const postEvent = async (event) => {
      const res = await post('postEvent', event);
  
      return res;
    };

    const cancelQuickEvent = () => {
      document.getElementById('newEventTitle').value='';
      document.getElementById('newEventType').value = 0;
      document.getElementById('newEventStart').value = moment().format('YYYY-MM-DDThh:mm:ss');
      document.getElementById('newEventEnd').value = moment().add(1, 'h').format('YYYY-MM-DDThh:mm:ss');
      document.getElementById('newEventDesc').value='';
    };

    const quickSaveEvent = async () => {
      const id = document.getElementById('newEventID');
      const title = document.getElementById('newEventTitle');
      const type = document.getElementById('newEventType');
      const start = document.getElementById('newEventStart');
      const end = document.getElementById('newEventEnd');
      const desc = document.getElementById('newEventDesc');
  
      if (title.value === "") {
        title.focus();
        return;
      } else if (type.value === "-1") {
        type.focus();
        return;
      } else if (start.value === "" || !start.value) {
        start.focus();
        return;
      } else if (end.value === "" || !end.value) {
        end.focus();
        return;
      } else if (desc.value === "" || desc.value.length > 255) {
        desc.focus();
        return;
      }
      
      const payload = {
        id: id.value,
        title: title.value,
        typeID: +type.value,
        startDate: start.value,
        endDate: end.value,
        desc: desc.value
      };
      
      const result = await postEvent(payload);
  
      if (result.success) {
        await fetchEvents().then((eventsPayload) => getDashboardData({
          events: eventsPayload,
          roster: dashboardData.roster,
          eventTypes: dashboardData.eventTypes,
          memberTypes: dashboardData.memberTypes
        }));
      } else {
        console.error('There was a failure trying to save this event');
      }
    };

    useEffect(() => {
      const dashboardEffect = async () => {
        await fetchDashboard();
      }
  
      dashboardEffect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const events = dashboardData.events.map(ev => {
      return { title: ev.title, start: ev.startDate, end: ev.endDate };
    });
    
    const calendar = (
      <div className="dashCalContainer">
        <FullCalendar
          plugins={
            [ dayGridPlugin, listPlugin ]
          }
          initialView="listWeek"
          height={475}
          firstDay={1}
          events={events}
          headerToolbar={{start: "title", center: '', end: 'prev,next'}}
          eventClick={() => {}}
        />
      </div>
    );

    const upcomingEvents = (
      <div className="quickEvent">
        <div className="quickEventHeader">Quickly create a new event for your team!</div>
        <input id="newEventID" type={'hidden'} value="-1"></input>
        <div className="quickEventBody">
          <Input id="newEventTitle" type="shorttext" title="Event Title" helper="Name of your event" />
          <Input id="newEventType" type="select" title="Event Type" helper="Select Type of your event" options={dashboardData.eventTypes} />
          <Input id="newEventStart" type="date" title="Event Start Time" helper="When does this event start" />
          <Input id="newEventEnd" type="date" title="Event End Time" helper="When does this event end" />
          <Input id="newEventDesc" type="longtext" title="Event Description" helper="Describe your event" />
        </div>
        <div className="quickEventFooter">
          <button onClick={async () => await quickSaveEvent()} className="quickEventSubmit">Create Event</button>
          <button onClick={() => cancelQuickEvent()} className="quickEventCancel">Cancel</button>
        </div>
      </div>
    );

    const dashRosterHead = (
      <div key={'dashRosterHead'} className="dashRosterRow dashRosterHead">
        <div>Name</div>
        <div>Role</div>
        <div>Phone</div>
        <div>Phone</div>
      </div>
    );
    
    const dashRoster = dashboardData.roster.map((member) =>
      <div key={'member-' + member.memberID.toString()} className="dashRosterRow">
        <div>{member.firstName} {member.lastName}</div>
        <div>{dashboardData.memberTypes.find(t => t.typeID === member.memberTypeID)?.title}</div>
        <div>{member.phone}</div>
        <div>{member.email}</div>
      </div>
    );

    const messageTeam = (
      <div className="msgTeamBox">
        <textarea className="msgTeamText" placeholder="Write something to your team!"></textarea>
        <div className="msgTeamFooter">
          <button className="msgTeamSend">Send Message to Team</button>
        </div>
      </div>
    );

    return (
        <div className="dashboard">
          <div className="row">
            <BigContainer headIcon={faCalendar} title={"Upcoming Events"} content={ calendar } />
            <SmallContainer headIcon={faCalendarCheck} title={"Quick Event"} content={ upcomingEvents } />
          </div>
          <div className="row">
            <BigContainer headIcon={faPeopleGroup} title={"Roster"} content={ [dashRosterHead, dashRoster] } />
            <SmallContainer headIcon={faMessage} title={"Message Team"} content= { messageTeam } />
          </div>
        </div>
    );
}

export default Dashboard;