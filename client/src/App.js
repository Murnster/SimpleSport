import { useState } from "react";

import './css/App.css';
import './css/Schedule.css';

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule";
import Roster from "./components/Roster";
import Messenger from "./components/Messenger";
import System from "./components/System";

const App = () => {
  const [screen, setScreen] = useState('Dashboard');
  
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