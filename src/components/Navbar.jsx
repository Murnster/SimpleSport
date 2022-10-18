import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ setScreen }) => {
  // const []

  return (
      <div className="sideNavBar">
      <div className="sideNavHeader">
        <FontAwesomeIcon icon={faBars}/>
        <h2 onClick={() => setScreen('Dashboard')}>SimpleSport</h2>
      </div>
      <div className="sideNavBody">
          <div onClick={() => setScreen('Schedule')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>Schedule</h3></div>
          <div onClick={() => setScreen('Roster')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>Roster</h3></div>
          <div onClick={() => setScreen('Messenger')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>Messenger</h3></div>
          <div onClick={() => setScreen('System')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>System Settings</h3></div>
      </div>
    </div>
  );
}

export default Navbar;