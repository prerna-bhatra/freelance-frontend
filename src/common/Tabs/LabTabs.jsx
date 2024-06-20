import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link, Outlet } from "react-router-dom";

const LabTabs = ({ tabs }) => { 
  const [value, setValue] = React.useState(() => { 
    // Retrieve the tab value from local storage
    return "stocks";
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Store the selected tab value in local storage
    localStorage.setItem("selectedTab", value);
  }, [value]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} TabIndicatorProps={{
        style: { backgroundColor: "#00B386", },
      }} aria-label="lab API tabs example">
            {tabs?.map((tab) => (
              <Tab
                key={tab.key}
                label={tab.label}
                value={tab.key}
                LinkComponent={Link}
                to={tab.key}
                sx={{
                  borderBottom: "1px solid #D4D4D4",
                  color: "black",
                  fontWeight: "600",
                  "&.Mui-selected": {
                    color: "#00B386",
                    background: "#F8F8F8",
                    fontWeight: 700,
                    // backgroundColor: "red",
                    borderBottom: "none",
                  },
                }}
              />
            ))}
          </TabList>
        </Box>
        <Outlet />
      </TabContext>
    </Box>
  );
};

export default LabTabs;
