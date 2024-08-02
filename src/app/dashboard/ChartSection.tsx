import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("./BarChart"), { ssr: false });
const PieChart = dynamic(() => import("./PieChart"), {
  ssr: false,
});

const ChartSection = () => {
  return (
    <div>
      <h2 className="text-3xl text-sf-blue">Tourism Data</h2>
      <div className="xl:grid xl:grid-cols-[60%_40%]">
        <div className="w-full flex items-center justify-center">
          <BarChart />
        </div>
        <div className="w-full h-[300px] xl:h-[500px] flex items-center justify-center">
          <PieChart />
        </div>
      </div>
    </div>
  );
};
export default ChartSection;
