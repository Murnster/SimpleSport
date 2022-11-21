// import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faTableColumns, faCog, faCalendar, faPeopleGroup, faMessage  } from '@fortawesome/free-solid-svg-icons';
import '../css/App.css';

const SideNavbar = ({ setScreen, screen, openNav }) => {
  return (
    <div className={openNav ? "sideNavBar" : "sideNavBar sideNavBarHidden"}>
      <div className="sideNavHeader">
        <FontAwesomeIcon icon={faClipboardCheck} onClick={() => {}} />
        <div className='sideNavCompanyName'>SimpleSport</div>
      </div>
      <div className="sideNavBody">
          <div onClick={() => setScreen('Dashboard')} className={screen === "Dashboard" ? "sideNavItem sideNavItemSelected" : "sideNavItem"}>
            <div>
              <FontAwesomeIcon icon={faTableColumns}/>
            </div>
            <h2>Dashboard</h2>
          </div>
          <div onClick={() => setScreen('Schedule')} className={screen === "Schedule" ? "sideNavItem sideNavItemSelected" : "sideNavItem"}>
            <div>
              <FontAwesomeIcon icon={faCalendar}/>
            </div>
            <h2>Schedule</h2>
          </div>
          <div onClick={() => setScreen('Roster')} className={screen === "Roster" ? "sideNavItem sideNavItemSelected" : "sideNavItem"}>
            <div>
              <FontAwesomeIcon icon={faPeopleGroup}/>
            </div>
            <h2>Roster</h2>
          </div>
          <div onClick={() => setScreen('Messenger')} className={screen === "Messenger" ? "sideNavItem sideNavItemSelected" : "sideNavItem"}>
            <div>
              <FontAwesomeIcon icon={faMessage}/>
            </div>
            <h2>Messenger</h2>
          </div>
          <div onClick={() => setScreen('System')} className={screen === "System" ? "sideNavItem sideNavItemSelected" : "sideNavItem"}>
            <div>
              <FontAwesomeIcon icon={faCog}/>
            </div>
            <h2>Settings</h2>
          </div>
      </div>
    </div>
  );
}

export default SideNavbar;