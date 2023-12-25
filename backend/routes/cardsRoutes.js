const database = require("../database/appDatabase");
const express = require("express");

const cardsRouter = express.Router();

cardsRouter.get("/", (req, res) => {
    const sqlQuery = `SELECT * FROM cards`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

cardsRouter.post("/", (req, res) => {
    const { number, expDate, cvc, nameOnCard, region } = req.body
    const userID = req.headers.authorization

    const sqlQuery = `INSERT INTO cards VALUES (NULL, '${number}', '${cvc}', '${expDate}', '${nameOnCard}', '${region}', ${userID})`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

cardsRouter.delete("/:cardID", (req, res) => {
    const cardID = req.params.cardID
    const sqlQuery = `DELETE FROM cards WHERE id=${cardID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = cardsRouter;