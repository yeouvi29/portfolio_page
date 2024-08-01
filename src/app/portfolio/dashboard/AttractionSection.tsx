"use client";

import { CSSProperties, Fragment, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";
import clsx from "clsx";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";

import { AttractionDataType, SF_ATTRACTIONS } from "@/mockData";
import AttractionDetailModal from "@/app/components/ui/AttractionDetailModal/AttractionDetailModal";

const Map = dynamic(() => import("./Map"), { ssr: false });
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import dynamic from "next/dynamic";

const SwiperButton = ({ prev = true }: { prev?: boolean }) => {
  const swiper = useSwiper();
  return (
    <button
      className={clsx(
        prev ? "swiper-button-prev" : "swiper-button-next",
        "w-[80px] h-[160px] cursor-pointer !text-sf-orange text-3xl bg-white/30 hover:bg-white/60 active:animate-ping"
      )}
      disabled={prev ? swiper?.isBeginning : swiper?.isEnd}
      onClick={(e) => {
        if (prev) {
          e.stopPropagation();
          swiper?.slidePrev();
        } else {
          swiper?.slideNext();
        }
      }}
    >
      {prev ? <RiArrowLeftWideLine /> : <RiArrowRightWideLine />}
    </button>
  );
};
const AttractionSection = () => {
  const [selectedAttraction, setSelectedAttraction] =
    useState<AttractionDataType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Fragment>
      <div className="attractionSection">
        <div className="flex flex-col-reverse items-center xl:grid xl:grid-cols-2 gap-5 xl:items-start">
          <Map selectedAttraction={SF_ATTRACTIONS[activeSlide].title} />
          <div>
            <h2 className="text-3xl text-sf-blue">Attractions</h2>
            <p className="mt-2">
              San Francisco, renowned for its iconic landmarks and vibrant
              culture, offers a plethora of attractions for visitors. From the
              majestic Golden Gate Bridge to the historic Alcatraz Island, the
              city boasts a rich tapestry of experiences. Whether you&apos;re
              exploring bustling Fisherman&apos;s Wharf, riding the legendary
              cable cars, or admiring the scenic views from Twin Peaks, San
              Francisco promises unforgettable adventures at every turn.
              Discover the top 10 must-see attractions that make this city a
              beloved destination for travelers from around the world.
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden">
          <Swiper
            initialSlide={0}
            modules={[Pagination, Mousewheel, Navigation, Keyboard]}
            onSwiper={(swiper) => ((window as any).swiper = swiper)}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.3,
              },
              1280: {
                slidesPerView: 3.3,
              },
            }}
            keyboard={{ enabled: true }}
            threshold={2}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.1,
              releaseOnEdges: true,
            }}
            pagination={{ clickable: true }}
          >
            {SF_ATTRACTIONS.map((attraction, index, arr) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  setSelectedAttraction(attraction);
                }}
              >
                <div className={clsx("bg-gray-300/20 p-2 rounded-md mb-10")}>
                  <img
                    className="rounded-md"
                    src={attraction.image}
                    alt={attraction.title}
                  />
                  <div>
                    <h3 className="text-sf-orange">{attraction.title}</h3>
                    <div>
                      <p
                        className="text-gray-500 text-ellipsis overflow-hidden line-clamp-3"
                        style={
                          {
                            display: "-webkit-box",
                            "-webkit-box-orient": "vertical",
                          } as CSSProperties
                        }
                      >
                        {attraction.description}
                      </p>
                    </div>
                    <p className="text-gray-500">Rating: {attraction.rating}</p>
                    <p className="text-gray-500">
                      Est. Duration: {attraction.estimated_visit_duration}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <SwiperButton prev />
            <SwiperButton prev={false} />
          </Swiper>
        </div>
      </div>
      {selectedAttraction && (
        <AttractionDetailModal
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      )}
    </Fragment>
  );
};
export default AttractionSection;
