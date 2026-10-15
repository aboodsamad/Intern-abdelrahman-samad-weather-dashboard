import { useState } from "react";
import { getcurrentWeather } from "../service/weatherApi";
import type { WeatherData } from "../model/weatherData";

export function GetCity() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    getcurrentWeather(cityName)
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter City Name"
        />
        <button onClick={handleSubmit}>send</button>
      </form>
      <h3>{weather?.name}</h3>
      <h3>{weather?.weather[0].main} & {weather?.weather[0].description}</h3>
    </div>
  );
}
