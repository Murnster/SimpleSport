// import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faTableColumns, faCog, faCalendar, faPeopleGroup, faMessage  } from '@fortawesome/free-solid-svg-icons';
import logo from '../photos/icon.png';
import '../css/App.css';

const SideNavbar = ({ setScreen, openNav }) => {
  console.log(openNav);
  return (
    <div className={openNav ? "sideNavBar" : "sideNavBar sideNavBarHidden"}>
      <div className="sideNavHeader">
        <FontAwesomeIcon icon={faClipboardCheck} onClick={() => {}} />
        <div className='sideNavCompanyName'>SimpleSport</div>
      </div>
      <div className="sideNavBody">
          <div onClick={() => setScreen('Dashboard')} className="sideNavItem">
            <div>
              <FontAwesomeIcon icon={faTableColumns}/>
            </div>
            <h2>Dashboard</h2>
          </div>
          <div onClick={() => setScreen('Schedule')} className="sideNavItem">
            <div>
              <FontAwesomeIcon icon={faCalendar}/>
            </div>
            <h2>Schedule</h2>
          </div>
          <div onClick={() => setScreen('Roster')} className="sideNavItem">
            <div>
              <FontAwesomeIcon icon={faPeopleGroup}/>
            </div>
            <h2>Roster</h2>
          </div>
          <div onClick={() => setScreen('Messenger')} className="sideNavItem">
            <div>
              <FontAwesomeIcon icon={faMessage}/>
            </div>
            <h2>Messenger</h2>
          </div>
          <div onClick={() => setScreen('System')} className="sideNavItem">
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