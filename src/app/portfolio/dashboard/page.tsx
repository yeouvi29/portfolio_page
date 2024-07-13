"use client";

import dynamic from "next/dynamic";

import { Container } from "@/app/components/common/Container/Container";

import BartSection from "./BartSection";
import WeatherSection from "./WeatherSection";
import ChartSection from "./ChartSection";
const AttractionSection = dynamic(() => import("./AttractionSection"));

const Page = () => {
  return (
    <Container>
      <h1>SF Dashboard</h1>
      <p>
        Discover everything you need to explore and enjoy the vibrant city of
        San Francisco. Our comprehensive dashboard offers a wealth of
        information to help you make the most of your visit.
      </p>

      <div className="rounded-2xl overflow-hidden">
        <img src="/assets/san_francisco_image.webp" className="h-full" />
      </div>
      <div className="w-[400px] ml-auto p-5"></div>
      <div className="flex gap-2 flex-col sm:flex-row items-center">
        <BartSection />
        <div className="sm:min-w-[420px]">
          <WeatherSection />
        </div>
      </div>
      <ChartSection />
     
      <AttractionSection />
    </Container>
  );
};
export default Page;
