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

app.post('/postEvent', (req, res) => {
    const payload = req.body;
    let hasID = false;

    if (payload.id) {
        if (payload.id != '-1') {
            hasID = true;
        }
    }

    db.query(`${hasID ? 'REPLACE' : 'INSERT'} INTO events VALUES (${hasID ? +payload.id : 'null'}, '${payload.title}', '${payload.startDate}', '${payload.endDate}', '${payload.desc}', '${payload.typeID}')`, (err, result) => {
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

app.listen(5000, () => {console.log("Server started on port 5000") });