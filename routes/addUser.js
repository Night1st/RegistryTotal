var express = require("express");
var router = express.Router();

var database = require("../database");

router.post("/addUser", (req, res) => {
  const { account, pass, name, center, area } = req.body;

  const query = `INSERT INTO user (account, pass, name, center, area) VALUES(?,?,?,?,?)`;
  const value = [account, pass, name, center, area];

  database.query(query, value, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log("Data added successfully!");
      res.redirect("/admin");
    }
  });
});

module.exports = router;
