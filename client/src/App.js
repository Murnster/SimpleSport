import { useEffect, useState } from "react";
import { get } from "./network";

import './css/App.css';
import './css/Schedule.css';

import Dashboard from "./components/Dashboard";
import SideNavbar from "./components/SideNavbar";
import Schedule from "./components/Schedule";
import TopNavbar from "./components/TopNavbar";
import Roster from "./components/Roster";
import Messenger from "./components/Messenger";
import System from "./components/System";

const App = () => {
  const [siteData, setSiteData] = useState({});
  const [screen, setScreen] = useState('');
  const [openNav, setOpenNav] = useState(true);

  const fetchSite = async () => {
    Promise.all([get('siteData')]).then((arrays) => {
      setSiteData(arrays[0][0]);
      setScreen(siteData?.homeScreen ?? arrays[0][0].homeScreen);
    });
  };

  useEffect(() => {
    const getSiteData = async () => {
      await fetchSite();
    };
    
    getSiteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTopNav = () => {
    setOpenNav(openNav => !openNav);
  };

  return (
    <div className="app">
      <TopNavbar siteName={siteData.teamName} setOpenNav={setTopNav} />
      <SideNavbar setScreen={setScreen} screen={screen} openNav={!openNav}/>
      <div className={!openNav ? "mainContainer" : "mainContainer mainContainerHidden"}>
          { screen === 'Dashboard' && <Dashboard /> }
          { screen === 'Schedule' && <Schedule /> }
          { screen === 'Roster' && <Roster /> }
          { screen === 'Messenger' && <Messenger /> }
          { screen === 'System' && <System updateSiteData={setSiteData} /> }
      </div>
    </div>
  )
}

export default App;