const database = require("../database/appDatabase");
const express = require("express");

const hotelsRouter = express.Router();

hotelsRouter.get("/", (req, res) => {
    const sqlQuery = `SELECT hotels.id, hotelName, price, cover, score, checkInDate, checkOutDate, checkInTime, checkOutTime, rooms, companies.name AS company, triptypes.type AS triptype, companies.image AS companyCover FROM hotels INNER JOIN companies ON hotels.companyID = companies.id INNER JOIN triptypes ON hotels.tripTypeID = triptypes.id`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

hotelsRouter.get("/:id", (req, res) => {
    const hotelID = req.params.id;
    const sqlQuery = `SELECT hotels.id, hotelName, price, cover, score, checkInDate, checkOutDate, checkInTime, checkOutTime, rooms, companies.name AS company, triptypes.type AS triptype, companies.image AS companyCover FROM hotels INNER JOIN companies ON hotels.companyID = companies.id INNER JOIN triptypes ON hotels.tripTypeID = triptypes.id WHERE hotels.id=${hotelID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

hotelsRouter.post("/", (req, res) => {
    const { hotelName, price, cover, score, checkInDate, checkOutDate, checkInTime, checkOutTime, rooms, companyID, tripTypeID } = req.body;
    const sqlQuery = `INSERT INTO hotels VALUES (NULL, '${hotelName}', ${price},'${cover}',${score},'${checkInDate}','${checkOutDate}','${checkInTime}','${checkOutTime}',${rooms},${companyID},${tripTypeID})`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

hotelsRouter.put("/:id", (req, res) => {
    const hotelID = req.params.id
    const body = Object.entries(req.body)
    const sqlQuery = `UPDATE hotels SET ${body.reduce((prev, current) => prev + `${current[0]}=${typeof current[1] === "string" ? `'${current[1]}'` : current[1]},`, "").slice(0, -1)} WHERE id=${hotelID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
})

hotelsRouter.delete("/:id", (req, res) => {
    const hotelID = req.params.id
    const sqlQuery = `DELETE FROM hotels WHERE id=${hotelID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = hotelsRouter;
