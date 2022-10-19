import React from "react";
import Moment from 'react-moment';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

import { faCalendar, faCalendarCheck, faPeopleGroup, faMessage } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import SmallContainer from "./SmallContainer";

const Dashboard = () => {
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
      ],
      roster: [
        {
          id: 1,
          name: 'Ryan Murney',
          phone: '9024021227',
          roleID: 1,
          emContactName: 'Gerry Murney',
          emContactRelation: 'Father',
          emContactPhone: '9022925560'
        },
        {
          id: 2,
          name: 'Cairan Boone',
          phone: '9024506078',
          roleID: 1,
          emContactName: 'Travis Best',
          emContactRelation: 'Uncle',
          emContactPhone: '6508475598'
        },
        {
          id: 3,
          name: 'James Alder',
          phone: '9024663456',
          roleID: 2,
          emContactName: 'Anna Alder',
          emContactRelation: 'Partner',
          emContactPhone: '9027554312'
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
          height={475}
          events={events}
        />
      </div>
    );

    // data.events.forEach(ev => {
    //   upcomingEv.push((
    //       <div className="upcomingRow">
    //         <div>{ev.title}</div>
    //         <div>{ev.startTime}</div>
    //         <div>{ev.desc}</div>
    //       </div>
    //     ));
    // });

    const upcomingEvents = data.events.map((ev) => 
      <div key={'event-' + ev.id.toString()} className="upcomingRow">
        <div>{ev.title}</div>
        <div>{ev.startTime}</div>
        <div>{ev.desc}</div>
      </div>
    );

    const roster = data.roster.map((member) => 
      <div key={'member-' + member.id.toString()} className="upcomingRow">
        <div>{member.name}</div>
        <div>{member.phone}</div>
        <div>{member.emContactName}</div>
        <div>{member.emContactPhone}</div>
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
            <BigContainer headIcon={faCalendar} title={"Schedule"} content={ calendar } />
            <SmallContainer headIcon={faCalendarCheck} title={"Upcoming Events"} content={ upcomingEvents } />
          </div>
          <div className="row">
            <BigContainer headIcon={faPeopleGroup} title={"Roster"} content={ roster } />
            <SmallContainer headIcon={faMessage} title={"Message Team"} content= { messageTeam } />
          </div>
        </div>
    );
}

export default Dashboard;