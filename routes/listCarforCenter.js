var express = require("express");
var router = express.Router();

var database = require("../database");

router.get("/", (req, res) => {
  const user = req.session.user;

  const query = `select owner.ten, owner.type, car.nhanHieu, car.ngayCuGiayDK, car.ngayMoiGiayDK from owner inner join car ON owner.id = car.id WHERE car.noiDk = ?`;

  database.query(query, [user.center], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.render("home", { data: result });
    }
  });
});

module.exports = router;
