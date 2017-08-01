var moment = require('moment');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get(/\/$/,(req,res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:date',(req,res) => {
  var date,unix,natural;
  if(moment(req.params.date, "MMMM DD, YYYY").isValid() || moment(Number(req.params.date),"X").isValid())
    {
      if(moment(req.params.date,"MMMM D, YYYY",true).isValid()){
        date = moment(req.params.date,"MMMM D, YYYY");
        console.log('set from MM');
        unix = date.format("X");
        natural = date.format("MMMM DD, YYYY");
        res.json({
        unix: unix,
        natural: natural
      });
    }
      else if(moment(Number(req.params.date),"X").isValid()){
        date = moment(Number(req.params.date),"X");
        natural = date.format("MMMM DD, YYYY");
        unix = date.format("X");
        console.log('set from X');
        res.json({
        unix: unix,
        natural: natural
      });
    }
  }
  else{
    console.log("reach");
    res.json({
      unix: null,
      natural: null
    });
  }
});

var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
