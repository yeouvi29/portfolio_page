import { connectToDatabase } from "@/lib/mongodb";

const { db } = await connectToDatabase();

export const getWeather = async () => {
  const weather = await db
    ?.collection("weather")
    .findOne({}, { sort: { "location.localtime": -1 } });

  const weatherForecast = weather?.forecast?.forecastday.map((day: any) => {
    return {
      date: day.date,
      temp: {
        avg: { c: day.day.avgtemp_c, f: day.day.avgtemp_f },
        max: { c: day.day.maxtemp_c, f: day.day.maxtemp_f },
        min: { c: day.day.mintemp_c, f: day.day.mintemp_f },
      },
      condition: day.day.condition,
    };
  });

  return weatherForecast;
};
