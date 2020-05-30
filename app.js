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
  

app.get("/", function(req, res){
  res.render("home");
});


app.get("/create", function(req, res){
    res.render("create");  
});


app.get("/about", function(req, res){


  res.render("about");
});


app.listen(port, function() {
console.log("Server started on port 3000");
});

app.post("/create", function(req, res){
    const u =  req.body.hbdurl.replace(/\s+/g, '-').toLowerCase();  
   
   const hbd = new HBD({
     name: req.body.hbdname,
     url: u,
     message: req.body.hbdmsg
   });
   if(hbd.name.length<=7){
   hbd.save(function(err){
    if (!err){
         res.render("created",{     
           u:u
         });
     }
   });
  }else{
res.send("failed");   
  }
 });
 
 app.get("/:hbdu", function(req, res){ 
     const requestedu = req.params.hbdu.replace(/\s+/g, '-').toLowerCase(); ;
    HBD.findOne({url: requestedu}, function(err, hbd){
    if(!err){
    if(hbd){let msg = hbd.message;
      let nowup;   
      let name= hbd.name;
      var length=name.length;
      nowup=name;

      if(length=1){nowup=nowup.concat("!!!!!!");}
      else if (length=2){nowup=nowup.concat("!!!!!");}
      else if (length=3){nowup=nowup.concat("!!!!");}
      else if (length=4){nowup=nowup.concat("!!!");}
      else if (length=5){nowup=nowup.concat("!!");}
      else if (length=6){nowup=nowup.concat("!");}
    
      var pars = input.msg('-');

      res.render("birthday",{
          nowname: name,
          nowmsg: msg,
          length: length,
          nown:nowup
        });
    }
    else{res.redirect("/");} 
    }   
  });
});
