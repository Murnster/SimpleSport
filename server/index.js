const express = require('express');
const db = require('../server/database');
const app = express();

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
});

// 4mins into anson the dev expressjs tutorial #8

app.listen(5000, () => {console.log("Server started on port 5000") });