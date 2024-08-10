"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { PiPlusCircleBold, PiMinusCircleBold } from "react-icons/pi";

import DraggableImage from "../DraggableImage/DraggableImage";
import ModalButton from "../ModalButton/ModalButton";

const DynamicModal = dynamic(() => import("@/components/common/Modal/Modal"), {
  ssr: false,
});

const BartMapModal = ({ onClose }: { onClose: () => void }) => {
  const [scale, setScale] = useState(10);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <DynamicModal
      fullScreen={isFullScreen}
      header={
        <div className="flex">
          <ModalButton
            disabled={scale === 10}
            onClick={() => {
              if (scale === 10) {
                return;
              }
              setScale((prev) => prev - 1);
            }}
          >
            <PiMinusCircleBold
              className={clsx(
                "text-white",
                scale === 10 ? "text-white/50" : "text-white"
              )}
            />
          </ModalButton>
          <ModalButton
            disabled={scale === 15}
            onClick={() => {
              if (Number(scale) === 15) {
                return;
              }
              setScale((prev) => prev + 1);
            }}
          >
            <PiPlusCircleBold
              className={clsx(
                "text-white",
                scale === 15 ? "text-white/50" : "text-white"
              )}
            />
          </ModalButton>
          <ModalButton
            className="hidden sm:block"
            onClick={() => setIsFullScreen((prev) => !prev)}
          >
            {isFullScreen ? (
              <FiMinimize className="text-white" />
            ) : (
              <FiMaximize className="text-white" />
            )}
          </ModalButton>
        </div>
      }
      onClose={onClose}
      closeOnBackdropClick={false}
    >
      <div className="h-screen w-full sm:h-full relative">
        <DraggableImage src="/assets/bart_map.png" scale={scale / 10} />
      </div>
    </DynamicModal>
  );
};

export default BartMapModal;
