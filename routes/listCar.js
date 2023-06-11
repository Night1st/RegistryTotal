var express = require("express");
var router = express.Router();

var database = require("../database");
const e = require("express");

router.get("/", (req, res) => {
  const currentDate = new Date()
  const oneMonthAfter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())

  const defaultQuery = `select owner.ten, owner.type, car.nhanHieu, car.ngayCuGiayDK, car.ngayMoiGiayDK, car.noiDk from owner inner join car on owner.id = car.id`;
  const expiringQuery = `select owner.ten, owner.type, car.nhanHieu, car.ngayCuGiayDK, car.ngayMoiGiayDK, car.noiDk from owner inner join car on owner.id = car.id where car.ngayMoiGiayDK BETWEEN ? AND ?`;
  const value = [currentDate, oneMonthAfter]
  //const value = [ten, cmnd, loaiPhuongTien, nhanHieu, ngayCuGiayDK, ngayMoiGiayDK, noiDk];

  database.query(defaultQuery, (error, result1) => {
    if (error) {
      res.status(500).send(error);
    }
    database.query(expiringQuery, value, (error, result2) => {
      if (error) {
        res.status(500).send(error);
      }
      res.render("listCar", { result1, result2 });
    });
  });
})

// router.get('/', (req, res) => {
//   res.render('listCar');
// });

// router.get('/table1', (req, res) => {
//   const defaultQuery = `select owner.ten, owner.type, car.nhanHieu, car.ngayCuGiayDK, car.ngayMoiGiayDK, car.noiDk from owner inner join car on owner.id = car.id`;
//   database.query(defaultQuery, (err, rows) => {
//     if (err) throw err;
//     res.json(rows);
//   });
// });

// router.get('/table2', (req, res) => {
//   const currentDate = new Date()
//   const oneMonthAfter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())

//   const expiringQuery = `select owner.ten, owner.type, car.nhanHieu, car.ngayCuGiayDK, car.ngayMoiGiayDK, car.noiDk from owner inner join car on owner.id = car.id where car.ngayMoiGiayDK BETWEEN ? AND ?`;
//   const value = [currentDate, oneMonthAfter]
//   database.query(expiringQuery, value, (err, rows) => {
//     if (err) throw err;
//     res.json(rows);
//   });
// });

module.exports = router;