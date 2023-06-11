var express = require("express");
var router = express.Router();

var database = require("../database");

router.post("/view/:id", (req, res) => {
    const { id } = req.params;
    const { account, pass, name, center, area } = req.body;
  
    const query = `SELECT * user SET account = ?, pass = ?, name = ?, center = ?, area = ? WHERE id = ?`;
    const value = [account, pass, name, center, area, id];
  
    database.query(query, value, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        console.log("Data updated successfully!");
        res.redirect("/admin");
      }
    });
  });