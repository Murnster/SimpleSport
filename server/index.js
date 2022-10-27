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

app.post('/postEvent', (req, res) => {
    const payload = req.body;

    db.query(`INSERT INTO events VALUES (null, '${payload.title}', '${payload.startDate}', '${payload.endDate}', '${payload.desc}', '${payload.typeID}')`, (err, result) => {
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