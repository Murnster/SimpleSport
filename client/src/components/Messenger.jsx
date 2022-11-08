import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

import '../css/App.css';
import '../css/Messenger.css';

import { faMessage } from '@fortawesome/free-solid-svg-icons'

import { get } from "../network";
import FullContainer from "./FullContainer";
import Input from "./Input";

const Messenger = () => {
    const [messengerData, getMessengerData] = useState([]);

    const fetchMessenger = async () => {
        const data = await get('messenger');
        getMessengerData(data);
        console.log(data);
    };

    const form = useRef();

    const sendMessage = () => {
        console.log(form.current);
        const testTemplate = {
            subject: 'Test Sub',
            to_name: 'Murney',
            from_name: 'The god',
            team_name: 'Team of cool stuff',
            to_email: 'rmurney@gmail.com'
        };

        emailjs.send('service_j3cty7o', 'template_fgud8hp', testTemplate, 'dK3Lze1u3Hmegsnoo')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    // subject
    // to_name
    // from_name
    // team_name
    // to_email

    const messenger = (
        <div>
            <div className="messengerHeader">
                <div className="row">
                    <Input id="recipientSelect" type="messengerSelect" title="Recipients" helper="Select those being emailed" options={messengerData} />
                </div>
            </div>
            <div className="messengerBody">
                <div className="messengerEmailForm">
                    <form ref={form}>
                        <input type="hidden" name="to_email" value="rmurney@gmail.com" />
                        <div className="row">
                            <Input id="team_name" type="shorttext" title="Team Name" helper="" />
                            <Input id="subject" type="shorttext" title="Subject" helper="" />
                        </div>
                        <div className="row">
                            <Input id="to_name" type="shorttext" title="To Name" helper="" />
                            <Input id="from_name" type="shorttext" title="From Name" helper="" />
                        </div>
                        <div className="row">
                            <Input id="message" type="longtext" title="Message" helper="" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="messengerFooter">
                <button onClick={() => sendMessage()}>Send Message</button>
            </div>
        </div>
    )

    useEffect(() => {
        const messengerEffect = async () => {
          await fetchMessenger();
        }
    
        messengerEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="messenger">
            <FullContainer headIcon={ faMessage } title={'Messenger'} content={ messenger }/>
        </div>
    );
}

export default Messenger;