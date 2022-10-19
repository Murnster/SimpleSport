// hooks
import { useEffect, useState } from "react";
import { get } from "./network";

import './css/App.css';
import './css/Schedule.css';

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule";
import Roster from "./components/Roster";
import Messenger from "./components/Messenger";
import System from "./components/System";

const App = () => {
  const [mainData, getMainData] = useState([{}]);

  useEffect(() => {
    async function siteData() {
      const response = await get('events');
    };

    siteData();
  }, [mainData]);
  
  console.log(mainData, 'maindata');

  const [screen, setScreen] = useState('Dashboard');

  const changeScreen = event => {
    setScreen(screen => event)
  };
  
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