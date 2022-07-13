// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function(req, res){
  let utc;
  let unix;
  utc = new Date();
  unix = Math.floor(utc.getTime());
  if(utc !== undefined && unix != undefined){
    let finalObj = printDate(unix, utc);
    res.json(finalObj);
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  //req.params.date = "1451001600000";
  console.log(req.params.date);
  let utc;
  let unix;
  if(new Date(req.params.date) != "Invalid Date"){
      utc = new Date(req.params.date);
      unix = Math.floor(utc.getTime());
  }else if(new Date(parseInt(req.params.date)) != "Invalid Date"){
      utc = new Date(parseInt(req.params.date));
      unix = req.params.date;
  }else{
    //console.log(req.params.date);
    res.json({error: "Invalid Date"});
  }
  if(utc !== undefined && unix != undefined){
    let finalObj = printDate(unix, utc);
    // console.log(req.params.date);
    // console.log(finalObj)
    res.json(finalObj);
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function printDate(unix, utc){
  let monthes = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let utcMonth = monthes[utc.getMonth()];
  let utcDay = weekDays[utc.getDay()];
  let utcHours = utc.getHours().toString();
  let utcDate = utc.getDate();
  if(utcDate.toString().length === 1){
    utcDate = "0" + utcDate;
  }
  if(utcHours.length === 1){
    utcHours = "0" + utcHours;
  }
  let utcMinutes = utc.getMinutes().toString();
  if(utcMinutes.length === 1){
    utcMinutes = "0" + utcMinutes;
  }
  let utcSeconds = utc.getSeconds().toString();
  if(utcSeconds.length === 1){
    utcSeconds = "0" + utcSeconds;
  }
  return {unix:parseInt(unix), utc:`${utcDay}, ${utcDate} ${utcMonth} ${utc.getFullYear()} ${utcHours}:${utcMinutes}:${utcSeconds} GMT`};
}
