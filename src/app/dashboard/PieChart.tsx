import { ArcElement, Tooltip, Legend, Chart, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { SF_VISITOR_STAY_PERCENTAGE } from "@/mockData";

Chart.register(ArcElement, Tooltip, Title, Legend, ChartDataLabels);

const data = {
  labels: SF_VISITOR_STAY_PERCENTAGE.labels,
  datasets: [
    {
      data: SF_VISITOR_STAY_PERCENTAGE.data,
      backgroundColor: ["#FF9999", "#66B3FF", "#99FF99", "#FFCC99", "#C2C2F0"],
    },
  ],
};

const options = {
  plugins: {
    title: { display: true, text: "Accommodation" },
    datalabels: {
      formatter: (value: any, context: any) => {
        const dataset = context.chart.data.datasets[0];
        const total = dataset.data.reduce(
          (acc: number, val: number) => acc + val,
          0
        );
        const percentage = ((value / total) * 100).toFixed(1);
        return percentage + "%";
      },
      color: "#fff",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          const dataset = tooltipItem.dataset;
          const total = dataset.data.reduce(
            (acc: number, val: number) => acc + val,
            0
          );
          const currentValue = dataset.data[tooltipItem.dataIndex];
          const percentage = ((currentValue / total) * 100).toFixed(1);
          return percentage + "%";
        },
      },
    },
  },
};
const PieChart = () => {
  return <Doughnut data={data} options={options} />;
};
export default PieChart;
