require("dotenv").config() // Lien .env (LIGNE 1 !!!)
require("./models/connection") // Fichier de connection à la BDD Mongoose très important !

var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users") // Ajouter si vous voulez créer un nouveau fichier de route
var tripRouter = require("./routes/trips")
var bookRouter = require("./routes/bookings")
var cartRouter = require("./routes/carts")

var app = express()

const cors = require("cors") // Installation de Cors

/* const corsOptions = {
  origin: function (origin, callback) {
    // Remplacee 'allowedOrigins' avec vos différents URLs front pouvant accéder au Backend
    const allowedOrigins = [
      "http://localhost:3000/",
     
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}; */

 app.use(cors()) // Installation de Cors

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter) // Ajouter si vous voulez créer un nouveau fichier de route
app.use("/trips", tripRouter)
app.use("/bookings", bookRouter)
app.use("/carts", cartRouter)

module.exports = app
