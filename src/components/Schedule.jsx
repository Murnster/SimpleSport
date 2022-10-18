import React from "react";

import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

import FullContainer from "./FullContainer";

const Schedule = () => {
    const data = {
        events: [
          {
            id: 1,
            title: 'Tuesday Practice',
            type: 1,
            startTime: '2022-10-11T16:30:00',
            endTime: '2022-10-11T18:30:00',
            desc: '4:30 start'
          },
          {
            id: 2,
            title: 'Wednesday Practice',
            type: 1,
            startTime: '2022-10-12T16:30:00',
            endTime: '2022-10-12T18:30:00',
            desc: '4:30 start'
          },
          {
            id: 3,
            title: 'Friday Practice',
            type: 1,
            startTime: '2022-10-14T16:30:00',
            endTime: '2022-10-14T18:30:00',
            desc: '4:30 start'
          },
          {
            id: 4,
            title: 'StFX at Acadia',
            type: 2,
            startTime: '2022-10-15T14:00:00',
            endTime: '2022-10-15T16:00:00',
            desc: '2pm KO'
          }
        ]
    };

    const events = data.events.map(ev => {
        return { title: ev.title, start: ev.startTime, end: ev.endTime };
    });
    
    const calendar = (
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
      );

    return (
        <div className="schedule">
            <FullContainer headIcon={faCalendar} title={"Schedule"} content={ calendar } />
        </div>
    );
}

export default Schedule;