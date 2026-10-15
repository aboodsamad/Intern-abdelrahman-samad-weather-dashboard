export type WeatherData = {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; main: string }[];
};
