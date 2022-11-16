const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const db = require('./database');
const app = express();

app.use(cors());
app.use(express.json());

app.use(bp.urlencoded({ 
    extended: true 
}));

app.use(bp.json());

app.get("/events", (req, res) => {
    db.query(`SELECT * FROM events`, (err, result) => {
        if (err) { 
            console.log(err); 
        } else {
            res.json(result);
        }
    });
});

app.get("/roster", (req, res) => {
    db.query(`SELECT * FROM roster`, (err, result) => {
        if (err) { 
            console.log(err); 
        } else {
            res.json(result);
        }
    });
});

app.get("/memberTypes", (req, res) => {
    db.query(`SELECT * FROM memberTypes`, (err, result) => {
        if (err) { 
            console.log(err); 
        } else {
            res.json(result);
        }
    });
});

app.get("/eventTypes", (req, res) => {
    db.query(`SELECT * FROM eventTypes`, (err, result) => {
        if (err) { 
            console.log(err); 
        } else {
            res.json(result);
        }
    });
});

app.post('/postEvent', (req, res) => {
    const payload = req.body;
    let hasID = false;

    if (payload.id) {
        if (payload.id != '-1') {
            hasID = true;
        }
    }

    db.query(`${hasID ? 'REPLACE' : 'INSERT'} INTO events VALUES (${hasID ? +payload.id : 'null'}, '${payload.title}', '${payload.startDate}', '${payload.endDate}', '${payload.desc}', '${payload.typeID}', '${payload.location}')`, (err, result) => {
        if (err) { 
            console.log(err);
            res.end(JSON.stringify({
                success: false,
                result
            }));
        } else {
            res.end(JSON.stringify({
                success: true,
                result
            }));
        }
    });
});

app.post('/deleteEvent', (req, res) => {
    const payload = req.body;
    
    if (payload.id) {
        db.query(`DELETE FROM events WHERE id = ${payload.id}`, (err, result) => {
            if (err) { 
                console.log(err);
            } else {
                res.end(JSON.stringify({
                    success: true
                }));
            }
        });
    } else {
        res.end(JSON.stringify({
            success: false
        }));
    }
});

app.post('/postMember', (req, res) => {
    const payload = req.body;
    let hasID = false;

    if (payload.id) {
        if (payload.id != '-1') {
            hasID = true;
        }
    }

    db.query(`${hasID ? 'REPLACE' : 'INSERT'} INTO roster VALUES (${hasID ? +payload.id : 'null'}, '${payload.fname}', '${payload.lname}', '${payload.memberTypeID}', '${payload.phone}', '${payload.email}', '${payload.emName}', '${payload.emPhone}', '${payload.emEmail}')`, (err, result) => {
        if (err) { 
            console.log(err);
            res.end(JSON.stringify({
                success: false,
                result
            }));
        } else {
            res.end(JSON.stringify({
                success: true,
                result
            }));
        }
    });
});

app.post('/deleteMember', (req, res) => {
    const payload = req.body;
    
    if (payload.id) {
        db.query(`DELETE FROM roster WHERE memberID = ${payload.id}`, (err, result) => {
            if (err) { 
                console.log(err);
            } else {
                res.end(JSON.stringify({
                    success: true
                }));
            }
        });
    } else {
        res.end(JSON.stringify({
            success: false
        }));
    }
});

app.get("/messenger", (req, res) => {
    db.query(`SELECT roster.memberID, roster.firstName, roster.lastName, roster.email, roster.memberTypeID, roster.emContactName, roster.emEmail, memberTypes.title FROM roster INNER JOIN memberTypes on roster.memberTypeID = memberTypes.typeID`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/siteData", (req, res) => {
    db.query(`SELECT * FROM siteData`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});


app.post("/postSiteData", (req, res) => {
    const payload = req.body;
    
    const queries = [
        `UPDATE siteData SET teamName = "${payload.teamName}";`,
        `UPDATE siteData SET homeScreen = "${payload.homeScreen}";`
    ];
    
    db.query(queries.join(" "), (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            res.end(JSON.stringify({
                success: true,
                result
            }));
        }
    });
});

app.post('/postEventType', (req, res) => {
    const payload = req.body;
    let hasID = false;

    if (payload.id) {
        if (payload.id != '-1') {
            hasID = true;
        }
    }

    db.query(`${hasID ? 'REPLACE' : 'INSERT'} INTO eventTypes VALUES (${hasID ? +payload.id : 'null'}, '${payload.title}')`, (err, result) => {
        if (err) { 
            console.log(err);
            res.end(JSON.stringify({
                success: false,
                result
            }));
        } else {
            res.end(JSON.stringify({
                success: true,
                result
            }));
        }
    });
});

app.post('/postMemberType', (req, res) => {
    const payload = req.body;
    let hasID = false;

    if (payload.id) {
        if (payload.id != '-1') {
            hasID = true;
        }
    }

    db.query(`${hasID ? 'REPLACE' : 'INSERT'} INTO memberTypes VALUES (${hasID ? +payload.id : 'null'}, '${payload.title}')`, (err, result) => {
        if (err) { 
            console.log(err);
            res.end(JSON.stringify({
                success: false,
                result
            }));
        } else {
            res.end(JSON.stringify({
                success: true,
                result
            }));
        }
    });
});

app.listen(5000, () => {console.log("Server started on port 5000") });