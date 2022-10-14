import React from "react";
import Moment from 'react-moment';

import { faCalendar, faCalendarCheck, faPeopleGroup, faMessage } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import SmallContainer from "./SmallContainer";

const Dashboard = () => {
    const data = {
      events: {
        1: {
          id: 1,
          title: 'Tuesday Practice',
          type: 1,
          startTime: '2022-10-11T16:30:00',
          endTime: '2022-10-11T18:30:00',
          desc: '4:30 start'
        },
        2 : {
          id: 2,
          title: 'Wednesday Practice',
          type: 1,
          startTime: '2022-10-12T16:30:00',
          endTime: '2022-10-12T18:30:00',
          desc: '4:30 start'
        },
        3: {
          id: 3,
          title: 'Friday Practice',
          type: 1,
          startTime: '2022-10-14T16:30:00',
          endTime: '2022-10-14T18:30:00',
          desc: '4:30 start'
        },
        4: {
          id: 4,
          title: 'StFX at Acadia',
          type: 2,
          startTime: '2022-10-15T14:00:00',
          endTime: '2022-10-15T16:00:00',
          desc: '2pm KO'
        }
      },
      roster: {
        1: {
          id: 1,
          name: 'Ryan Murney',
          phone: '9024021227',
          roleID: 1,
          emcontactName: 'Gerry Murney',
          emContactRelation: 'Father',
          emContactPhone: '9022925560'
        },
        2 : {
          id: 1,
          name: 'Cairan Boone',
          phone: '9024506078',
          roleID: 1,
          emcontactName: 'Travis Best',
          emContactRelation: 'Uncle',
          emContactPhone: '6508475598'
        },
        3: {
          id: 1,
          name: 'James Alder',
          phone: '9024663456',
          roleID: 2,
          emcontactName: 'Anna Alder',
          emContactRelation: 'Partner',
          emContactPhone: '9027554312'
        }
      }
    };

    return (
        <div className="dashboard">
          <div className="row">
            <BigContainer headIcon={faCalendar} title={"Schedule"} data={ data.events } />
            <SmallContainer headIcon={faCalendarCheck} title={"Upcoming Events"} data={ data.events } />
          </div>
          <div className="row">
            <BigContainer headIcon={faPeopleGroup} title={"Roster"} data={ data.roster } />
            <SmallContainer headIcon={faMessage} title={"Message Team"} data= { {} } />
          </div>
        </div>
    );
}

export default Dashboard;