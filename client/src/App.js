import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Messenger from "./components/Messenger";
import moment from "moment";
import Roster from "./components/Roster";
import Schedule from "./components/Schedule";
import SideNavbar from "./components/SideNavbar";
import System from "./components/System";
import TopNavbar from "./components/TopNavbar";
import './css/App.css';
import './css/Schedule.css';
import Popup from "./components/Popup";

// Main App Component
const App = () => {
  // States
  const [siteData, setSiteData] = useState({});
  const [screen, setScreen] = useState('');
  const [openNav, setOpenNav] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [roster, setRoster] = useState([]);
  const [memberTypes, setMemberTypes] = useState([]);
  const [isMobile, setMobile] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  
  // Hook
  useEffect(() => {
    setSiteData({
      teamName: "Acadia Sports Team",
      homeScreen: "Dashboard"
    });
    
    setEvents([
      {
        id: 1,
        title: "Practice",
        startDate: moment().set({hour: 16, minute: 30, second: 0}).format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().set({hour: 18, minute: 30, second: 0}).format('YYYY-MM-DD HH:mm:ss'),
        desc: "Team practice. Remember to bring your cleats and a ton of water!",
        typeID: 1,
        location: "Acadia"
      },
      {
        id: 2,
        title: "Practice",
        startDate: moment().set({hour: 16, minute: 30, second: 0}).add(2, 'd').format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().set({hour: 18, minute: 30, second: 0}).add(2, 'd').format('YYYY-MM-DD HH:mm:ss'),
        desc: "Team practice. Remember to bring your cleats and a ton of water!",
        typeID: 1,
        location: "Acadia"
      },
      {
        id: 3,
        title: "Practice",
        startDate: moment().set({hour: 16, minute: 30, second: 0}).add(3, 'd').format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().set({hour: 18, minute: 30, second: 0}).add(3, 'd').format('YYYY-MM-DD HH:mm:ss'),
        desc: "Team practice. Remember to bring your cleats and a ton of water!",
        typeID: 1,
        location: "Acadia"
      },
      {
        id: 4,
        title: "Film Session",
        startDate: moment().set({hour: 19, minute: 30, second: 0}).add(4, 'd').format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().set({hour: 20, minute: 30, second: 0}).add(4, 'd').format('YYYY-MM-DD HH:mm:ss'),
        desc: "Room 401, be prepared to study",
        typeID: 5,
        location: "Athletics Complex"
      },
      {
        id: 5,
        title: "Acadia vs St. FX, 2pm",
        startDate: moment().set({hour: 14, minute: 0, second: 0}).add(5, 'd').format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().set({hour: 16, minute: 0, second: 0}).add(5, 'd').format('YYYY-MM-DD HH:mm:ss'),
        desc: "Warmup begins at 1pm, come early and be ready to play",
        typeID: 2,
        location: "Raymond Field"
      },
      {
        id: 6,
        title: "Team Lunch!",
        startDate: moment().set({hour: 13, minute: 0, second: 0}).add(6, 'd').format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().set({hour: 15, minute: 0, second: 0}).add(6, 'd').format('YYYY-MM-DD HH:mm:ss'),
        desc: "Team Lunch at 1pm!",
        typeID: 3,
        location: "Joes"
      }
    ]);
    
    setEventTypes([
      {
        typeID: 1,
        title: "Practice"
      },
      {
        typeID: 2,
        title: "Game"
      },
      {
        typeID: 3,
        title: "Team Event"
      },
      {
        typeID: 4,
        title: "Playoff Event"
      },
      {
        typeID: 5,
        title: "Film Review"
      }
    ]);
    
    setRoster([
      {
        memberID: 1,
        firstName: "Ryan",
        lastName: "Murney",
        memberTypeID: 1,
        phone: "9024021227",
        email: "151802m@acadiau.ca",
        emContactName: "Gerry Murney",
        emPhone: "9028600263",
        emEmail: "rmurney@gmail.com"
      },
      {
        memberID: 2,
        firstName: "Alec",
        lastName: "Mangold",
        memberTypeID: 2,
        phone: "90256313123",
        email: "test@test.ca",
        emContactName: "L. Alder",
        emPhone: "9025345643",
        emEmail: "test@test.ca"
      },
      {
        memberID: 6,
        firstName: "Patrick",
        lastName: "Day",
        memberTypeID: 7,
        phone: "9026783845",
        email: "test@test.ca",
        emContactName: "Test Emergency Contact",
        emPhone: "9024569832",
        emEmail: "test@test.ca"
      },
      {
        memberID: 8,
        firstName: "Will",
        lastName: "Lake",
        memberTypeID: 1,
        phone: "9024321234",
        email: "test@test.ca",
        emContactName: "J. Lake",
        emPhone: "9025351239",
        emEmail: "test@test.ca"
      },
      {
        memberID: 9,
        firstName: "Jacob",
        lastName: "Rogers",
        memberTypeID: 1,
        phone: "9023235657",
        email: "test@test.ca",
        emContactName: "T. Rogers",
        emPhone: "9025351239",
        emEmail: "test@test.ca"
      },
      {
        memberID: 11,
        firstName: "Cairan",
        lastName: "Hawthorne",
        memberTypeID: 5,
        phone: "9025879012",
        email: "test@test.ca",
        emContactName: "N. Hawthorne",
        emPhone: "9027890243",
        emEmail: "test@test.ca"
      },
      {
        memberID: 12,
        firstName: "Will",
        lastName: "Hines",
        memberTypeID: 1,
        phone: "9025879012",
        email: "test@test.ca",
        emContactName: "F. Hines",
        emPhone: "9027890243",
        emEmail: "test@test.ca"
      },
      {
        memberID: 13,
        firstName: "Sean",
        lastName: "Freeman",
        memberTypeID: 1,
        phone: "9029607894",
        email: "test@test.ca",
        emContactName: "D. Freeman",
        emPhone: "9025320954",
        emEmail: "test@test.ca"
      },
      {
        memberID: 14,
        firstName: "Steve",
        lastName: "Price",
        memberTypeID: 1,
        phone: "9026587095",
        email: "test@test.ca",
        emContactName: "G. Price",
        emPhone: "9025234523",
        emEmail: "test@test.ca"
      },
      {
        memberID: 15,
        firstName: "Patrick",
        lastName: "Day",
        memberTypeID: 7,
        phone: "9026783845",
        email: "test@test.ca",
        emContactName: "Test Emergency Contact",
        emPhone: "9024569832",
        emEmail: "test@test.ca"
      }
    ]);
    
    setMemberTypes([
      {
        typeID: 1,
        title: "Player"
      },
      {
        typeID: 2,
        title: "Coach"
      },
      {
        typeID: 3,
        title: "Trainer"
      },
      {
        typeID: 4,
        title: "Other"
      },
      {
        typeID: 5,
        title: "Assistant"
      },
      {
        typeID: 6,
        title: "Manager"
      },
      {
        typeID: 7,
        title: "Executive"
      }
    ]);
    
    setScreen('Dashboard');
    
    if (window.innerWidth <= 600) {
      setMobile(true);
      setOpenPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navbar open and close
  const setTopNav = () => {
    setOpenNav(openNav => !openNav);
  };
  
  const appPopup = (
     <div className="appPopup">
       <div className="appPopupWarning">
         Thanks for checking out my project! This is a quick warning that this application was created primarily for browser view. I have added a mobile format but it does lack some functionality. Please open SimpleSport in your browser for the best user experience!
       </div>
     </div>
  );
  // App html
  return (
    <div className="app">
      <TopNavbar siteName={siteData.teamName} setOpenNav={setTopNav} />
      <SideNavbar setScreen={setScreen} screen={screen} openNav={!openNav}/>
      <div className={!openNav ? "mainContainer" : "mainContainer mainContainerHidden"}>
          { screen === 'Dashboard' && <Dashboard setScreen={setScreen} teamName={siteData.teamName} events={events} setEvents={setEvents} eventTypes={eventTypes} roster={roster} memberTypes={memberTypes} /> }
          { screen === 'Schedule' && <Schedule events={events} setEvents={setEvents} eventTypes={eventTypes} isMobile={isMobile} /> }
          { screen === 'Roster' && <Roster roster={roster} setRoster={setRoster} memberTypes={memberTypes} /> }
          { screen === 'Messenger' && <Messenger teamName={siteData.teamName} roster={roster} memberTypes={memberTypes} /> }
          { screen === 'System' && <System siteData={siteData} updateSiteData={setSiteData} eventTypes={eventTypes} setEventTypes={setEventTypes} memberTypes={memberTypes} setMemberTypes={setMemberTypes} /> }
          {  
                openPopup ?
                <Popup title="Welcome to SimpleSport!" content={appPopup} closePopup={() => setOpenPopup(false)} /> :
                null
          }
      </div>
    </div>
  )
}

export default App;