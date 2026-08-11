// Server-side proxy so the OpenWeatherMap API key never reaches the browser.
exports.handler = async function (event) {
	const city = event.queryStringParameters && event.queryStringParameters.q;
	if (!city) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing city parameter' }),
		};
	}
    console.log(process.env.OPENWEATHER_API_KEY); // Log the API key to verify it's being read correctly
	const apiKey = process.env.OPENWEATHER_API_KEY;
	const apiUrl =
		`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

	try {
		const res = await fetch(apiUrl);
		const data = await res.json();
		return {
			statusCode: res.status,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Error fetching weather data' }),
		};
	}
};
