"use client";

import dynamic from "next/dynamic";
import BartSection from "./BartSection";
import WeatherSection from "./WeatherSection";

const DynamicGraph = dynamic(() => import("./GraphSection"), { ssr: false });
const Page = () => {
  return (
    <div>
      <h1>SF Dashboard</h1>
      <div className="flex gap-2 flex-col sm:flex-row items-center">
        <div className="rounded-2xl overflow-hidden w-[min(100%,420px)] sm:w-[clamp(200px,100%,276px)] aspect-square ">
          <img src="/assets/san_francisco_image.webp" className="h-full" />
        </div>
        <WeatherSection />
      </div>

      <BartSection />
      <DynamicGraph />
    </div>
  );
};
export default Page;
