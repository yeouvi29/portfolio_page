import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("./BarChart"), { ssr: false });
const PieChart = dynamic(() => import("./PieChart"), {
  ssr: false,
});

const ChartSection = () => {
  return (
    <div>
      <h3>Tourism Data</h3>
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
