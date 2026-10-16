import type { WeatherData } from "../model/weatherData";

export function CurrentWeather({weather} : {weather: WeatherData}){
    return (
        <section className="current">
          <h1 className="city">{weather.name}</h1>
          <p className="temp">{Math.round(weather.main.temp)}°</p>
          <p className="desc">{weather.weather[0].description}</p>
          <p className="meta">Humidity {weather.main.humidity}%</p>
        </section>
    )
}