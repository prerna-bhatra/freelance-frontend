import React from "react";
import LabTabs from "./LabTabs";

const tabs = [
  { key: "stocks", label: "Stocks", value: "1",  },
  {
    key: "mutual-funds",
    label: "Mutual Funds",
    value: "3",
  },
];

const MyTabsComponent = () => {
  return <LabTabs tabs={tabs} />;
};

export default MyTabsComponent;
