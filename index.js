var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');


var db = require("./models/index.js");

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// app.set is going to be used for setting app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

// var moviesDB = []

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
// moviesDB.push(stuff["Search"]);
// console.log(moviesDB);
res.render("results", stuff);
} else {
// res.render("errorPage")
console.log("ERRR000R");
}
})

// moviesDB.push(req.query.movieQuery);
// console.log(searchURL);

});

// app.get("/addToWatchList", function(req, res) {
//   var
// })
app.post("/added", function(req, res){
// res.send(req.body);
db.Movie.findOrCreate({where: {title: req.body.title, year: req.body.year, imdbID: req.body.imdbID}}).done(function(err, data) {
// console.log(err);
// res.send(req.headers.host)
res.render("added");
// console.log(data);
});
});

// app.delete("/deleted", function(req, res) {
//   db.Movie.find({ where: {imdbID: req.body.imdbID2}}).then(function(deleteCount){
//     deleteCount.destroy().success(function(){
//       res.redirect("/WatchList")
//       // res.send(req.body)
//       // res.render("deleted",{"title":imbdID})
//     });
//   });
// });


//try imdbID: req.query.params

/*db.User.find({ where: { first_name: 'Anil' } }).then(function(user){
user.destroy().success(function() {})
})*/

app.get("/watchList", function(req, res) {
  var data = db.Movie.findAll().done(function(err, data) {
// res.send({"movies":data});
res.render("watchList",{"movies": data});
})
});


app.delete("/watchList/:id", function(req, res) {
  db.Movie.destroy({ where: {id: req.params.id}}).then(function(deleteCount){
    res.send({deleted:deleteCount});
  })
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