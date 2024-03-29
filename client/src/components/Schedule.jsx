import { useState, useEffect } from "react";
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import Input from "./Input";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullContainer from "./FullContainer";
import moment from "moment";
import Popup from "./Popup";
import React from "react";
import Toast from "./Toast";

// Schedule component
const Schedule = ({events, setEvents, eventTypes, isMobile}) => {
  // States
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const [toastObj, setToastObj] = useState({ good: true, toastText: '', isOpen: false });
  
  // Color key for events
  const colorKey = {
    1: '#4f91cd',
    2: '#f53131',
    3: '#f0ff16',
    4: '#ff1d58',
    5: '#edf756',
    6: '#a0d2eb',
    7: '#fff685',
    8: '#f43a09',
    9: '#657a00',
    10: '#1400c6',
    11: '#ff0028',
    12: '#007f4f',
    13: '#ff414e',
    14: '#fea49f',
    15: '#ffffff'
  };
  
  // Open Schedule toast
  const openScheduleToast = (good, toastText) => {
    setToastObj({
      good,
      toastText,
      isOpen: true
    });

    setTimeout(() => {
      closeScheduleToast();
    }, 5000);
  };

  // Close Schedule toast
  const closeScheduleToast = () => {
    setToastObj({
      good: toastObj.good,
      text: toastObj.toastText,
      isOpen: false
    });
  };
  
  // New event func
  const newEvent = (date) => {
    setSelectedType(0);
    setOpenPopup(true);
    
    setTimeout(() => {
      if (date) {
        const start = document.getElementById('newEventStart');
        const end = document.getElementById('newEventEnd');
  
        start.value = moment(date).format('YYYY-MM-DDThh:mm:ss');
        end.value = moment(date).format('YYYY-MM-DDThh:mm:ss');
      }
    },100);
  };

  // Edit event func
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
      const google = document.getElementById('googleEventBtn');
      const outlook = document.getElementById('outlookEventBtn');
      
      id.value = event.id;
      title.value = event.title;
      start.value = moment(event.start).format('YYYY-MM-DDThh:mm:ss');
      end.value = moment(event.end).format('YYYY-MM-DDThh:mm:ss');
      desc.value = event.extendedProps.desc;
      location.value = event.extendedProps.location;

      google.style.display = 'block';
      outlook.style.display = 'block';

      google.onclick = () => serviceLink('google', event.id);

      outlook.onclick = () => serviceLink('outlook', event.id);
    }, 50);
  }

  // Link generation for gmail and outlook
  const serviceLink = (service, eventID) => {
    const event = events.find(ev => +ev.id === +eventID);
    
    if (event) {
      if (service === 'google') {
        const link = new URLSearchParams({
          action: "TEMPLATE",
          text: event.title,
          details: event.desc,
          location: event.location,
          dates: moment(event.startDate).format('YYYYMMDDTHHmmSSZ') + "/" + moment(event.endDate).format('YYYYMMDDTHHmmSSZ')
        });

        window.open(`https://calendar.google.com/calendar/render?${link.toString()}`);
      } else if (service === 'outlook') {
        const link = new URLSearchParams({
          path: "/calendar/action/compose",
          rru: "addevent",
          startdt: event.startDate,
          enddt: event.endDate,
          subject: event.title,
          body: event.desc,
          location: event.location,
          allday: false,
        });
        
        window.open(`https://outlook.live.com/calendar/0/deeplink/compose?${link.toString()}`);
      }
    }
  }

  // Save event function
  const saveEvent = async () => {
    const id = document.getElementById('newEventID');
    const title = document.getElementById('newEventTitle');
    const type = document.getElementById('newEventType');
    const start = document.getElementById('newEventStart');
    const end = document.getElementById('newEventEnd');
    const desc = document.getElementById('newEventDesc');
    const location = document.getElementById('newEventLocation');

    if (title.value === "" || title.value.length > 255) {
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
    } else if (location.value === "" || location.value.length > 255) {
      location.focus();
      return;
    }
    
    let newID = null;
    
    if (id.value === '-1') {
      newID = events.length;
      
      const payload = {
        id: newID ? newID : id.value,
        title: title.value,
        typeID: selectedType,
        startDate: start.value,
        endDate: end.value,
        desc: desc.value,
        location: location.value
      };
      
      setEvents([...events, payload]);
    } else {
      const edit = events.find(e => +e.id === +id.value);
      
      edit.title = title.value;
      edit.typeID = selectedType;
      edit.startDate = start.value;
      edit.endDate = end.value;
      edit.desc = desc.value;
      edit.location = location.value;
    }
    

    setOpenPopup(false);
    openScheduleToast(true, 'Your event was successfully saved!');
  };

  // Delete event func
  const deleteEvent = async (eventID) => {
    if (eventID === "-1") {
      setOpenPopup(false);
    } else {
        if (window.confirm('Are you sure you want to delete this event?')) {
          setOpenPopup(false);
          
          const newEventsArray = events.filter(e => parseInt(e?.id) !== +eventID);
          
          setEvents([...newEventsArray]);
          openScheduleToast(true, 'Your event was successfully deleted!');
        }
    }
  };

  // Event type options 
  const scheduleDataETOptions = eventTypes.map((et) => {
    return { value: et.typeID, label: et.title };
  });

  // Event type state setter
  const handleEType = (e) => {
    setSelectedType(e.value);
  };

  // Hook
  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Popup html
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
        <div className="ssButton" onClick={async () => await saveEvent()}>Save Event</div>
        <div className="ssButton" onClick={() => setOpenPopup(false)}>Cancel Event</div>
        <div className="ssButton" onClick={async () => await deleteEvent(document.getElementById('newEventID').value)}>Delete Event</div>
        <div id="googleEventBtn" className="ssButton hideBtn">Add to Google</div>
        <div id="outlookEventBtn" className="ssButton hideBtn">Add to Outlook</div>
      </div>
    </div>
  );

  // Calendar
  const calendar = (
    <div style={{postion: 'relative'}}>
      <div className="scheduleHeader"></div>
      <div className="dashCalContainer">
        <FullCalendar 
          plugins={ 
            [ dayGridPlugin, interactionPlugin ]
          }
          initialView={isMobile ? "dayGridDay" : "dayGridMonth"}
          height={750}
          eventDisplay="block"
          events={events.map(ev => {
            return { id: ev.id, title: ev.title, start: ev.startDate, end: ev.endDate, typeID: ev.typeID, desc: ev.desc, location: ev.location, backgroundColor: colorKey[ev.typeID], textColor: 'black' };
          })}
          eventClick={info => editEvent(info.event)}
          dateClick={(e) => {
            newEvent(e?.dateStr);
          }}
          dayCellClassNames="cursorPointer"
          customButtons={{
            newEventButton: {
              text: 'Add New Event',
              click: () => {
                newEvent();
              },
            },
          }}
          headerToolbar={
            isMobile ? {
              left: '',
              center: 'title',
              right: 'prev,next'
            } : {
              left: 'dayGridMonth,dayGridWeek,dayGridDay',
              center: 'title',
              right: 'newEventButton prev,next'
          }}
        />
      </div>
      {  
        openPopup ?
        <Popup title="Create New Event" content={eventPopup} closePopup={() => setOpenPopup(false)} /> :
        null
      }
      {
        toastObj.isOpen === true
        ? <Toast good={toastObj.good} toastText={toastObj.toastText} closeToast={closeScheduleToast} />
        : null
      }
    </div>
  );

  // Return calendar html
  return (
      <div className="schedule">
          <FullContainer headIcon={faCalendar} title={"Schedule"} content={ calendar } />
      </div>
  );
}

export default Schedule;