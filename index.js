var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');
var db = require("./models/index.js");

// app.set is going to be used for setting app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {	
  res.render("search");
});


app.get("/results", function(req, res){
  var searchURL = "http://www.omdbapi.com/?s="+req.query.movieQuery;
  request(searchURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var stuff = JSON.parse(body);
      res.render("results", stuff);
    } else {
      console.log("ERRR000R");
    }
  })
});


// app.post("/added", function(req, res){
//   db.movie.findOrCreate({where: {title: req.body.title, year: req.body.year, imdbID: req.body.imdbID}}).done(function(err, data) {
//     res.render("added");
//   });
// });

app.post("/added", function(req, res) {
  db.movie.findOrCreate({where: req.body}).spread(function(data, created){
    res.send({movie:data, wasCreated:created});
  })
})

app.get("/watchList", function(req, res) {
  var data = db.movie.findAll().done(function(err, data) {
    res.render("watchList",{"movies": data});
  })
});


app.delete("/watchList/:id", function(req, res) {
  db.movie.destroy({ where: {id: req.params.id}}).then(function(deleteCount){
    res.send({deleted:deleteCount});
  })
});


app.get("/details/:id", function(req, res) {
  var index = req.params.id;
  // console.log(index);
  var searchURL = "http://www.omdbapi.com/?i="+ index;
    request(searchURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieFullObject = JSON.parse(body);
        db.movie.count({ where: {imdbID: movieFullObject.imdbID}}).then(function(foundItemCount){
          var wasFound = foundItemCount > 0;
          // var locals = 
          console.log(movieFullObject);
          movieFullObject.pageTitle = 'Movie Details: '+ movieFullObject.Title;
          movieFullObject.wasFound = wasFound;
          console.log(movieFullObject);
            // res.send("details", movieFullObject);
            res.render("details", movieFullObject);
        })
      } else {
        console.log("ERRR000R");
      }
    })
});


app.listen(3000);

