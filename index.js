var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

// app.set is going to be used for setting app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var moviesDB = []

app.get("/", function(req, res) {	
	res.render("search");
});

app.get("/results", function(req, res){
	var searchURL = "http://www.omdbapi.com/?s="+req.query.movieQuery;
	request(searchURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var stuff = JSON.parse(body);
      // console.log(stuff["Search"]);
      // res.render("moviePage", stuff)
      moviesDB.push(stuff["Search"]);
      console.log(moviesDB);
      res.render("results", stuff);
    } else {
      // res.render("errorPage")
      console.log("ERRR000R");
    }
  })

	// moviesDB.push(req.query.movieQuery);
	// console.log(searchURL);

});

app.get("/details/:id", function(req, res) {
	var index = req.params.id;
	console.log(index);
	var searchURL = "http://www.omdbapi.com/?i="+ index;
	request(searchURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var stuff = JSON.parse(body);
      stuff.pageTitle = 'Movie Details: '+stuff.Title;
      // res.send(stuff);
      res.render("details", stuff);
    } else {
      // res.render("errorPage")
      console.log("ERRR000R");
    }
  })
});
app.listen(3000);