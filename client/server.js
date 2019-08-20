var express = require("express");
var passport = require("passport");
var session = require("express-session")
var bodyParser = require("body-parser");
var env = require("dotenv").load()


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var authRoute = require("./app/routes/auth.js")(app, passport)

//BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

//Passport
app.use(session({
    secret: "keyboard penguin",
    resave: true,
    saveUninitialized: true
})); //session secret
app.use(passport.initialize());
app.use(passport.session());// persistent login sessions



// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});