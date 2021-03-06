// jshint esversion:6
const express = require('express');
const bodyParser=require('body-parser');
const request=require('request');
const requests = require('requests');
const https=require("https");
const mongoose = require('mongoose');
const ejs=require('ejs');
const api = require('novelcovid');

// you can choose which URL to use, this will not change the behaviour of the API


const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
api.settings({
    baseUrl: 'https://disease.sh' | 'https://api.caw.sh' | 'https://corona.lmao.ninja'
})
mongoose.connect("mongodb://localhost:27017/coronausersDB", {useNewUrlParser: true ,useUnifiedTopology: true});

app.get("/",function(req,res){
const url="https://api.covid19api.com/summary";

request({
url:"https://api.covid19api.com/summary",
method:'GET',
json:true},function(err,response){
  var Total=response.body;
  var confirmed=Total.Global.TotalConfirmed;
  // console.log(confirmed);
  var recovered=Total.Global.TotalRecovered;
  var deaths=Total.Global.TotalDeaths;
  var nconfirmed=Total.Global.NewConfirmed;
  t = new Date();
         yesterday = new Date(t.setDate(t.getDate() - 14));
             console.log(yesterday.toISOString().substring(0,10));

  // console.log(nconfirmed);
  var nrecovered=Total.Global.NewRecovered;
  console.log(nrecovered);
  var ndeaths=Total.Global.NewDeaths;
  res.render("main", {TConfirmed: confirmed,TRecovered: recovered, TDeaths: deaths, Newconfirmed:nconfirmed,Newrecovered:nrecovered,Newdeaths:ndeaths});
}
);

// https.get(url,function(response){
//
//   [response].on("data",function(data){
// // console.log(data);
// // var Total=[];
//   var  Total=JSON.parse(data);
//    console.log(Total.Global);
// });
// });
});

app.post("/",function(req,res){
var s=req.body.search;

// var flagUrl;
var today_cases;
var today_recovered;
var total_deaths;
var total_recovered;
var continent;
var country_population;
var total_tests;
var active_million;
var test_million;

  api.countries({country:s}).then((element)=>{
    flagUrl=element.countryInfo.flag;
  });

   let today = new Date().toISOString().substring(0, 10);
    t = new Date();
      yesterday = new Date(t.setDate(t.getDate() - 45));

  var Total;
  var Confirm=[];
  var D=[];
  var De=[];
  var Ac=[];
  var L;
    request({
    url:"https://api.covid19api.com/country/"+s+"?from=2020-05-10T00:00:00Z&to="+today+"T00:00:00Z",
    method:'GET',
    json:true},function(err,response){
   Total=response.body;
               Total.forEach(function(item){
                D.push(item.Date);

             Confirm.push(item.Confirmed);
             De.push(item.Deaths);
             Ac.push(item.Active);
                });
  L=D.length;
  res.render('index',{Confirmed:Confirm,Dates:L,Deaths:De,Active:Ac});
    });
});



app.listen(3000,function(){
console.log("its working");

})
