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
  const [scheduleData, getScheduleData] = useState({events: [], eventTypes: []});
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedType, setSelectedType] = useState();

  const fetchSchedule = async () => {
    let scheduleData = {
      events: [],
      eventTypes: []
    };

    Promise.all([fetchEvents(), fetchEventTypes()]).then((arrays) => {
      scheduleData.events = arrays[0];
      scheduleData.eventTypes = arrays[1];
    }).then(() => {
      getScheduleData(scheduleData);
    });
  };

  const fetchEvents = async () => {
    return await get('events');
  };

  const fetchEventTypes = async () => {
    return await get('eventTypes');
  };
  
  const newEvent = () => {
    setSelectedType(0);
    setOpenPopup(true);
  };

  const editEvent = (event) => {
    setOpenPopup(true);
    setSelectedType(event.id ? +event.extendedProps.typeID : 0);

    setTimeout(() => {
      const id = document.getElementById('newEventID');
      const title = document.getElementById('newEventTitle');
      const start = document.getElementById('newEventStart');
      const end = document.getElementById('newEventEnd');
      const desc = document.getElementById('newEventDesc');
      const location = document.getElementById('newEventLocation');
      
      id.value = event.id;
      title.value = event.title;
      start.value = moment(event.start).format('YYYY-MM-DDThh:mm:ss');
      end.value = moment(event.end).format('YYYY-MM-DDThh:mm:ss');
      desc.value = event.extendedProps.desc;
      location.value = event.extendedProps.location;
    }, 50);
  }

  const saveEvent = async () => {
    const id = document.getElementById('newEventID');
    const title = document.getElementById('newEventTitle');
    const type = document.getElementById('newEventType');
    const start = document.getElementById('newEventStart');
    const end = document.getElementById('newEventEnd');
    const desc = document.getElementById('newEventDesc');
    const location = document.getElementById('newEventLocation');

    if (title.value === "") {
      title.focus();
      return;
    } else if (selectedType < 0 || !selectedType) {
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
    } else if (location.value === "" || location.value.length > 50) {
      location.focus();
      return;
    }
    
    const payload = {
      id: id.value,
      title: title.value,
      typeID: selectedType,
      startDate: start.value,
      endDate: end.value,
      desc: desc.value,
      location: location.value
    };
    
    const result = await postEvent(payload);

    if (result.success) {
      fetchSchedule();
      setOpenPopup(false);
    } else {
      console.error('There was a failure trying to save this event');
    }
  };

  const deleteEvent = async (eventID) => {
    if (eventID === "-1") {
      setOpenPopup(false);
    } else {
      if (window.confirm('Are you sure you want to delete this event?')) {
        const res = await post('deleteEvent', {
          id: eventID
        });
        
        if (res.success) {
          fetchSchedule();
          setOpenPopup(false);
        }
      }
    }
  };

  const scheduleDataETOptions = scheduleData.eventTypes.map((et) => {
    return { value: et.typeID, label: et.title };
  });

  const handleEType = (e) => {
    setSelectedType(e.value);
  };

  const postEvent = async (event) => {
    const res = await post('postEvent', event);

    return res;
  };

  useEffect(() => {
    const scheduleEffect = async () => {
      await fetchSchedule();
    }

    scheduleEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventPopup = (
    <div className="createEvent">
      <div className="createEventHeader"></div>
      <div className="createEventBody">
        <input id="newEventID" type={'hidden'} value="-1"></input>
        <div className="row">
          <Input id="newEventTitle" type="shorttext" title="Event Title" helper="Name of your event" />
          <Input 
            type="reactSelect"
            title="Event Type"
            helper="Select Type of your event"
            options={scheduleDataETOptions}
            changeProp={handleEType}
            multiple={false}
            valueProp={scheduleDataETOptions.find((type) => +type.value === selectedType)}
          />
        </div>
        <div className="row">
          <Input id="newEventStart" type="date" title="Event Start Time" helper="When does this event start" />
          <Input id="newEventEnd" type="date" title="Event End Time" helper="When does this event end" />
        </div>
        <div className="row">
          <Input id="newEventLocation" type="shorttext" title="Event Location" helper="Where is your event?" />
        </div>
        <div className="row">
          <Input id="newEventDesc" type="longtext" title="Event Description" helper="Describe your event" />
        </div>
      </div>
      <div className="createEventFooter">
        <div className="ssButton" onClick={async () => await saveEvent()}>Submit Event</div>
        <div className="ssButton" onClick={() => setOpenPopup(false)}>Cancel Event</div>
        <div className="ssButton" onClick={async () => await deleteEvent(document.getElementById('newEventID').value)}>Delete Event</div>
      </div>
    </div>
  );

  const calendar = (
    <div style={{postion: 'relative'}}>
      <div className="scheduleHeader">
        <div onClick={() => newEvent()} className="ssButton">Add Event</div>
      </div>
      <div className="dashCalContainer">
        <FullCalendar 
          plugins={ 
            [ dayGridPlugin ]
          }
          initialView="dayGridMonth"
          height={750}
          events={scheduleData?.events.map(ev => {
            return { id: ev.id, title: ev.title, start: ev.startDate, end: ev.endDate, typeID: ev.typeID, desc: ev.desc, location: ev.location };
          })}
          eventClick={info => editEvent(info.event)}
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