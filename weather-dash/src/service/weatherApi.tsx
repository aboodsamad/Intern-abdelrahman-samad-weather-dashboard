const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getcurrentWeather(city: any){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);
    if(!res.ok) throw new Error("City not Found");
    return await res.json();
}

export async function getcurrentForcast(city: any){
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);
    if(!res.ok) throw new Error("City not Found");
    return await res.json();
}