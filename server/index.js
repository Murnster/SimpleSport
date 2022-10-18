const express = require('express');
const db = require('./database');
const app = express();

app.get("/events", (req, res) => {
    db.query(`SELECT * FROM events`, (err, result) => {
        if (err) { 
            console.log(err); 
        } else {
            res.json(result);
        }
    });
});

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
});

app.listen(5000, () => {console.log("Server started on port 5000") });