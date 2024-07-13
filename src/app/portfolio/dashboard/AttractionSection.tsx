"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";
import clsx from "clsx";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";

import { SF_ATTRACTIONS } from "@/mockData";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SwiperButton = ({ prev = true }: { prev?: boolean }) => {
  const swiper = useSwiper();
  return (
    <button
      className={clsx(
        prev ? "swiper-button-prev" : "swiper-button-next",

        " w-[80px] h-[160px] !text-sf-red text-3xl active:animate-ping"
      )}
      disabled={prev ? swiper?.isBeginning : swiper?.isEnd}
      onClick={() => {
        if (prev) {
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
  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1WEZd9p0je6_1A1aFcMoh57cZn3-zZpI&ehbc=2E312F"
          width="100%"
          height="380"
        ></iframe>
        <div>
          <h3>Attractions</h3>

          <p>
            San Francisco, renowned for its iconic landmarks and vibrant
            culture, offers a plethora of attractions for visitors. From the
            majestic Golden Gate Bridge to the historic Alcatraz Island, the
            city boasts a rich tapestry of experiences. Whether you're exploring
            bustling Fisherman's Wharf, riding the legendary cable cars, or
            admiring the scenic views from Twin Peaks, San Francisco promises
            unforgettable adventures at every turn. Discover the top 10 must-see
            attractions that make this city a beloved destination for travelers
            from around the world.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Swiper
          initialSlide={0}
          modules={[Pagination, Mousewheel, Navigation, Keyboard]}
          onSwiper={(swiper) => ((window as any).swiper = swiper)}
          slidesPerView={3.3}
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
            <SwiperSlide key={index}>
              <div
                className={clsx(
                  "bg-sf-gray/20 p-2 rounded-md mb-10",
                  index === 0 && "ml-[40px]",
                  index === arr.length - 1 && "mr-[40px]"
                )}
              >
                <img
                  className="rounded-md"
                  src={attraction.image}
                  alt={attraction.title}
                />
                <div>
                  <h3>{attraction.title}</h3>
                  <p>{attraction.description}</p>
                  <p>Rating: {attraction.rating}</p>
                  <p>
                    Estimated Visit Duration:{" "}
                    {attraction.estimated_visit_duration}
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
  );
};
export default AttractionSection;
