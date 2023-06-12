var express = require("express");
var router = express.Router();

var database = require("../database");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM car WHERE id = ?`;
  const value = [id];

  database.query(query, value, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const user = result[0];
      console.log("Data viewed successfully!");
      res.render("informationCar", { user });
    }
  });
});

module.exports = router