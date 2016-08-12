// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');
// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static(__dirname + '/public'));
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// MongoDB Configuration configuration (Change this URL to your own DB)
var databaseUrl = 'nytreact';
var collections = ["articles"];
// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);
db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get('/api/', function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
    db.articles.find({}).sort({'date': 1}).limit(5, function(err, doc){

        if(err){
          console.log(err);
        }
        else {
          res.json(doc);
        }
      })
});

// This is the route we will send POST requests to save each search.
app.post('/saveArticles', function(req, res) {
  console.log(req.body);

  req.body.articles.forEach(function(value,index) {
  // Here we'll save the location based on the JSON input. 
  db.articles.insert({"title": value.title, "date": value.pub_date, "url": value.url}, function(err,data){
    if(err){
      console.log(err);
    }
    
  })
  })//close forEach

  db.articles.find({}).sort({'date': 1}).limit(5, function(err, data){

      if(err){
        console.log(err);
      }
      else {
        res.json(data);
      }
    })


});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
