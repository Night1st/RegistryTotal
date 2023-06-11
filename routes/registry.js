var express = require("express");
var router = express.Router();

var database = require("../database");

router.post('/registry', async(req, res) => {
  const {
    ten,
    ns,
    cmnd,
    address,
    type,
    maSoGiay,
    ngayCapGiay,
    ngayCuGiayDK,
    ngayMoiGiayDK,
    bienDK,
    noiDk,
    mucDich,
    img,
    nhanHieu,
    namSx,
    nuocSx,
    mauSon,
    soMay,
    soKhung,
    soLoai,
    dungTich,
    soChoNgoi,
    congThuc,
    vetBanhXe,
    chieuDai,
    khoiLuong,
    loaiNhienLieu,
    congSuat,
    tocDoQuay
  } = req.body;
  const ownerQuery = "INSERT INTO owner (`ten`, `ns`, `cmnd`, `address`, `type`) VALUES(?,?,?,?,?)";
  const ownerValue = [ten, ns, cmnd, address, type];

  const carQuery = "INSERT INTO car (`maSoGiay`, `ngayCapGiay`, `ngayCuGiayDK`, `ngayMoiGiayDK`, `bienDK`, `noiDk`, `mucDich`, `img`, `nhanHieu`, `namSx`, `nuocSx`, `mauSon`, `soMay`, `soKhung`, `soLoai`, `dungTich`, `soChoNgoi`, `congThuc`, `vetBanhXe`, `chieuDai`, `khoiLuong`, `loaiNhienLieu`, `congSuat`, `tocDoQuay`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const carValue = [
    maSoGiay,
    ngayCapGiay,
    ngayCuGiayDK,
    ngayMoiGiayDK,
    bienDK,
    noiDk,
    mucDich,
    img,
    nhanHieu,
    namSx,
    nuocSx,
    mauSon,
    soMay,
    soKhung,
    soLoai,
    dungTich,
    soChoNgoi,
    congThuc,
    vetBanhXe,
    chieuDai,
    khoiLuong,
    loaiNhienLieu,
    congSuat,
    tocDoQuay
  ];

  database.beginTransaction((error) => {
    if (error) throw error;

    database.query(ownerQuery, ownerValue, (error, res1) => {
      if (error) {
        database.rollback(() => {
          throw error;
        });
      }
      database.query(carQuery, carValue, (error, res2) => {
        if (error) {
          database.rollback(() => {
            throw error;
          });
        }
        database.commit((error) => {
          if (error) {
            database.rollback(() => {
              throw error;
            });
          }
          res.redirect('/admin')
        });
      });
    });
  });
});


module.exports = router