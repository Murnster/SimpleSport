// const { Router } = require('express');
// const db = require('./database');

// const router = Router();

// router.get('/', async (req, res) => {
//     const results = await db.promise().query(`SELECT * FROM events`);
//     console.log(results);
//     res.status(200).send(results[0]);
// });

// router.post('/', (req, res) => {
//     const { id, title, startDate, endDate, desc } = req.body
//     if (id && title && startDate && endDate && desc) {
//         try {
//             console.log('Did i hit here?');
//             db.promise().query(`INSERT INTO EVENTS VALUES('${id}', '${title}', '${startDate}', '${endDate}', '${desc}')`);
//         } catch (err) {
//             console.log(err);
//         }
//     }
// });