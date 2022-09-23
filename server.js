const express = require('express')
const app = express()
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const connectDB = require("./config/database");
const methodOverride = require("method-override");

PORT = 5555;
const mainRoute = require("./routes/main")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Serves up our static assets
app.use(express.static("public"));

// Passport config
require("./config/passport")(passport);

//Using EJS for views
app.set("view engine", "ejs");

//Connect To Database
connectDB();

//Use forms for put / delete
app.use(methodOverride("_method"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serves up our static assets
app.use(express.static("public"));


//Use flash messages for errors, info, ect...
app.use(flash());




app.use("/", mainRoute)


app.listen(PORT, () =>{
    console.log(`We are live on port ${PORT}`)
})