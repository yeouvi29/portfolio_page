"use client";

import { useEffect, useRef } from "react";
import {
  CategoryScale,
  LinearScale,
  Chart,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const VISITOR_VOLUME = [
  { year: 2019, day: 15.78, domestic: 7.48, international: 2.95 },
  { year: 2020, day: 8.91, domestic: 2.41, international: 0.5 },
  { year: 2021, day: 12.48, domestic: 3.98, international: 0.56 },
  { year: 2022, day: 14.77, domestic: 5.43, international: 1.74 },
];

const data = {
  labels: VISITOR_VOLUME.map((v) => v.year),
  datasets: [
    {
      label: "Day",
      data: VISITOR_VOLUME.map((v) => v.day),
      backgroundColor: "rgba(153, 102, 255, 0.3)",
    },
    {
      label: "Domestic",
      data: VISITOR_VOLUME.map((v) => v.domestic),
      backgroundColor: "rgba(255, 99, 132, 0.3)",
    },
    {
      label: "International",
      data: VISITOR_VOLUME.map((v) => v.international),
      backgroundColor: "rgba(255, 205, 86, 0.3)",
    },
  ],
};
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

const VisitorGraph = () => {
  return (
    <Bar
      data={data}
      options={{
        plugins: {
          legend: { display: true, position: "top" },
          title: { display: true, text: "Visitor Volume" },
        },
        responsive: true,
        scales: { y: { stacked: true }, x: { stacked: true } },
      }}
    />
  );
};

export default VisitorGraph;
