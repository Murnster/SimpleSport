import { get } from "./network";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Messenger from "./components/Messenger";
import Roster from "./components/Roster";
import Schedule from "./components/Schedule";
import SideNavbar from "./components/SideNavbar";
import System from "./components/System";
import TopNavbar from "./components/TopNavbar";
import './css/App.css';
import './css/Schedule.css';

// Main App Component
const App = () => {
  // States
  const [siteData, setSiteData] = useState({});
  const [screen, setScreen] = useState('');
  const [openNav, setOpenNav] = useState(true);

  // Network calls to get site data
  const fetchSite = async () => {
    Promise.all([get('siteData')]).then((arrays) => {
      setSiteData(arrays[0][0]);
      setScreen(siteData?.homeScreen ?? arrays[0][0].homeScreen);
    });
  };

  // Hook 
  useEffect(() => {
    const getSiteData = async () => {
      await fetchSite();
    };
    
    getSiteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navbar open and close
  const setTopNav = () => {
    setOpenNav(openNav => !openNav);
  };

  // App html
  return (
    <div className="app">
      <TopNavbar siteName={siteData.teamName} setOpenNav={setTopNav} />
      <SideNavbar setScreen={setScreen} screen={screen} openNav={!openNav}/>
      <div className={!openNav ? "mainContainer" : "mainContainer mainContainerHidden"}>
          { screen === 'Dashboard' && <Dashboard setScreen={setScreen} teamName={siteData.teamName} /> }
          { screen === 'Schedule' && <Schedule /> }
          { screen === 'Roster' && <Roster /> }
          { screen === 'Messenger' && <Messenger teamName={siteData.teamName} /> }
          { screen === 'System' && <System updateSiteData={setSiteData} /> }
      </div>
    </div>
  )
}

export default App;