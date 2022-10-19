import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ setScreen }) => {
  const [navState, setNavState] = useState(Boolean);

  useEffect(() => {
    setNavState(true);
  }, []);

  const navBarOpenClose = () => {
    setNavState(!navState);
    
    if (navState) {
      console.log(navState, 'was true');  

      
    } else {
      console.log(navState, 'was false');

    }
  };

  return (
      <div className={ navState ? "sideNavBar" : "sideNavBar sideBarHidden"}>
      <div className="sideNavHeader">
        <FontAwesomeIcon icon={faBars} onClick={() => navBarOpenClose()} />
        <h2 onClick={() => setScreen('Dashboard')}>SimpleSport</h2>
      </div>
      <div className={ navState ? "sideNavBody" : "hidden"}>
          <div onClick={() => setScreen('Schedule')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>Schedule</h3></div>
          <div onClick={() => setScreen('Roster')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>Roster</h3></div>
          <div onClick={() => setScreen('Messenger')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>Messenger</h3></div>
          <div onClick={() => setScreen('System')} className="sideNavItem"><FontAwesomeIcon icon={faChevronRight}/><h3>System Settings</h3></div>
      </div>
    </div>
  );
}

export default Navbar;