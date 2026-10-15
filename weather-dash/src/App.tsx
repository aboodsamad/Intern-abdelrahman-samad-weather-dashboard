import { useEffect, useState } from "react";
import { getcurrentWeather } from "./service/weatherApi";
import type { WeatherData } from "./model/weatherData";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  useEffect(() => {
    getcurrentWeather("tripoli")
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <h1>Weather app</h1>
      {weather && (
        <>
          <h3>{weather.name}</h3>
          <h3>{weather.weather[0].description}</h3>
        </>
      )}
    </>
  );
}

export default App;
