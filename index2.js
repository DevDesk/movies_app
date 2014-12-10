app.get("/details/:id", function(req, res) {
  var index = req.params.id;
  // console.log(index);
  var searchURL = "http://www.omdbapi.com/?i="+ index;
    request(searchURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieFullObject = JSON.parse(body);
        db.Movie.count({ where: {imdbCode: movieFullObject.imdbID}}).then(function(foundItemCount){
          var wasFound = foundItemCount > 0;
          // var locals = 
            console.log(foundItemCount);
            foundItemCount.pageTitle = 'Movie Details: '+ foundItemCount.Title;
            console.log(foundItemCount);
              res.render("details", foundItemCount);
  
      } else {
        console.log("ERRR000R");
      }
    }
    })
});