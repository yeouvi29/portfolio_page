"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useGetWeather } from "@/app/api/graphql/hooks";
import Switch from "@/app/components/common/Swtich/Switch";
import Range from "@/app/components/common/Range/Range";

const Page = () => {
  const { data, loading, error } = useGetWeather();
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [max, min] = useMemo(() => {
    if (data && data.weather) {
      const max = Math.max(
        ...data.weather.map((weather) => Number(weather.temp.max.f))
      );
      const min = Math.min(
        ...data.weather.map((weather) => Number(weather.temp.min.f))
      );
      return [max, min];
    }
    return [0, 0];
  }, [data]);
  return (
    <div>
      <h1>SF Dashboard</h1>
      <div className="p-5 bg-white rounded-2xl flex flex-col">
        <h3>Weather Forecast</h3>
        <div className="self-end">
          <Switch
            defaultChecked={true}
            leftText={
              <span className="text-xs h-min m-auto font-semibold text-gray-500">
                °C
              </span>
            }
            onChange={setIsFahrenheit}
            rightText={
              <span className="text-xs h-min m-auto font-semibold text-gray-500">
                °F
              </span>
            }
          />
        </div>
        <div className="flex flex-col justify-between">
          {data
            ? data?.weather?.map((weather) => (
                <div className="flex" key={weather.date}>
                  <div className="text-center my-auto">
                    {format(weather.date, "MMM/dd")}
                    <br />
                    <strong className="text-xl">
                      {format(weather.date, "EEE")}
                    </strong>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-14 rounded-full"
                      src={weather.condition.icon}
                    />
                    <p className="text-sm text-gray-600">
                      {weather.condition.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="w-[50px]">
                      {isFahrenheit
                        ? Number(weather.temp.min.f).toFixed(1) + "°F"
                        : Number(weather.temp.min.c).toFixed(1) + "°C"}
                    </p>
                    <div style={{ width: 200 }}>
                      <Range
                        animate
                        value={{
                          max: Number(weather.temp.max.f),
                          min: Number(weather.temp.min.f),
                        }}
                        range={{ max, min }}
                      />
                    </div>
                    <p className="w-[50px]">
                      {isFahrenheit
                        ? Number(weather.temp.max.f).toFixed(1) + "°F"
                        : Number(weather.temp.max.c).toFixed(1) + "°C"}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default Page;
