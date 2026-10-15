import type { WeatherData } from "../model/weatherData";
import { getcurrentWeather } from "../service/weatherApi";

export async function handleSubmit(
  e: { preventDefault: () => void },
  cityName: string,
  setWeather: (w: WeatherData | null) => void,
  setError: (msg: string) => void,
) {
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
  setWeather(null);
  setError("");
}
