"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Container } from "@/components/common/Container/Container";
import Spinner from "@/components/common/Spinner/Spinner";

import BartSection from "./BartSection";
import WeatherSection from "./WeatherSection";
import ChartSection from "./ChartSection";
const AttractionSection = dynamic(() => import("./AttractionSection"));

const Page = () => {
  return (
    <div className="mt-[45.5px] w-full p-5 md:min-w-[calc(100%-250px)] md:mt-0">
      <Container className="!mx-0 !px-0 mb-20">
        <div
          data-no-x-scroll="true"
          className="mt-5 flex flex-col gap-5 text-gray-500 text-center xl:text-left"
        >
          <h1 className="text-sf-orange">SF Dashboard</h1>
          <p className="text-lg">
            Discover everything you need to explore and enjoy the vibrant city
            of San Francisco. Our comprehensive dashboard offers a wealth of
            information to help you make the most of your visit.
          </p>

          <div className="rounded-2xl overflow-hidden">
            <img
              src="/assets/san_francisco.webp"
              className="w-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-4 items-center mt-5 min-[1248px]:flex-row">
            <BartSection />
            <div className="hidden min-[1248px]:block h-[276px] w-0.5 bg-gray-200" />
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
    </div>
  );
};
export default Page;
