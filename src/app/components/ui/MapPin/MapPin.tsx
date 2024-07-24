"use client";
import { ReactNode } from "react";

const MapPin = ({
  background,
  isActive = true,
  children,
}: {
  background: string;
  isActive: boolean;
  children: ReactNode;
}) => {
  return (
    <div className="relative rounded-full">
      <div
        className="absolute rounded-full w-full h-full opacity-75"
        style={{
          backgroundColor: background,
          animation: isActive ? "ping 1.5s infinite" : "none",
        }}
      />
      <div
        className="relative rounded-full text-white text-lg p-1"
        style={{
          backgroundColor: background,
          border: "1px solid white",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MapPin;
