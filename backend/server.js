var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/googleModel'), //created model loading here
    session = require('express-session'),
    request = require("request"),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser');

app.set('json spaces', 4);
/*
* JUST USED TO BOOTSTRAP THE API
 */
//connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://MONGOOSECONNECTIONSTRINGMOFU');
var db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    }),
}));
// parse incoming requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var marker = require('./api/routes/googleRoute'); //importing route
var user = require('./api/routes/userRoute');
user(app);
marker(app); //register the route
app.listen(port);