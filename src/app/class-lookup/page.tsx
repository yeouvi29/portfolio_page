const Page = () => {
  return (
    <div className="mt-[45.5px] w-full p-5 md:min-w-[calc(100%-250px)] md:mt-0">
      <div className="mt-5 text-gray-600">
        <h1 className="text-[2rem] md:text-[3rem]">Class Lookup App</h1>
        <div className="mt-10">
          <div
            style={{
              backgroundImage: "url(/assets/phone.png)",
            }}
            className="hidden bg-contain w-[min(400px,100%)] relative aspect-[1/2] bg-no-repeat bg-center md:block"
          >
            <div className="absolute top-[70px] left-[10px] w-[calc(100%-20px)] h-[660px]">
              <iframe
                src="https://copa-schedule.vercel.app/"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Nested Site"
              />
            </div>
          </div>
          <div className="w-screen -mx-5 aspect-[1/2] md:hidden">
            <iframe
              src="https://copa-schedule.vercel.app/"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="Nested Site"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
