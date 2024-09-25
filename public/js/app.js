var weatherApi = "/weather";
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const WeatherIcon = document.querySelector('.weatherIcon i')
const WeatherCondition = document.querySelector('.weatherCondition')
const tempElement = document.querySelector('.temprature span')
// const iconElement = document.querySelector('.icon span')
const locationElement = document.querySelector('.place')
const dateElement = document.querySelector('.date')

const currentDate = new Date();
const options = {month : "long"};
const monthName = currentDate.toLocaleString("en-US", options);
dateElement.textContent = currentDate.getDate() + ", " + monthName;

if("geolocation" in navigator) {
    locationElement.textContent = "Loading..."
    navigator.geolocation.getCurrentPosition(
        function (position){
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
            fetch(apiUrl).then((response) => response.json()).then((data) => {
                if(data && data.address && data.address.city){
                    const city = data.address.city
                    console.log(city);
                    showData(city)
                }
                else{
                    console.log("City Not Found");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        function(error){
            console.log(error.message);
        }
    )
}
else{
    console.log("Geolocation is not available on this browser.");
    
}

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(search.value);
    locationElement.textContent = "Loading..."
    WeatherIcon.className = "";
    tempElement.textContent = "";
    // iconElement.textContent = "";
    WeatherCondition.textContent = "";

    showData(search.value);
});

function showData(city){
    // console.log(city,"----------")
    getWeatherData(city, (result) => {
        // console.log(result.name,"[[")
        // console.log(`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,"---------");
        if(result.cod == 200){
            if(result.weather[0].description == "rain" || result.weather[0].description == "fog"){
                WeatherIcon.className = "wi wi-day-" + result.weather[0].description
            }
            else{
                WeatherIcon.className = "wi wi-day-cloudy"
            }
            WeatherIcon.className = "wi wi-day-cloudy"
            locationElement.textContent = result?.name
            // iconElement.textContent = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
            tempElement.textContent = (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176)
            WeatherCondition.textContent = result?.weather[0]?.description?.toUpperCase()
        }
        else{
            locationElement.textContent = "City not Found."
        }
    });
}

function getWeatherData(city, callback){
    const locationApi = weatherApi + "?address=" + city;
    fetch(locationApi).then((response) => {
        response.json().then((response) => {
            callback(response);
        });
    });
}

