import React, { useState, useEffect } from "react";
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { get } from "../network";
import emailjs from '@emailjs/browser';
import FullContainer from "./FullContainer";
import Input from "./Input";
import Toast from "./Toast";
import '../css/App.css';
import '../css/Messenger.css';

// Messenger component
const Messenger = ({teamName}) => {
    // States
    const [messengerData, getMessengerData] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [toastObj, setToastObj] = useState({ good: true, toastText: '', isOpen: false });

    // Open Messenger Toast
    const openMessengerToast = (good, toastText) => {
        setToastObj({
            good,
            toastText,
            isOpen: true
        });

        setTimeout(() => {
            closeMessengerToast();
        }, 5000);
    };
    
    // Close Messenger Toast
    const closeMessengerToast = () => {
        setToastObj({
          good: toastObj.good,
          text: toastObj.toastText,
          isOpen: false
        });
    };

    // Network calls to get Messenger data
    const fetchMessengerData = async () => {
        let data = {
          recipients: [],
          memberTypes: [],
          recipientOptions: [],
          messageTypeOptions: []
        };
  
        Promise.all([fetchMessenger(), fetchMemberTypes()]).then((arrays) => {
          data.recipients = arrays[0];
          data.memberTypes = arrays[1];
            
          const staticOptions = [
            { value: -2, label: 'Send to all members' },
            { value: -1, label: 'Send to selected member types'}
          ];

          data.recipientOptions = staticOptions.concat(arrays[0].map((r) => {
            return { value: r.memberID, label: `${r.firstName} ${r.lastName}` };
          }));

          data.messageTypeOptions = arrays[1].map((mt) => {
            return { value: mt.typeID, label: mt.title };
          });
        }).then(() => {
            getMessengerData(data);
        });
    };

    // GET Messenger route
    const fetchMessenger = async () => {
        return await get('messenger');
    };

    // GET Memeber Types route
    const fetchMemberTypes = async () => {
        return await get('memberTypes');
    };

    // Set selected recipients state
    const handleRecipients = (e) => {
        setSelectedMembers(e.map((e) => { return e.value }));
    };

    // Set selected member types state
    const handleType = (e) => {
        setSelectedTypes(e.map((e) => { return e.value }));
    };

    // Messenger html
    const messenger = (
        <div>
            <div className="messengerHeader">
                <div className="row">
                    <Input 
                        id='recipientSelect'
                        type="reactSelect"
                        title="Members"
                        helper="Select those being emailed"
                        options={messengerData?.recipientOptions}
                        changeProp={handleRecipients}
                        multiple={true}
                        valueProp={messengerData?.recipientOptions?.find((type) => +type.value === selectedMembers)}
                    />
                    <Input 
                        id='memberTypeSelect'
                        type="reactSelect"
                        title="By Type"
                        helper="Select contact types you'd like to messenge or leave empty"
                        options={messengerData?.messageTypeOptions}
                        changeProp={handleType}
                        multiple={true}
                        valueProp={messengerData?.messageTypeOptions?.find((type) => +type.value === selectedTypes)}
                    />
                </div>
            </div>
            <div className="messengerBody">
                <div className="messengerEmailForm">
                    <input type="hidden" name="to_email" value="rmurney@gmail.com" />
                    <div className="row">
                        {/* <Input id="team_name" type="shorttext" title="Team Name" /> */}
                        <Input id="subject" type="shorttext" title="Subject" />
                        <Input id="to_name" type="shorttext" title="To Name" />
                    </div>
                    <div className="row">
                        <Input id="from_name" type="shorttext" title="From Name" />
                    </div>
                    <div className="row">
                        <Input id="message" type="longtext" title="Message" />
                    </div>
                </div>
            </div>
            <div className="messengerFooter">
                <div id="ccDiv">
                    <input id="ccEmergency" type="checkbox"></input>
                    <p>Do you want to CC Emergency Contacts?</p>
                </div>
                <div className="ssButton" onClick={() => sendMessage()}>Send Message</div>
            </div>
            {
                toastObj.isOpen === true
                ? <Toast good={toastObj.good} toastText={toastObj.toastText} closeToast={closeMessengerToast} />
                : null
            }
        </div>
    );
    
    // Send Message function
    const sendMessage = () => {
        let sendToEMCs = false;

        const recipientSelect = document.getElementById('recipientSelect');
        const subject = document.getElementById('subject');
        const to_name = document.getElementById('to_name');
        const from_name = document.getElementById('from_name');
        const message = document.getElementById('message');
        const ccEmergency = document.getElementById('ccEmergency');
        
        // If missing data from fields - stop function
        if (selectedMembers.length === 0) {
            recipientSelect.focus();
            return;
        } else if (to_name.value === "") {
            to_name.focus();
            return;
        } else if (from_name.value === "") {
            from_name.focus();
            return;
        } else if (message.value === "") {
            message.focus();
            return;
        } else if (subject.value === "") {
            subject.focus();
            return;
        }

        if (ccEmergency.checked === true) {
            sendToEMCs = true;
        }

        let emailPayloadArray = [];

        if (selectedMembers.indexOf(-2) !== -1) { // If everyone option is selected - send to everyone
            messengerData.recipients.forEach(i => {
                emailPayloadArray.push({
                    subject: subject.value,
                    to_name: to_name.value,
                    from_name: from_name.value,
                    team_name: teamName,
                    message: message.value,
                    to_email: i.email,
                    to_cc: sendToEMCs ? i.emEmail : ''
                });
            });
        } else if (selectedMembers.indexOf(-1) !== -1) { // If send to types is selected
            messengerData.recipients.forEach(rep => {
                let alreadyIncluded = false;

                // Loop all selected members
                selectedMembers.forEach(id => {
                    if (rep.memberID === id) {
                        alreadyIncluded = true;

                        emailPayloadArray.push({
                            subject: subject.value,
                            to_name: to_name.value,
                            from_name: from_name.value,
                            team_name: teamName,
                            message: message.value,
                            to_email: rep.email,
                            to_cc: sendToEMCs ? rep.emEmail : ''
                        });
                    }
                });

                // Loop all members that have selected type id
                selectedTypes.forEach(typeID => {
                    if (rep.memberTypeID === typeID && !alreadyIncluded) {
                        emailPayloadArray.push({
                            subject: subject.value,
                            to_name: to_name.value,
                            from_name: from_name.value,
                            team_name: teamName,
                            message: message.value,
                            to_email: rep.email,
                            to_cc: sendToEMCs ? rep.emEmail : ''
                        });
                    }
                });
            });
        } else { // Not everyone and not by type - send to selected members
            selectedMembers.forEach((id) => {
                const recipient = messengerData.recipients.find(r => r.memberID === id);

                if (recipient) {
                    emailPayloadArray.push({
                        subject: subject.value,
                        to_name: to_name.value,
                        from_name: from_name.value,
                        team_name: teamName,
                        message: message.value,
                        to_email: recipient.email,
                        to_cc: sendToEMCs ? recipient.emEmail : ''
                    });
                }
            });
        }

        if (emailPayloadArray.length === 0) {
            window.alert('There are no members in your selected recipient values');
        } else {
            // Loop all selecteed and use EmailJS to send payload
            emailPayloadArray.forEach(p => {
                emailjs.send('service_j3cty7o', 'template_fgud8hp', p, 'dK3Lze1u3Hmegsnoo')
                .then((result) => {
                    openMessengerToast(true, 'Your message was successfully sent!')
                    console.log(result.text);
                }, (error) => {
                    openMessengerToast(false, 'Your message was not sent, please refresh and try again')
                    console.log(error.text);
                });
            });
        }

    };

    // Hook
    useEffect(() => {
        const messengerEffect = async () => {
          await fetchMessengerData();
        }
        
        messengerEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Messenger html return
    return (
        <div className="messenger">
            <FullContainer headIcon={ faMessage } title={'Messenger'} content={ messenger }/>
        </div>
    );
}

export default Messenger;