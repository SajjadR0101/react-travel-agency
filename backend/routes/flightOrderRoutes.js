const database = require("../database/appDatabase");
const express = require("express");

const flightOrderRouter = express.Router();

flightOrderRouter.get("/", (req, res) => {
    const sqlQuery = `SELECT * FROM flightsorder`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

flightOrderRouter.post("/", (req, res) => {
    const { flightID } = req.body;
    const userID = req.headers.authorization;

    const sqlQuery = `INSERT INTO flightsorder VALUES (NULL, ${flightID}, ${userID})`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = flightOrderRouter;
