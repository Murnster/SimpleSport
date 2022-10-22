import React from "react";

import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

import FullContainer from "./FullContainer";

import { useState } from "react";
import { useEffect } from "react";
import { get, post } from "../network";

const Schedule = () => {
  const [scheduleData, getScheduleData] = useState([{}]);

  const fetchSchedule = async () => {
    const data = await get('events');
    getScheduleData(data);
  };

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
        <button onClick={() => postEvent()} className="scheduleButton">Add Event</button>
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
    </div>
  );

  return (
      <div className="schedule">
          <FullContainer headIcon={faCalendar} title={"Schedule"} content={ calendar } />
      </div>
  );
}

export default Schedule;