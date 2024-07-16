"use client";

import { SF_VISITOR_VOLUME } from "@/mockData";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
import { useBreakpoint } from "@/hooks/useBreakpoint";

const data = {
  labels: SF_VISITOR_VOLUME.map((v) => v.year),
  datasets: [
    {
      label: "Day",
      data: SF_VISITOR_VOLUME.map((v) => v.day),
      backgroundColor: "rgba(153, 102, 255, 0.3)",
    },
    {
      label: "Domestic",
      data: SF_VISITOR_VOLUME.map((v) => v.domestic),
      backgroundColor: "rgba(255, 99, 132, 0.3)",
    },
    {
      label: "International",
      data: SF_VISITOR_VOLUME.map((v) => v.international),
      backgroundColor: "rgba(255, 205, 86, 0.3)",
    },
  ],
};

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
  ChartDataLabels
);

const BarChart = () => {
  const { isUpOrEqual } = useBreakpoint();

  const options = {
    plugins: {
      title: { display: true, text: "Visitor Volume" },
      datalabels: {
        formatter: (value: any) => {
          return isUpOrEqual("xl") ? value + "M" : "";
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return context.dataset.label + ": " + context.raw + "M";
          },
        },
      },
    },
    responsive: true,
    scales: { y: { stacked: true }, x: { stacked: true } },
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
