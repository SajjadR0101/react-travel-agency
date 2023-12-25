const database = require("../database/appDatabase");
const express = require("express");

const hotelsOrderRouter = express.Router()

hotelsOrderRouter.get('/', (req, res) => {
    const sqlQuery = `SELECT * FROM hotelsorder`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
})

hotelsOrderRouter.post("/", (req, res) => {
    const { hotelID } = req.body;
    const userID = req.headers.authorization;

    const sqlQuery = `INSERT INTO hotelsorder VALUES (NULL, ${hotelID}, ${userID})`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = hotelsOrderRouter;