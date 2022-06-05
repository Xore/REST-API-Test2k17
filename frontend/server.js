var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    request = require("request"),
    bodyParser = require('body-parser');

//set template engine and spaces for json objects
app.set('view engine', 'ejs');
app.set('json spaces', 4);
//setting static content
app.use(express.static('static'));
/*
* NOTE:
*       Marker API and User Backend is handled by googleRoute !
 */
// index page aka google maps
app.get('/', function (req, res) {
    request({
        url: "https://imdabackend.herokuapp.com/marker",
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            res.render('pages/index', {data: body});
        } else {
            res.send('error!');
        }

    })
});

app.get('/user', function (req, res) {
    res.sendFile('./user/index.html', {root: './static/'})
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(port);