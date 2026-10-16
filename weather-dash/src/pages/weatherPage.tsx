import { useState } from "react";
import { getcurrentWeather, getcurrentForcast } from "../service/weatherApi";
import type { WeatherData, ForecastData } from "../model/weatherData";
import { ClipLoader } from "react-spinners";
import { Forecast } from "../components/forecast";
import { CurrentWeather } from "../components/currentWeather";
import { SearchBar } from "../components/searchBar";

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
      <SearchBar
        handleSubmit={handleSubmit}
        setCityName={setCityName}
        cityName={cityName}
      />
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
      {weather && !loadState && <CurrentWeather weather={weather} />}
      {forecast && !loadState && <Forecast forecast={forecast} />}
    </main>
  );
}
