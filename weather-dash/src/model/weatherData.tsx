export type WeatherData = {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; main: string }[];
  sys : {country : string};
};

export type ForecastData = {
  list: {
    dt_txt: string;
    main: { temp: number; humidity: number };
    weather: { main: string; description: string }[];
  }[];
};