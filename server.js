// ============== Packages ==============================

const express = require('express');
const cors = require('cors'); // just kinda works and we need it
// If this line of code comes, delete it const { response } = require('express');
require('dotenv').config(); // read the `.env` file's saved env variables AFTER reading the terminal's real env's variables


// ============== App ===================================

const app = express(); // express() will return a fully ready to run server object
app.use(cors()); // enables local processes to talk to the server // Cross Origin Resource Sharing

const PORT = process.env.PORT || 3434; // process.env is boilerplace the variable name is potato



// ============== Routes ================================
const locationData = require('./data/location.json');
const weatherData = require('./data/weather.json');

  app.get('/location', locationCallBack);
    function locationCallBack(req, res){
      let locationOne = new Location(locationData, req.query);
      res.send(locationOne);
    }
    
  // app.get('/movies', (req, res, next)=> {
  //   console.log('moviesCallBack');
  //   res.send({});
  // });
  app.get('/weather', weatherCallBack);
    function weatherCallBack(req, res){
      let weeklyForecast = new getForecast(weatherData);
      res.send(weeklyForecast);
    }

  function getForecast(weatherData){
    let weeklyForecast = [];
      // console.log(weatherData.data[0].weather.description);
      for (let i = 0; i < weatherData.data.length; i++){
        let description = weatherData.data[i].weather.description;
        let time = weatherData.data[i].datetime;
        weeklyForecast.push(new Weather(description, time));
        console.log('description' + description);
      }
      // console.log(weeklyForecast);
      return weeklyForecast;
  }
  // app.get('/yelp', (req, res, next)=> {
  //   console.log('yelpCallBack');
  //   res.send({});
  // });
  // app.get('/parks', (req, res, next)=> {
  //   console.log('parksCallBack');
  //   res.send({});
  // });

  function Location(dataFromFile, cityName){
    let city = Object.entries(cityName)[0][1];
    console.log(city);
    this.searchQuery = city;
    this.formatted_query = dataFromFile[0].display_name;
    this.latitude = dataFromFile[0].lat;
    this.longitude = dataFromFile[0].lon;
  }

  function Weather(description, time){
    this.description = description;
    this.time = time;
  }


// ============== Initialization ========================

// I can visit this server at http://localhost:3434
app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`)); // this is what starts the server
