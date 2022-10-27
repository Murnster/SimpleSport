import React from "react";

import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

import FullContainer from "./FullContainer";

import { useState, useEffect } from "react";
import { get, post } from "../network";

import Popup from "./Popup";
import Input from "./Input";

const Schedule = () => {
  const [scheduleData, getScheduleData] = useState([{}]);
  const [openPopup, setOpenPopup] = useState(false);

  const fetchSchedule = async () => {
    const data = await get('events');
    getScheduleData(data);
  };

  const eventPopup = (
    <div className="createEvent">
      <div className="createEventHeader"></div>
      <div className="createEventBody">
        <div className="row">
          <Input id="newEventTitle" type="shorttext" title="Event Title" helper="Name of your event" />
          <Input id="newEventType" type="" title="Event Type" helper="Type of your event" />
        </div>
        <div className="row">
          <Input id="newEventStart" type="shorttext" title="Event Start Time" helper="When does this event start" />
          <Input id="newEventEnd" type="shorttext" title="Event End Time" helper="When does this event end" />
        </div>
        <div className="row">
          <Input id="newEventDesc" type="longtext" title="Event Description" helper="Describe your event" />        </div>
      </div>
      <div className="createEventFooter">
        <button onClick={() => testFunc()}>submit event</button>
        <button>cancel event</button>
      </div>
    </div>
  );
  
  // this works
  const testFunc = () => {
    const test = document.getElementById('newEventTitle');

    console.log(test.value);
  }

  const postEvent = async (event) => {
    const res = await post('postEvent', event);
    
    console.log(res);
  };

  useEffect(() => {
    const scheduleEffect = async () => {
      await fetchSchedule();
    }

    scheduleEffect();
  }, []);

  const events = scheduleData.map(ev => {
      return { title: ev.title, start: ev.startDate, end: ev.endDate };
  });
  
  const calendar = (
    <div>
      <div className="scheduleHeader">
        <button onClick={() => setOpenPopup(true)} className="scheduleButton">Add Event</button>
      </div>
      <div className="calendar"></div>
      <div className="dashCalContainer">
        <FullCalendar 
          plugins={ 
            [ dayGridPlugin ]
          }
          initialView="dayGridMonth"
          height={750}
          events={events}
        />
      </div>
      {  
        openPopup ?
        <Popup title="Create New Event" content={eventPopup} closePopup={() => setOpenPopup(false)} /> :
        null
      }
    </div>
  );

  return (
      <div className="schedule">
          <FullContainer headIcon={faCalendar} title={"Schedule"} content={ calendar } />
      </div>
  );
}

export default Schedule;