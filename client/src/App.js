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
  const [dashboardData, getDashboardData] = useState([{}]);
  
  const fetchDashboard = async () => {
    const data = await get('events');
    getDashboardData(data);
  };

  useEffect(() => {
    const dashboardEffect = async () => {
      await fetchDashboard();
    };

    dashboardEffect();
  }, []);
  
  console.log(dashboardData);
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