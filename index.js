"use strict";
require("dotenv").config();
const routes = require("./routes.js");
const auth = require("./auth.js");
const express = require("express");
const myDB = require("./connection");
const app = express();
const bodyParser = require('body-parser');
let session = require("express-session");
let passport = require("passport");

const http = require("http").createServer(app);
const cookieParser = require("cookie-parser");
//const MongoStore = require("connect-mongo")(session);
const URI = process.env.MONGO_URI;
// const store = new require("connect-mongo")(session)({ url: URI });
app.use(bodyParser.urlencoded({extended:true}))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
        key: "connect.sid",
        // store: store,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views");

myDB(async(client) => {
    const myDataBase = await client.db("pipalBazar").collection("users");
    routes(app, myDataBase);
        auth(app, myDataBase);
}).catch((e) => {
    app.route("/").get((req, res) => {
        res.render("ejs", { title: e, message: "Unable to login" });
    });
});


http.listen(process.env.PORT || 3002, () => {
    console.log("Listening on port " , process.env.PORT || 3002);
});