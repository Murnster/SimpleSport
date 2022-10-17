// hooks
import { useEffect, useState } from "react";

import './css/App.css';
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="mainContainer">
          <Dashboard />
      </div>
    </div>
  )
}

export default App;