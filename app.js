const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded ({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")

});

app.post("/",function(req,res){

const query=req.body.cityName;
const apiKey="52c716b83674d22ebc0ec42220655871";
const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid="+ apiKey+"&units="+units;
https.get(url,function(response){
  // console.log(response);

  response.on("data",function(data){
    // console.log(data);
  const weatherData =JSON.parse(data);
  console.log(weatherData);
  const tempfinal=weatherData.main.temp;
  const weatherdes=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  const imageUrl="http://openweathermap.org/img/wn/" + icon +"@2x.png"


  console.log(tempfinal);
  console.log(weatherdes);
  res.write("<p>The weather is currently"+weatherdes+ "<p>");
  res.write("<h1>The temp in " + query +" is"+tempfinal+"degree Celcius.</h1>");
  res.write("<img src=" + imageUrl +">");
  res.send();
  })
});
  console.log("Post received");
});
// const query="London";
// const apiKey="52c716b83674d22ebc0ec42220655871";
// const units="metric";
// const url="https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid="+ apiKey+"&units="+units;
// https.get(url,function(response){
//   // console.log(response);
//
//   response.on("data",function(data){
//     // console.log(data);
//   const weatherData =JSON.parse(data);
//   console.log(weatherData);
//   const tempfinal=weatherData.main.temp;
//   const weatherdes=weatherData.weather[0].description;
//   const icon=weatherData.weather[0].icon;
//   const imageUrl="http://openweathermap.org/img/wn/" + icon +"@2x.png"
//
//
//   console.log(tempfinal);
//   console.log(weatherdes);
//   res.write("<p>The weather is currently"+weatherdes+ "<p>");
//   res.write("<h1>The temp in Gurgaon is"+tempfinal+"degree Celcius.</h1>");
//   res.write("<img src=" + imageUrl +">");
//   res.send();
//   })
// });



app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
