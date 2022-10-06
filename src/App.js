// hooks
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="sideNavBar">
        <div className="sideNavHeader">
          <FontAwesomeIcon icon={faBars}/>
          <h2>SimpleSport</h2>
        </div>
        <div className="sideNavBody"></div>
      </div>
    </div>
  )
}

export default App;