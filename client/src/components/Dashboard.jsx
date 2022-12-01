import { useState, useEffect } from "react";
import { get, post } from "../network"
import { faCalendar, faCalendarCheck, faPeopleGroup, faMessage } from '@fortawesome/free-solid-svg-icons'
import BigContainer from "./BigContainer";
import emailjs from '@emailjs/browser';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import Input from "./Input";
import moment from "moment";
import React from "react";
import SmallContainer from "./SmallContainer";
import Toast from "./Toast";

// Dashboard componnent
const Dashboard = ({setScreen, teamName}) => {
    // States
    const [dashboardData, getDashboardData] = useState({events: [], roster: [], eventTypes: [], memberTypes: []});
    const [quickEventType, setQuickEventType] = useState(0);
    const [toastObj, setToastObj] = useState({ good: true, toastText: '', isOpen: false });

    // Color key for events
    const colorKey = {
      1: '#4f91cd',
      2: '#f53131',
      3: '#f0ff16',
      4: '#ff1d58',
      5: '#edf756',
      6: '#a0d2eb',
      7: '#fff685',
      8: '#f43a09',
      9: '#657a00',
      10: '#1400c6',
      11: '#ff0028',
      12: '#007f4f',
      13: '#ff414e',
      14: '#fea49f',
      15: '#ffffff'
    };

    // Open Toast function
    const openDashToast = (good, toastText) => {
      setToastObj({
        good,
        toastText,
        isOpen: true
      });

      setTimeout(() => {
        closeDashToast();
      }, 5000);
    };

    // Close Toast function
    const closeDashToast = () => {
      setToastObj({
        good: toastObj.good,
        text: toastObj.toastText,
        isOpen: false
      });
    };

    // Quick Event Type State handler
    const handleQEType = e => {
      setQuickEventType(e.value);
    };

    // Network calls to get Dashboard data
    const fetchDashboard = async () => {
      let data = {
        events: [],
        roster: [],
        eventTypes: [],
        memberTypes: []
      };
      
      Promise.all([fetchEvents(), fetchRoster(), fetchEventTypes(), fetchMemberTypes()]).then((arrays) => {
        data.events = arrays[0];
        data.roster = arrays[1];
        data.eventTypes = arrays[2];
        data.memberTypes = arrays[3];
      }).then(() => {
        getDashboardData(data);
      });
    };

    // Events network call
    const fetchEvents = async () => {
      return await get('events');
    };

    // Roster network call
    const fetchRoster = async () => {
      return await get('roster');
    };

    // Event types network call
    const fetchEventTypes = async () => {
      return await get('eventTypes');
    };

    // Member types network call
    const fetchMemberTypes = async () => {
      return await get('memberTypes');
    };

    // POST Event
    const postEvent = async (event) => {
      const res = await post('postEvent', event);
  
      return res;
    };

    // Cancel and reset Quick Event details
    const cancelQuickEvent = () => {
      document.getElementById('newEventTitle').value='';
      document.getElementById('newEventType').value = 0;
      document.getElementById('newEventStart').value = moment().format('YYYY-MM-DDThh:mm:ss');
      document.getElementById('newEventEnd').value = moment().add(1, 'h').format('YYYY-MM-DDThh:mm:ss');
      document.getElementById('newEventDesc').value='';
    };

    // Save Quick Event
    const quickSaveEvent = async () => {
      const id = document.getElementById('newEventID');
      const title = document.getElementById('newEventTitle');
      const type = document.getElementById('newEventType');
      const start = document.getElementById('newEventStart');
      const end = document.getElementById('newEventEnd');
      const desc = document.getElementById('newEventDesc');
      const location = document.getElementById('newEventLocation');

      if (title.value === "" || title.value.length > 255) {
        title.focus();
        return;
      } else if (quickEventType < 0 || !quickEventType) {
        type.focus();
        return;
      } else if (start.value === "" || !start.value) {
        start.focus();
        return;
      } else if (end.value === "" || !end.value) {
        end.focus();
        return;
      } else if (desc.value === "" || desc.value.length > 255) {
        desc.focus();
        return;
      } else if (location.value === "" || location.value.length > 255) {
        location.focus();
        return;
      }
      
      const payload = {
        id: id.value,
        title: title.value,
        typeID: quickEventType,
        startDate: start.value,
        endDate: end.value,
        desc: desc.value,
        location: location.value
      };
      
      const result = await postEvent(payload);

      if (result.success) {
        openDashToast(true, 'Your new event was successfully saved!');

        id.value = '';
        title.value = '';
        start.value = '';
        end.value = '';
        desc.value = '';
        location.value = '';

        await fetchEvents().then((eventsPayload) => getDashboardData({
          events: eventsPayload,
          roster: dashboardData.roster,
          eventTypes: dashboardData.eventTypes,
          memberTypes: dashboardData.memberTypes
        }));
      } else {
        openDashToast(false, 'There was a failure trying to save this event');
        console.error('There was a failure trying to save this event');
      }
    };

    // Dashboard message function
    const dashboardMessage = async () => {
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      const from = document.getElementById('from');
      
      if (subject.value === "") {
        subject.focus();
        return;
      } else if (from.value === "") {
        from.focus();
        return;
      }else if (message.value === "") {
        message.focus();
        return;
      }

      dashboardData.roster.forEach(i => {
        const emailPayload = {
          subject: subject.value,
          to_name: `${i.firstName} ${i.lastName}`,
          from_name: from.value,
          team_name: teamName !== '' && teamName ? teamName : 'SimpleSport Team',
          message: message.value,
          to_email: i.email,
          to_cc: ''
        };

        emailjs.send('service_j3cty7o', 'template_fgud8hp', emailPayload, 'dK3Lze1u3Hmegsnoo')
        .then((result) => {
            openDashToast(true, 'Your message was succesfully sent to your team!');
            console.log(result.text);
        }, (error) => {
            openDashToast(false, 'Your message failed to send to your team');
            console.log(error.text);
        });
      });
    };

    // Hook
    useEffect(() => {
      const dashboardEffect = async () => {
        await fetchDashboard();
      };
  
      dashboardEffect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // Mapping events for FullCalendar
    const events = dashboardData.events.map(ev => {
      return { title: ev.title, start: ev.startDate, end: ev.endDate, className: 'cursorPointer', backgroundColor: colorKey[ev.typeID], textColor: 'black' };
    });
    
    // Calendar component
    const calendar = (
      <div className="dashCalContainer">
        <FullCalendar
          plugins={
            [ dayGridPlugin, listPlugin ]
          }
          initialView="listWeek"
          height={475}
          firstDay={1}
          eventDisplay="block"
          events={events}
          headerToolbar={{start: "title", center: '', end: 'prev,next'}}
          eventClick={() => {setScreen('Schedule')}}
        />
      </div>
    );
    
    // Quick Event component
    const upcomingEvents = (
      <div className="quickEvent">
        <div className="quickEventHeader"></div>
        <input id="newEventID" type={'hidden'} value="-1"></input>
        <div className="quickEventBody">
          <Input id="newEventTitle" type="shorttext" title="Event Title" helper="Name of your event" />
          <Input 
            type="reactSelect"
            title="Event Type"
            helper="Select Type of your event"
            options={dashboardData.eventTypes.map((et) => {
              return { value: et.typeID, label: et.title };
            })}
            changeProp={handleQEType}
            multiple={false}
          />
          <Input id="newEventStart" type="date" title="Event Start Time" helper="When does this event start" />
          <Input id="newEventEnd" type="date" title="Event End Time" helper="When does this event end" />
          <Input id="newEventLocation" type="shorttext" title="Event Location" helper="Where is your event" />
          <Input id="newEventDesc" type="longtext" title="Event Description" helper="Describe your event" />
        </div>
        <div className="quickEventFooter">
          <div onClick={async () => await quickSaveEvent()} className="quickEventSubmit ssButton">Create Event</div>
          <div onClick={() => cancelQuickEvent()} className="quickEventCancel ssButton">Cancel</div>
        </div>
      </div>
    );
    
    // Dashboard roster header component
    const dashRosterHead = (
      <div key={'dashRosterHead'} className="dashRosterRow dashRosterHead">
        <div>Name</div>
        <div>Role</div>
        <div>Phone</div>
        <div>Email</div>
      </div>
    );
    
    // Dashboard roster rows component
    const dashRoster = dashboardData.roster.map((member) =>
      <div key={'member-' + member.memberID.toString()} onClick={() => setScreen('Roster')} className="dashRosterRow cursorPointer">
        <div>{member.firstName} {member.lastName}</div>
        <div>{dashboardData.memberTypes.find(t => t.typeID === member.memberTypeID)?.title}</div>
        <div>{member.phone}</div>
        <div>{member.email}</div>
      </div>
    );
    
    // Dashboarder Roster component
    const dashRosterTable = (
      <div key={'dashRosterTable'} className="dashRosterTable">
        {dashRosterHead}
        {dashRoster}
      </div>
    );
    
    // Dashboard message team component
    const messageTeam = (
      <div className="msgTeamBox">
        <Input id="subject" type="shorttext" title="Subject" />
        <Input id="from" type="shorttext" title="From" />
        <Input id="message" type="longtext" title="Message" />
        <div className="msgTeamFooter">
          <div onClick={() => dashboardMessage()} className="msgTeamSend ssButton">Send Message</div>
        </div>
      </div>
    );
    
    // Dashboard html
    return (
        <div className="dashboard">
          <div className="row">
            <BigContainer headIcon={faCalendar} title={"Upcoming Events"} content={ calendar } />
            <SmallContainer headIcon={faCalendarCheck} title={"Quick Event"} content={ upcomingEvents } />
          </div>
          <div className="row">
            <BigContainer headIcon={faPeopleGroup} title={"Roster"} content={ dashRosterTable } />
            <SmallContainer headIcon={faMessage} title={"Message Team"} content= { messageTeam } />
          </div>
          {
            toastObj.isOpen === true
            ? <Toast good={toastObj.good} toastText={toastObj.toastText} closeToast={closeDashToast} />
            : null
          }
        </div>
    );
}

export default Dashboard;