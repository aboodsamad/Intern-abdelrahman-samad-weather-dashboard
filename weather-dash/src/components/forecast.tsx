import type { ForecastData } from "../model/weatherData";

export function Forecast({ forecast }: { forecast: ForecastData }) {
  return (
    <ul className="forecast">
      {forecast.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((item) => (
          <li key={item.dt_txt}>
            <span className="day">{dayName(item.dt_txt)}</span>
            <span className="ftemp">{Math.round(item.main.temp)}°</span>
            <span className="fdesc">{item.weather[0].main}</span>
          </li>
        ))}
    </ul>
  );
}


function dayName(dt: string) {
  return new Date(dt.replace(" ", "T")).toLocaleDateString("en-US", {
    weekday: "short",
  });
}
