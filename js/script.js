// window.addEventListener('load', () => {
//     // setting the longtitude and latitude
//     let long;
//     let lat;
//     let temperatureDescription = document.querySelector('.temperature-description');
//     let temperatureDegree = document.querySelector('.temperature-degree');
//     let locationTimezone = document.querySelector('.location-timezone');
//     let imgIcon = document.querySelector('.icon');
//     let degreeSection = document.querySelector('.degree-section')
//     let temperatureSpan = document.querySelector('.degree-section span')

//     //this is to ask/check for user location
//     if(navigator.geolocation) {

//         navigator.geolocation.getCurrentPosition(position => {
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

//             console.log(long, lat);

//             const proxy = 'https://cors-anywhere.herokuapp.com/';
//             const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=49a88a1645a1f04ded3baa4062fe8e9c&units=imperial`;
            
            
//             fetch(api).then(response => {
//                 return response.json();
//             }).then(data => {
//                 console.log(data);
//                 const {temp} = data.main;  //instead of data.main.temp
//                 const {description, icon} = data.weather[0];
//                 //set dom element from api
//                 console.log(temp, description);
                
//                 temperatureDegree.innerHTML = temp;
//                 temperatureDescription.innerHTML = description;
//                 locationTimezone.innerHTML = data.name;
                
//                 let iconurl = `http://openweathermap.org/img/w/${icon}.png`;
//                 //$('#wicon').attr('src', iconurl);
//                 imgIcon.setAttribute('src', iconurl);

//                 //formula for celsius
//                 let celsius = (temp - 32) * (5 / 9);

//                 //change temp to celsius / fahrenheit
//                 degreeSection.addEventListener('click', () => {
//                     if(temperatureSpan.textContent == "F"){
//                         temperatureSpan.textContent = "C";
//                         temperatureDegree.textContent = Math.floor(celsius);
//                     } else {
//                         temperatureSpan.textContent = "F";
//                         temperatureDegree.innerHTML = temp;
//                     }
//                 })
//             });

            
//         });
        
//      } 
//      else {
//         temperatureSpan.textContent = "allow location access";
//         temperatureDegree.textContent = Math.floor(celsius);
//      }

//     // function setIcons (icon, iconId) {
//     //     const skycons = new Skycons({"color": "pink"});
//         // const currentIcon = icon.replace(/-/g, "_").toUpperCase();
//         // skycons.play();
//         // return skycons.set(iconId, Skycons[currentIcon]);
//     // }
// });


const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const locationCountry = document.querySelector('.location-country');
const imgIcon = document.querySelector('.icon');
const degreeSection = document.querySelector('.degree-section');
const temperatureSpan = document.querySelector('.degree-section span');
const degBtn = document.querySelector(".deg-btn");

const searchInput = document.querySelector("#search");
const searchSubmit = document.querySelector(".search-submit");


function displayWeather(){
    console.log(this.value);
    // api used
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'api.openweathermap.org/data/2.5/weather?q=';
    let city = this.value;
    const apiKey = '&appid=49a88a1645a1f04ded3baa4062fe8e9c';
    const units = '&units=imperial';
    const api = `${proxy}${url}${city}${apiKey}${units}`;

    // fetch data from api

        fetch(api).then(response => response.json())
            .then(data => {
                console.log(data);
                const {temp} = data.main;  //instead of data.main.temp
                const {description, icon} = data.weather[0];
                const {country} = data.sys;
                //set dom element from api
                console.log(temp, description);

                temperatureDegree.innerHTML = temp;
                temperatureDescription.innerHTML = description;
                locationTimezone.innerHTML = data.name;
                locationCountry.innerHTML = country;
                let iconurl = `http://openweathermap.org/img/w/${icon}.png`;
                //set icon in DOM
                imgIcon.setAttribute('src', iconurl);
                // //formula for celsius
                 let celsius = (temp - 32) * (5 / 9);

                //change temp to celsius / fahrenheit
                degBtn.addEventListener('click', () => {
                    if(temperatureSpan.textContent == "F"){
                                temperatureSpan.textContent = "C";
                                degBtn.textContent = "to Fahrenheit";
                                temperatureDegree.textContent = Math.floor(celsius);
                            } else {
                                temperatureSpan.textContent = "F";
                                degBtn.textContent = "to Celsius";
                                temperatureDegree.innerHTML = temp;
                            }
                });
            });
};

searchInput.addEventListener('change', displayWeather);
searchSubmit.addEventListener('submit', displayWeather);