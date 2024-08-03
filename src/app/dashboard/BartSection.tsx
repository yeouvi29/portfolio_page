"use client";

import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import { LuSearch } from "react-icons/lu";
import BartMapModal from "@/components/ui/BartMapModal/BartMapModal";

const BartSection = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="flex flex-col items-center xl:flex-row xl:items-start">
        <div className="mr-2">
          <h2 className="text-3xl text-sf-blue">Bart Map</h2>
          <p>
            Navigate the city effortlessly with our detailed Bay Area Rapid
            Transit (BART) map, ensuring you reach your destinations with ease.
          </p>
        </div>
        <motion.div
          className="w-[276px] xl:min-w-[276px] aspect-square rounded-2xl flex justify-center bg-[url('/assets/bart_map.png')] bg-cover bg-blend-overlay bg-center cursor-pointer"
          initial={{
            backgroundSize: "100%",
            backgroundColor: "rgb(107 114 128/ 0.5)",
          }}
          onClick={() => setShowModal(true)}
          whileHover={{
            backgroundSize: "140%",
            backgroundColor: "rgb(107 114 128 / 0.1)",
            transition: { duration: 0.25 },
          }}
        >
          <LuSearch className="text-white text-4xl m-auto text-center cursor-pointer" />
        </motion.div>
      </div>

      {showModal && <BartMapModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
export default BartSection;
