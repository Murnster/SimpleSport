import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns  } from '@fortawesome/free-solid-svg-icons';
import '../css/App.css';

// Top Nav Bar component
const TopNavbar = ({siteName, setOpenNav}) => {
  // State
  const [topOpenNav, setTopNav] = useState(false);
  
  // Open close function
  const openTopNav = () => {
    if (topOpenNav) {
      setTopNav(false);
      setOpenNav();
    } else {
      setTopNav(true);
      setOpenNav();
    }
  };

  // Top Nav Bar html
  return (
    <div className={topOpenNav ? "topNavBar" : "topNavBar topNavOpen"}>
      <div className="topNavHeader">
        <FontAwesomeIcon icon={faColumns} onClick={openTopNav} />
        <div className='topNavDivider'></div>
        <div className='topNavSiteName'>
            {siteName}
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;