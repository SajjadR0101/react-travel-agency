const database = require("../database/appDatabase");
const express = require("express");

const tripTypesRouter = express.Router();

tripTypesRouter.get("/", (req, res) => {
    const sqlQuery = `SELECT * FROM triptypes`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});


module.exports = tripTypesRouter;