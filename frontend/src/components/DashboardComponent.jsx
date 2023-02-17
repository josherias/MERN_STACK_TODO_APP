import React from "react";

const DashboardComponent = ({ color, icon, title, number }) => {
  return (
    <div className={color + " w-[100%]"}>
      <div className="w-[100%]  flex flex-row gap-2 justify-between text-white">
        <div className="flex flex-col flex-1 justify-center pt-3">
          <div className="flex justify-between items-center w-[100%] px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[80px] h-[80px]"
            >
              {icon}
            </svg>

            <div className="flex flex-col items-end mr-3">
              <p className="text-5xl">{number}</p>
              <h3 className="text-right mt-8 mb-3 uppercase font-semibold">
                {title}
              </h3>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
