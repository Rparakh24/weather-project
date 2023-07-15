const express = require("express");// requiring express
const app = express();
const https = require("https");//api 
const bodyParser = require("body-parser");//get data from user
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({entended:true}));//use body parser



app.get("/", function (req, res) {//get index.html
    res.sendFile(__dirname+"/index.html");
    });



app.post("/",function(req,res){//post this 
    
    const city = req.body.city;
    const apiId = "0e936515f5d3e64801742a1290eb5308";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?units="+unit+"&appid="+apiId+"&q="+city;
    https.get(url, function (response) {
        response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        var temp = weatherData.main.temp;
        var weatherDescription = weatherData.weather[0].description;
        var iconUrl = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
        res.write("<h1>the weather in " + city + " is = " + weatherDescription + "</h1>");
        res.write("<h1>the temperature in your area is " + temp + " </h1>");
        res.write("<img src=" + iconUrl + ">");
        res.send();
    })
  });
});

app.listen(3000, function () {
  console.log("the server has started at port 3000");
});