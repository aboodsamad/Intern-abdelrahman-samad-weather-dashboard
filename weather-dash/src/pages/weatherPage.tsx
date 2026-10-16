import { useState } from "react";
import { getcurrentWeather, getcurrentForcast } from "../service/weatherApi";
import type { WeatherData, ForecastData } from "../model/weatherData";
import { ClipLoader } from "react-spinners";
import { Forecast } from "../components/forecast";

function skyClass(main?: string) {
  if (!main) return "idle";
  if (main === "Clear") return "clear";
  if (["Rain", "Drizzle", "Thunderstorm"].includes(main)) return "rain";
  return "clouds";
}

export function GetCity() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loadState, setLoadState] = useState(false);
  const [forecast, setforecast] = useState<ForecastData | null>(null);

  async function handleSubmit(e: { preventDefault: () => void }) {
    setforecast(null);
    e.preventDefault();
    setWeather(null);
    setError("");
    if (!cityName.trim()) {
      setError("Please Enter a city Name");
    } else {
      setLoadState(true);
      getcurrentForcast(cityName)
        .then((data) => setforecast(data))
        .catch((err) => setError(err.message));
      getcurrentWeather(cityName)
        .then((data) => {
          setWeather(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
        })
        .finally(() => setLoadState(false));
    }
  }
  const sky = skyClass(weather?.weather[0].main);
  return (
    <main className={`app ${sky}`}>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter City Name"
        />
        <button type="submit">Search</button>
      </form>
      {loadState && (
        <div className="status">
          <ClipLoader color="#fff" />
        </div>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {!weather && !error && !loadState && (
        <p className="hint">Search for a city to see its weather.</p>
      )}
      {weather && !loadState && (
        <section className="current">
          <h1 className="city">{weather.name}</h1>
          <p className="temp">{Math.round(weather.main.temp)}°</p>
          <p className="desc">{weather.weather[0].description}</p>
          <p className="meta">Humidity {weather.main.humidity}%</p>
        </section>
      )}
      {forecast && !loadState && <Forecast forecast={forecast} />}
    </main>
  );
}
