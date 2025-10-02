const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// set view engine hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// serve file static (misalnya foto.jpeg)
app.use(express.static(path.join(__dirname, "public")));

// route untuk biodata
app.get("/", (req, res) => {
  const biodata = {
    nama: "Abdul Mafahir",
    ttl: "Jakarta, 03-11-2003",
    jk: "Laki-laki",
    alamat: "Jl.H.Selong Rt001/Rw013 Duri Kosambi,Cengkareng-Jakarta Barat",
    kegiatan: "Mengikuti Bootcamp DumbWays",
    foto: "foto.jpeg"
  };
  res.render("identitas", biodata);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
