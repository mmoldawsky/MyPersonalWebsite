# My Personal Website

A personal website built as a static site and deployed on [Netlify](https://www.netlify.com/). It currently includes a landing page and a small weather app. This website will continue to be built out with more small projects that improve my life or are just something I'm interested in.

## Project Structure

```
index.html            # Home page
home.css               # Home page styles
netlify.toml           # Netlify build/redirect configuration
netlify/
  functions/
    weather.js         # Serverless function that proxies OpenWeatherMap requests
weather/
  index.html           # Weather app markup
  script.js            # Weather app client-side logic
  styles.css           # Weather app styles
```

## Technologies Used

- **HTML/CSS/JavaScript** — plain, no framework or build step
- **jQuery** — DOM manipulation in the weather app
- **Moment.js** — date formatting
- **Animate.css** & **Font Awesome** — UI animations and icons (loaded via CDN)
- **Netlify** — static hosting, redirects, and serverless functions
- **Netlify Functions** — a Node.js serverless function (`netlify/functions/weather.js`) that proxies requests to the [OpenWeatherMap API](https://openweathermap.org/api), keeping the API key server-side
- **OpenWeatherMap API** — provides current weather data for the weather app

## Weather App

The weather app (`/weather`) lets a user look up the current weather for a city. The client calls `/api/weather?q=<city>`, which Netlify redirects (see `netlify.toml`) to the `weather` serverless function. That function attaches the `OPENWEATHER_API_KEY` environment variable and forwards the request to OpenWeatherMap, so the key is never exposed in the browser.

## Running Locally

Since this is a static site with a Netlify Function, use the [Netlify CLI](https://docs.netlify.com/cli/get-started/) to run it locally with functions support:

```bash
npm install -g netlify-cli
netlify dev
```

Set the `OPENWEATHER_API_KEY` environment variable (e.g. in a `.env` file or your Netlify site settings) before running the weather function.
