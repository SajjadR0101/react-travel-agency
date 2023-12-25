const database = require("../database/appDatabase");
const express = require("express");

const newsLatterRouter = express.Router();

newsLatterRouter.get("/", (req, res) => {
    const sqlQuery = "SELECT * FROM newslatter";

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

newsLatterRouter.post("/", (req, res) => {
    const { email } = req.body;
    const sqlQuery = `INSERT INTO newslatter (email) VALUES ('${email}')`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

newsLatterRouter.delete("/:id", (req, res) => {

    const newsLatterID = req.params.id;

    const sqlQuery = `DELETE FROM newslatter WHERE id=${newsLatterID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = newsLatterRouter;
