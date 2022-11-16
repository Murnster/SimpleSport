import { useEffect, useState } from "react";

import './css/App.css';
import './css/Schedule.css';

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule";
import Roster from "./components/Roster";
import Messenger from "./components/Messenger";
import System from "./components/System";
import { get } from "./network";

const App = () => {
  const [siteData, setSiteData] = useState({});
  const [screen, setScreen] = useState('');

  const fetchSite = async () => {

    Promise.all([get('siteData')]).then((arrays) => {
      setSiteData(arrays[0][0]);
      setScreen(arrays[0][0].homeScreen);
    });
  };

  useEffect(() => {
    const getSiteData = async () => {
      await fetchSite();
    };

    getSiteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Navbar setScreen={setScreen} />
      <div className="mainContainer">
          { screen === 'Dashboard' && <Dashboard /> }
          { screen === 'Schedule' && <Schedule /> }
          { screen === 'Roster' && <Roster /> }
          { screen === 'Messenger' && <Messenger /> }
          { screen === 'System' && <System /> }
      </div>
    </div>
  )
}

export default App;