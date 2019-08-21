var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv')
var exphbs = require('express-handlebars')
const handler = require('serve-handler');
const http = require('http');

// const server = http.createServer((request, response) => {
    
//     // You pass two more arguments for config and middleware
//     // More details here: https://github.com/zeit/serve-handler#options
//     return handler(request, response);
//   })

//cors
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// })
 
 
//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
 
// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
 
//middleware
app.use(express.static('app/public'))



// if (process.env.NODE_ENV === 'production') {
//     // Serve up static assets (usually on heroku)
//     app.use(express.static('client/build'))
//     // Handle React routing, return all requests to React app
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
//     })
//    } else {
//     // Serve up static assets
//     app.use(express.static('client/public'))
//    }
   

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
 
 
 
app.get('/', function(req, res) {
 
    res.send('Welcome to Passport with Sequelize');
 
});
 
//Models
var models = require("./app/models");
 
//Routes
 
var authRoute = require('./app/routes/auth.js')(app,passport);
var hiScore = require("./routes/newScore")(app);
 
 
//load passport strategies
 
require('./app/config/passport/passport.js')(passport, models.user);
 
 
//Sync Database
 
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});
 
var PORT = process.env.PORT || 5000
app.listen(PORT, function(err) {
 
    if (!err)
 
        console.log("Site is live");
         
    else console.log(err)
 
});

// server.listen(3000, () => {
//     console.log('Running at http://localhost:3000');
//   });