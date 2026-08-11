# My Personal Website

A personal static website. It currently includes a landing page and a small weather app. This website will continue to be built out with more small projects that improve my life or are just something I'm interested in.

## Project Structure

```
index.html            # Home page
home.css               # Home page styles
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
- **OpenWeatherMap API** — provides current weather data for the weather app

## Weather App

The weather app (`/weather`) lets a user look up the current weather for a city. The client calls the OpenWeatherMap API directly using an API key set in `weather/script.js` (`OPENWEATHER_API_KEY`).

## Running Locally

Since this is a static site with no build step, just open `index.html` (or `weather/index.html`) in a browser, or serve the folder with any static file server.

Set your own OpenWeatherMap API key in `weather/script.js` before using the weather app.

## Linting

HTML, CSS, and JS are linted with `htmlhint`, `stylelint`, and `eslint`:

```bash
npm install
npm run lint
```

