var express = require("express");
var router = express.Router();
var xlsx = require("xlsx");

var database = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", session: req.session });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra trong bảng 'users'
  const userQuery = "SELECT * FROM user WHERE account = ? AND pass = ?";
  const userValues = [username, password];

  database.query(userQuery, userValues, (error, results) => {
    if (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi đăng nhập." });
    } else {
      if (results.length > 0) {
        // Đăng nhập thành công cho người dùng
        req.session.loggedin = true;
        req.session.username = results[0];

        res.redirect("/home");
        // res.status(200).json({ message: 'Đăng nhập thành công cho người dùng.' });
      } else {
        // Kiểm tra trong bảng 'admins'
        const adminQuery = "SELECT * FROM admin WHERE account = ? AND pass = ?";
        const adminValues = [username, password];

        database.query(adminQuery, adminValues, (adminError, adminResults) => {
          if (adminError) {
            console.error("Lỗi đăng nhập:", adminError);
            res.status(500).json({ error: "Đã xảy ra lỗi khi đăng nhập." });
          } else {
            if (adminResults.length > 0) {
              // Đăng nhập thành công cho admin
              req.session.loggedin = true;
              req.session.username = adminResults[0];

              res.redirect("/admin");
            } else {
              // Sai tên đăng nhập hoặc mật khẩu
              res
                .status(401)
                .json({ error: "Sai tên đăng nhập hoặc mật khẩu." });
            }
          }
        });
      }
    }
  });
});

router.get("/home", (req, res) => {
  if (req.session.loggedin) {
    //res.render("home", { user: req.session.username });
    const user = req.session.username;

    //const { ten, cmnd, type, loaiPhuongTien, nhanHieu, bienDK, noiDk } = req.body;

    const query = `select owner.ten, owner.type, car.nhanHieu, car.ngayCuGiayDK, car.ngayMoiGiayDK from owner inner join car ON owner.id = car.id WHERE car.noiDk = ?`;
    //const value = [ten, cmnd, type, loaiPhuongTien, nhanHieu, bienDK, noiDk];

    database.query(query, [user.center], (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.render("home", { user, data: result });
      }
    });
  } else {
    res.redirect("/");
  }
});

router.get("/admin", (req, res) => {
  if (req.session.loggedin) {
    //res.render("homeadmin", { username: req.session.username });
    const { account, pass, name, center, area } = req.body;

    const query = `SELECT * FROM user`;
    const value = [account, pass, name, center, area];

    database.query(query, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.render("homeadmin", { data: result });
      }
    });
  } else {
    res.redirect("/");
  }
});

router.get("/admin/editUser/:id", (req, res) => {
  // Read the Excel file
  const workbook = xlsx.readFile(
    "public/stylesheets/vendor/fileExcel/ttdk.xlsx"
  );

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert worksheet to JSON
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Take the first row from the data array
  const columnNames = Object.keys(data[0]);
  
  const {id} = req.params
  const query = `SELECT * FROM user WHERE id = ?`

  database.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else if (result.length === 0) {
      res.status(404).send("User not found");
    }
    else {
      const row = result[0]
      res.render("editUser", {row, columnNames, data})
    }
  })
})

router.get("/admin/user", (req, res) => {
  // Read the Excel file
  const workbook = xlsx.readFile(
    "public/stylesheets/vendor/fileExcel/ttdk.xlsx"
  );

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert worksheet to JSON
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Take the first row from the data array
  const columnNames = Object.keys(data[0]);

  // Pass the column names and data to the EJS template
  res.render("addUser", { columnNames, data });
});

router.get("/admin/registrytotal", (req, res) => {
  // Read the Excel file
  const workbook = xlsx.readFile(
    "public/stylesheets/vendor/fileExcel/ttdk.xlsx"
  );

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert worksheet to JSON
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Take the first row from the data array
  const columnNames = Object.keys(data[0]);

  res.render("registry", { columnNames, data });
});

router.get("/admin/center", (req, res) => {
  // Read the Excel file
  const workbook = xlsx.readFile(
    "public/stylesheets/vendor/fileExcel/ttdk.xlsx"
  );

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert worksheet to JSON
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Take the first row from the data array
  const columnNames = Object.keys(data[0]);

  res.render("listCenter", { data });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
