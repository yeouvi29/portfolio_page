"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Container } from "@/app/components/common/Container/Container";

import BartSection from "./BartSection";
import WeatherSection from "./WeatherSection";
import ChartSection from "./ChartSection";
const AttractionSection = dynamic(() => import("./AttractionSection"));

const Page = () => {
  return (
    <Container>
      <div className="flex flex-col gap-5 text-sf-gray text-center xl:text-left">
        <h1 className="text-sf-orange">SF Dashboard</h1>
        <p className="text-lg">
          Discover everything you need to explore and enjoy the vibrant city of
          San Francisco. Our comprehensive dashboard offers a wealth of
          information to help you make the most of your visit.
        </p>

        <div className="rounded-2xl overflow-hidden">
          <img src="/assets/san_francisco_image.webp" className="h-full" />
        </div>
        <div className="flex gap-2 flex-col min-[1248px]:flex-row items-center">
          <BartSection />
          <div className="sm:min-w-[420px]">
            <WeatherSection />
          </div>
        </div>
        <Suspense fallback={<p>loading...</p>}>
          <ChartSection />
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>
          <AttractionSection />
        </Suspense>
      </div>
    </Container>
  );
};
export default Page;
