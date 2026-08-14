// TODO: 
// A multi-day weather forecast.
// Automatic weather detection based on the user's location.
// Storing and displaying previous searches using local storage.

$(document).ready(function () {
	weatherFn('Somerville'); // Set Somerville as the initial city
});

async function weatherFn(cName) {
	const url = `api/weather?city=${encodeURIComponent(cName)}`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) {
	$('#city-name').text(data.name);
	$('#date').text(moment().
		format('MMMM Do YYYY, h:mm:ss a')); // Corrected date format to include year
	$('#temperature').
		html(`${Math.round(data.main.temp)}°F`); // Rounded temperature
	let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
	$('#weather-icon').attr('src', iconUrl);
	$('#description').
		text(data.weather[0].description);
	$('#wind-speed').
		html(`Wind Speed: ${data.wind.speed} mph`);
    $('#city-input-btn').on('click', function () {
    let cityName = $('#city-input').val();
    if (cityName) {
        weatherFn(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

	$('#weather-info').fadeIn();
}
