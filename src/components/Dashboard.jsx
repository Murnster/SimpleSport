import React from "react";

import { faBars, faCalendar, faCalendarCheck, faPeopleGroup, faMessage } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import SmallContainer from "./SmallContainer";

const Dashboard = () => {
    return (
        <div className="dashboard">
          <div className="row">
            <BigContainer headIcon={faCalendar} title={"Schedule"} />
            <SmallContainer headIcon={faCalendarCheck} title={"Upcoming Events"} />
          </div>
          <div className="row">
            <BigContainer headIcon={faPeopleGroup} title={"Roster"} />
            <SmallContainer headIcon={faMessage} title={"Message Team"} />
          </div>
        </div>
    );
}

export default Dashboard;