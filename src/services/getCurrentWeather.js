import axios from "axios";

export const getCurrentWeather = async (lat, lon) => {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const res = await axios.get(API_URL);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch weather data. Status: ${res.status}`);
    }
    const data = res.data;
    return data;
  } catch (err) {
    return err.message;
  }
};
