const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
let port= process.env.PORT ;
if (port==null||port==""){
    port=3000;
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect( "mongodb+srv://admin-harsh:Harsh99@cluster0-qbg2m.mongodb.net/happy", {useNewUrlParser: true,useUnifiedTopology: true});

const hbdSchema = {
    name:String,
    url:String,
    message:String 
    
  };
 
const HBD= mongoose.model("happy", hbdSchema);
  
app.post("/create", function(req, res){
    const u =  req.body.hbdurl.replace(/\s+/g, '-').toLowerCase();  
   
   const hbd = new HBD({
     name: req.body.hbdname,
     url: u,
     message: req.body.hbdmsg
   });
 
   hbd.save(function(err){
    if (!err){
         res.render("created",        {     u:u
         });
     }
   });
 });
 




app.get("/", function(req, res){
    res.render("home");
});

app.get("/harsh", function(req, res){
    res.render("birthday");
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
