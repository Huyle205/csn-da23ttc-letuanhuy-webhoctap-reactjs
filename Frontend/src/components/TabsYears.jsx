// components/TabsYear.jsx
import React from "react";

const TabsYear = ({ activeTab, SetActiveTab }) => {
  const years = ["Năm nhất", "Năm hai", "Năm ba", "Năm tư"];
  return (
    <div className="flex ">
      {years.map((year, i) => (
        <button
          key={i}
          onClick={() => SetActiveTab(year)}
          className={`pb-2 text-xl font-semibold px-15 mt-5 transition-all duration-200 min-w-[205px] ${
            activeTab === year
              ? "border-b-5 border-black text-black border-b-black"
              : "text-gray-500 hover:text-black border-b-5 border-transparent hover:border-b-gray-300 cursor-pointer"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default TabsYear;
