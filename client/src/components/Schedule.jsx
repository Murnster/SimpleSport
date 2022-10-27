import React from "react";

import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from "moment";

import { useState, useEffect } from "react";
import { get, post } from "../network";

import FullContainer from "./FullContainer";
import Popup from "./Popup";
import Input from "./Input";

const Schedule = () => {
  const [scheduleData, getScheduleData] = useState([{}]);
  const [openPopup, setOpenPopup] = useState(false);

  const fetchSchedule = async () => {
    const data = await get('events');
    getScheduleData(data);
  };

  const fakeDataTypes = [
    { typeID: "1", label: 'Practice' },
    { typeID: "2", label: 'Game' }
  ];

  const eventPopup = (
    <div className="createEvent">
      <div className="createEventHeader"></div>
      <div className="createEventBody">
        <div className="row">
          <Input id="newEventTitle" type="shorttext" title="Event Title" helper="Name of your event" />
          <Input id="newEventType" type="select" title="Event Type" helper="Select Type of your event" options={fakeDataTypes} />
        </div>
        <div className="row">
          <Input id="newEventStart" type="date" title="Event Start Time" helper="When does this event start" />
          <Input id="newEventEnd" type="date" title="Event End Time" helper="When does this event end" />
        </div>
        <div className="row">
          <Input id="newEventDesc" type="longtext" title="Event Description" helper="Describe your event" />
        </div>
      </div>
      <div className="createEventFooter">
        <button onClick={async () => await saveEvent()}>Submit Event</button>
        <button onClick={() => setOpenPopup(false)}>Cancel Event</button>
      </div>
    </div>
  );
  
  const saveEvent = async () => {
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
      title: title.value,
      typeID: +type.value,
      startDate: start.value,
      endDate: end.value,
      desc: desc.value
    };

    console.log(start.value, moment(start.value).format('YYYY-MM-DD hh:mm:ss'));
    console.log('did i pass the test?', payload);
    const result = await postEvent(payload);

    if (result.success) {
      fetchSchedule();
      setOpenPopup(false);
    } else {
      console.error('There was a failure trying to save this event');
    }
  }

  const postEvent = async (event) => {
    const res = await post('postEvent', event);

    return res;
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