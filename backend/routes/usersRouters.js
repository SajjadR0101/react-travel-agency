const database = require("../database/appDatabase");
const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
    const sqlQuery = `SELECT * FROM users`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

usersRouter.get("/:token", (req, res) => {
    const token = req.params.token;
    const sqlQuery = `SELECT * FROM users WHERE token = '${token}'`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

usersRouter.get("/:id/flights", (req, res) => {
    const userID = req.params.id;

    const data = {
        flightsOrder: [],
        flights: [],
    };

    const flightsSqlQuery = `SELECT * FROM flights`;
    const flightsOrderSqlQuery = `SELECT * FROM flightsorder WHERE userID=${userID}`;

    database.query(flightsSqlQuery, (err, result) => {
        if (!err) {
            data.flights = result;

            database.query(flightsOrderSqlQuery, (err, result) => {
                if (!err) {
                    data.flightsOrder = result;

                    res.send(data.flightsOrder.map((order) => order.flightID).map((flightID) => data.flights.find((flight) => flight.id === flightID)));
                } else {
                    res.send(null);
                }
            });
        } else {
            res.send(null);
        }
    });
});

usersRouter.get("/:id/hotels", (req, res) => {
    const userID = req.params.id;

    const data = {
        hotelsOrder: [],
        hotels: [],
    };

    const hotelsSqlQuery = `SELECT * FROM hotels`;
    const hotelsOrderSqlQuery = `SELECT * FROM hotelsorder WHERE userID=${userID}`;

    database.query(hotelsSqlQuery, (err, result) => {
        if (!err) {
            data.hotels = result;

            database.query(hotelsOrderSqlQuery, (err, result) => {
                if (!err) {
                    data.hotelsOrder = result;

                    res.send(data.hotelsOrder.map((order) => order.hotelID).map((hotelID) => data.hotels.find((hotel) => hotel.id === hotelID)));
                } else {
                    res.send(null);
                }
            });
        } else {
            res.send(null);
        }
    });
});

usersRouter.get("/:id/cards", (req, res) => {
    const userID = req.params.id;

    const sqlQuery = `SELECT * FROM cards WHERE userID=${userID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

usersRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sqlQuery = `SELECT *
    FROM users
    WHERE users.email='${email}' AND users.password='${password}'`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});


usersRouter.post("/", (req, res) => {
    const { username, email, phone, password } = req.body;
    const token = crypto.randomUUID();
    const sqlQuery = `INSERT INTO users (token, username, email, phone, password) VALUES ('${token}', '${username}', '${email}', '${phone}', '${password}')`;

    console.log(sqlQuery);

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(JSON.stringify({ token }));
    });
});

usersRouter.put("/", (req, res) => {
    const userToken = req.headers.authorization;
    const body = Object.entries(req.body);

    const sqlQuery = `UPDATE users SET ${body.reduce((prev, current) => prev + `${current[0]}=${typeof current[1] === "string" ? `'${current[1]}'` : current[1]},`, "").slice(0, -1)} WHERE token='${userToken}'`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

usersRouter.delete("/:userToken", (req, res) => {
    const userToken = req.params.userToken;
    const sqlQuery = `DELETE FROM users WHERE token='${userToken}'`;

    console.log(sqlQuery);

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = usersRouter;
