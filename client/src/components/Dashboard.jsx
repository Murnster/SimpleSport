import React from "react";
import { useState, useEffect } from "react";
import { get, post } from "../network"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import { faCalendar, faCalendarCheck, faPeopleGroup, faMessage } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import SmallContainer from "./SmallContainer";

const Dashboard = () => {
    const [dashboardData, getDashboardData] = useState({events: [], roster: []});

    const fetchDashboard = async () => {
      let data = {
        events: [],
        roster: []
      };

      const result = Promise.all([fetchEvents(), fetchRoster()]).then((arrays) => {
        data.events = arrays[0];
        data.roster = arrays[1];
      });
      
      getDashboardData(data);
    };

    const fetchEvents = async () => {
      return await get('events');
    };

    const fetchRoster = async () => {
      return await get('roster');
    };

    useEffect(() => {
      const dashboardEffect = async () => {
        await fetchDashboard();
      }
  
      dashboardEffect();
    }, []);

    const data = {
      // events: [
      //   {
      //     id: 1,
      //     title: 'Tuesday Practice',
      //     type: 1,
      //     startDate: '2022-10-25T16:30:00',
      //     endDate: '2022-10-25T18:30:00',
      //     desc: '4:30 start'
      //   },
      //   {
      //     id: 2,
      //     title: 'Wednesday Practice',
      //     type: 1,
      //     startDate: '2022-10-26T16:30:00',
      //     endDate: '2022-10-26T18:30:00',
      //     desc: '4:30 start'
      //   },
      //   {
      //     id: 3,
      //     title: 'Friday Practice',
      //     type: 1,
      //     startDate: '2022-10-28T16:30:00',
      //     endDate: '2022-10-28T18:30:00',
      //     desc: '4:30 start'
      //   },
      //   {
      //     id: 4,
      //     title: 'StFX at Acadia',
      //     type: 2,
      //     startDate: '2022-10-29T14:00:00',
      //     endDate: '2022-10-29T16:00:00',
      //     desc: '2pm KO'
      //   }
      // ],
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
          events={events}
          headerToolbar={{start: "title", center: '', end: 'prev,next'}}
          eventClick={() => {}}
        />
      </div>
    );

    const upcomingEvents = (
      <div className="quickEvent">
        <div className="quickEventHeader">Quickly create a new event for you team!</div>
        <div className="quickEventBody">
          <h4>Title</h4>
          <textarea className="quickEventInput"></textarea>
          <h4>Start Date/Time</h4>
          <textarea className="quickEventInput"></textarea>
          <h4>End Date/Time</h4>
          <textarea className="quickEventInput"></textarea>
          <h4>Type</h4>
          <textarea className="quickEventInput"></textarea>
          <h4>Description (255 character max)</h4>
          <textarea className="quickEventInput quickEventInputDesc"></textarea>
        </div>
        <div className="quickEventFooter">
          <button className="quickEventSubmit">Create Event</button>
        </div>
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
            <BigContainer headIcon={faCalendar} title={"Upcoming Events"} content={ calendar } />
            <SmallContainer headIcon={faCalendarCheck} title={"Quick Event"} content={ upcomingEvents } />
          </div>
          <div className="row">
            <BigContainer headIcon={faPeopleGroup} title={"Roster"} content={ roster } />
            <SmallContainer headIcon={faMessage} title={"Message Team"} content= { messageTeam } />
          </div>
        </div>
    );
}

export default Dashboard;