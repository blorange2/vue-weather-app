# Weather App

This project is a weather app that uses Vue 3 and Tailwind, as well as Vite as a build tool. It allows you to search for a location and see the current weather as well as a seven day forecast. You can also add locations to your dashboard for quicker access.

## Features

-   Location search powered by the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)
-   Location preview with current weather and seven day forecast powered by the [OpenWeather API](https://openweathermap.org/api)
-   The ability to save locations to your dashboard using local storage as well as removing locations

## Run Locally

In order to use this application, before anything else, be sure to create an account for both the MapBox API and the OpenWeather API. Note that for some reason I had to wait a couple hours before I could use my OpenWeather API key.

Anyway, asides from the above the steps are as follows:

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm dev
```

## Acknowledgements

This app was built following a Youtube video series by [John Komarnicki](https://www.youtube.com/@JohnKomarnicki).

-   [Weather App Build](https://www.youtube.com/watch?v=gUsBaB5ViAo&t=3s)
