const database = require("../database/appDatabase");
const express = require("express");

const companiesRouter = express.Router();

companiesRouter.get("/", (req, res) => {
    const sqlQuery = "SELECT * FROM companies";

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(result);
    });
});

companiesRouter.post("/", (req, res) => {
    const { name, image } = req.body 
    const sqlQuery = `INSERT INTO companies VALUES (NULL, '${name}', '${image}')`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

companiesRouter.delete("/:id", (req, res) => {
    const companyID = req.params.id
    const sqlQuery = `DELETE FROM companies WHERE id=${companyID}`;

    database.query(sqlQuery, (err, result) => {
        (err && res.send(null)) || res.send(true);
    });
});

module.exports = companiesRouter;
