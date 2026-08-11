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

## Linting

HTML, CSS, and JS are linted with `htmlhint`, `stylelint`, and `eslint`:

```bash
npm install
npm run lint
```

## CI/CD

Every push and pull request runs the `CI/CD` workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)):

1. **lint** — installs dependencies and runs `npm run lint`.
2. **deploy** — if lint passes, deploys to Netlify via `nwtgck/actions-netlify`:
   - Pushes to `main` trigger a **production** deploy.
   - Pull requests get a **preview** deploy, with the preview URL posted as a PR comment.

Required GitHub Actions secrets (Settings → Secrets and variables → Actions):

| Secret | Purpose |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token used to authenticate deploys |
| `NETLIFY_SITE_ID` | Target Netlify site ID |

`OPENWEATHER_API_KEY` is **not** a GitHub secret — it's only needed at runtime by the deployed function, so it's set in the Netlify site's own environment variables (Site settings → Environment variables).
