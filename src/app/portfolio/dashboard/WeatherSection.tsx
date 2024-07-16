"use client";

import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { toZonedTime, format as formatTz } from "date-fns-tz";

import { useGetWeather } from "@/app/api/graphql/hooks";
import Switch from "@/app/components/common/Swtich/Switch";
import Range from "@/app/components/common/Range/Range";
import Skeleton from "@/app/components/common/Skeleton/Skeleton";

const WeatherSection = () => {
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

  const formatDate = (dateString: string, formatString: string) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = parseISO(dateString);
    const zonedDate = toZonedTime(date, timeZone);
    const formattedDate = formatTz(zonedDate, formatString, { timeZone });
    return formattedDate;
  };
  // 원하는 포맷으로 변환합니다.

  return (
    <div>
      <h2 className="text-xl text-sf-blue">3-Day Weather</h2>
      <div className="w-[calc(100vw-40px)] min-w-max sm:w-auto p-5 bg-white rounded-2xl flex flex-col flex-grow max-w-[420px] border-solid border-2 border-sf-gray">
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
        <div className="flex-grow flex flex-col justify-between text-gray-600 gap-2">
          {data
            ? data?.weather?.map((weather) => (
                <div className=" flex gap-1 items-center" key={weather.date}>
                  <p className="w-[54px] text-sm text-center my-auto">
                    {formatDate(weather.date, "MMM/dd")}
                    <br />
                    <strong className="text-xl">
                      {formatDate(weather.date, "EEE")}
                    </strong>
                  </p>
                  <img
                    className="w-12 h-min md:w-14  rounded-full"
                    src={weather.condition.icon}
                  />
                  <div className="flex flex-grow items-center gap-1">
                    <p className="min-w-11 sm:w-12 text-sm">
                      {isFahrenheit
                        ? Number(weather.temp.min.f).toFixed(1) + "°F"
                        : Number(weather.temp.min.c).toFixed(1) + "°C"}
                    </p>
                    <div className="flex-grow min-w-[80px]">
                      <Range
                        animate
                        value={{
                          max: Number(weather.temp.max.f),
                          min: Number(weather.temp.min.f),
                        }}
                        range={{ max, min }}
                      />
                    </div>
                    <p className="min-w-11 sm:w-12 text-sm ml-1">
                      {isFahrenheit
                        ? Number(weather.temp.max.f).toFixed(1) + "°F"
                        : Number(weather.temp.max.c).toFixed(1) + "°C"}
                    </p>
                  </div>
                </div>
              ))
            : loading
            ? new Array(3).fill("").map((_, i) => (
                <div key={i} className="flex justify-start gap-1 items-center">
                  <span className="flex px-0.5 flex-col gap-1">
                    <Skeleton height={8} className="w-[42px] sm:w-[50px]" />
                    <Skeleton height={12} className="w-[42px] sm:w-[50px]" />
                  </span>
                  <Skeleton className="w-[42px] min-w-[42px] h-[42px] sm:w-[56px] sm:min-w-[56px] sm:h-[56px]" />
                  <Skeleton
                    width="100%"
                    className="mx-2 flex-grow h-3 sm:h-4"
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default WeatherSection;
