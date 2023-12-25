const database = require("../database/appDatabase");
const express = require("express");

const flightsRouter = express.Router();

flightsRouter.get("/", (req, res) => {
    const sqlQuery = `SELECT flights.id, flightName, price, cover, fromCity, toCity, departDate, returnDate, departTime, returnTime, flyTime, gate, capacity, companies.name AS company, triptypes.type AS triptype , score FROM flights INNER JOIN companies ON flights.companyID = companies.id INNER JOIN triptypes ON flights.tripTypeID = triptypes.id`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

flightsRouter.get("/:id", (req, res) => {
    const flightID = req.params.id;
    const sqlQuery = `SELECT flights.id, flightName, price, cover, fromCity, toCity, departDate, returnDate, departTime, returnTime, flyTime, gate, capacity, companies.name AS company, companies.image AS companyCover, triptypes.type AS triptype , score FROM flights INNER JOIN companies ON flights.companyID = companies.id INNER JOIN triptypes ON flights.tripTypeID = triptypes.id WHERE flights.id = ${flightID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

flightsRouter.post("/", (req, res) => {
    const { flightName, price, cover, from, to, departDate, returnDate, departTime, returnTime, tripTypeID, flyTime, gate, capacity, companyID, score } = req.body;
    const sqlQuery = `INSERT INTO flights VALUES (NULL, '${flightName}', ${price},'${cover}','${from}','${to}','${departDate}','${returnDate}','${departTime}','${returnTime}',${tripTypeID}, ${flyTime},'${gate}',${capacity},${companyID},${score})`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

flightsRouter.put("/:id", (req, res) => {
    const flightID = req.params.id;
    const body = Object.entries(req.body)
    const sqlQuery = `UPDATE flights SET ${body.reduce((prev, current) => prev + `${current[0]}=${typeof current[1] === "string" ? `'${current[1]}'` : current[1]},`, "").slice(0, -1)} WHERE id=${flightID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});


flightsRouter.delete("/:id", (req, res) => {
    const flightID = req.params.id;
    const sqlQuery = `DELETE FROM flights WHERE id=${flightID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = flightsRouter;
