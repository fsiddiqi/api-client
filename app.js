var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');
var app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file index page
app.get('/', function (req, res) {
  request('https://nanoquote.getsandbox.com/api/quotes', {
    json: true
  }, (err, resp, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.state);

    res.render('pages/index', body);
  });

});


// use res.render to load up an ejs view file index page
app.get('/quotes/:quoteID', function (req, res) {
  var quoteID = req.params.quoteID;
  request('https://nanoquote.getsandbox.com/api/quotes/' + quoteID, {
    json: true
  }, (err, resp, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.state);

    res.render('pages/quote', body);
  });

});


app.use('/output', express.static('../output'));

app.listen(3000);
console.log('3000 is the magic port');