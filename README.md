# My Personal Website

A personal website made up of a static landing page and a small collection of apps, served behind an nginx reverse-proxy gateway via Docker Compose. This website will continue to be built out with more small projects that improve my life or are just something I'm interested in.

## Project Structure

```
index.html             # Home page
home.css               # Home page styles
docker-compose.yml     # Orchestrates the gateway and app containers
gateway/
  Dockerfile
  nginx.conf            # Reverse proxy: serves the static site, routes /weather/ to the weather app
apps/
  weather/
    Dockerfile
    package.json
    server.js           # Express server; serves the client and proxies OpenWeatherMap API requests
    public/
      index.html         # Weather app markup
      script.js           # Weather app client-side logic
      styles.css           # Weather app styles
```

## Technologies Used

- **HTML/CSS/JavaScript** — no front-end framework or build step
- **Node.js / Express** — backend server for the weather app, proxies requests to OpenWeatherMap
- **Docker & Docker Compose** — containerizes the gateway and apps for local/production deployment
- **nginx** — reverse-proxy gateway routing requests to the static site and app containers
- **jQuery** — DOM manipulation in the weather app
- **Moment.js** — date formatting
- **Animate.css** & **Font Awesome** — UI animations and icons (loaded via CDN)
- **OpenWeatherMap API** — provides current weather data for the weather app

## Weather App

The weather app (`/weather`) lets a user look up the current weather for a city. The client calls the app's own `/api/weather` endpoint, which is handled by the Express server in `apps/weather/server.js`. The server holds the OpenWeatherMap API key (`OPENWEATHER_API_KEY`, set via a `.env` file) and proxies the request, so the key is never exposed to the browser.

## Running Locally

The site is designed to run via Docker Compose:

```bash
docker compose up --build
```

This builds the gateway and weather app containers and serves the site on `http://localhost`. Set `OPENWEATHER_API_KEY` in an `.env` file at `apps/weather/.env` before starting.

Alternatively, the weather app can be run standalone for development:

```bash
cd apps/weather
npm install
npm run dev
```

## Linting

HTML, CSS, and JS are linted with `htmlhint`, `stylelint`, and `eslint`:

```bash
npm install
npm run lint
```

