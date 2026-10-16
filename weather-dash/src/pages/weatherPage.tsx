import { useState } from "react";
import { getcurrentWeather } from "../service/weatherApi";
import type { WeatherData } from "../model/weatherData";
import { ClipLoader } from "react-spinners";

export function GetCity() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loadState, setLoadState] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    setLoadState(true);
    e.preventDefault();
    getcurrentWeather(cityName)
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
    setLoadState(false);
    setWeather(null);
    setError("");
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
      {loadState && (
        <>
          <br /> <ClipLoader />
        </>
      )}
      {error && <h3>{error}</h3>}
      {weather && !loadState && (
        <>
          <h3>{weather.name}</h3>
          <h3>
            {weather.weather[0].main} & {weather.weather[0].description}
          </h3>
          <h3>
            {weather.main.humidity} & {weather.main.temp}
          </h3>
        </>
      )}
    </div>
  );
}
