import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("./BarChart"), { ssr: false });
const PieChart = dynamic(() => import("./PieChart"), {
  ssr: false,
});

const ChartSection = () => {
  return (
    <div>
      <h2 className="text-3xl text-sf-blue">Tourism Data</h2>
      <div className="grid grid-cols-[60%_40%]">
        <div>
          <BarChart />
        </div>
        <div className="h-[500px]">
          <PieChart />
        </div>
      </div>
    </div>
  );
};
export default ChartSection;
