const { error } = require('console');
const { encode } = require('punycode')
const request = require('request');
const { callbackify } = require('util');

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "885dcb8b8dbde964831f4e0ed6d4bdaf"
}

const weatherData = (address, callback) => {
    const url = openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + openWeatherMap.SECRET_KEY;
    console.log(url);
    
    request({url, json: true}, (error, data) =>{
        if(error){
            callback(true, "Unable to fetch data, Please try again" + error);
        }
        callback(false, data?.body);
    })
}

module.exports = weatherData;