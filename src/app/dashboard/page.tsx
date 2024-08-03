"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Container } from "@/components/common/Container/Container";

import BartSection from "./BartSection";
import WeatherSection from "./WeatherSection";
import ChartSection from "./ChartSection";
import Spinner from "@/components/common/Spinner/Spinner";
const AttractionSection = dynamic(() => import("./AttractionSection"));

const Page = () => {
  return (
    <Container className="mx-0 px-0">
      <div className="mt-5 flex flex-col gap-5 text-gray-500 text-center xl:text-left">
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
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              <Spinner className="text-sf-orange" />
            </div>
          }
        >
          <ChartSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              <Spinner className="text-sf-orange" />
            </div>
          }
        >
          <AttractionSection />
        </Suspense>
      </div>
    </Container>
  );
};
export default Page;
