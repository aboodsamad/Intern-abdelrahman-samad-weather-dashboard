import { useState } from "react";
import type { WeatherData } from "../model/weatherData";
import { handleSubmit } from "./searchCity";

export function GetCity() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, cityName, setWeather, setError)}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter City Name"
        />
      </form>
      <h3>{weather?.name}</h3>
      {weather ? (
        <>
        <h3>
          {weather?.weather[0].main} & {weather?.weather[0].description}
        </h3>

        <h3>
          {weather?.main.humidity} & {weather?.main.temp}{" "}
        </h3>
        </>
      ) : <h3> {error}</h3>}
    </div>
  );
}
