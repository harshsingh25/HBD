const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
let port= process.env.PORT ;
if (port==null||port==""){
    port=3000;
}



app.get("/", function(req, res){
    res.render("home");
});

app.get("/create", function(req, res){
      res.render("create");
  
});


app.get("/about", function(req, res){

  
    res.render("about");
});

app.get("/contact", function(req, res){
  
    res.render("contact");
});



app.listen(port, function() {
  console.log("Server started on port 3000");
});
