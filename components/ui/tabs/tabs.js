import classes from "./tabs.module.less";
import { useState } from "react";

const Tabs = ({setTab, data}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const renderTab = (tab, index) => {
    return (
      <div
        key={index}
        className={
          classes.single_tab +
          " " +
          (selectedTab == index ? classes.active : "")
        }
        onClick={() => {
          setSelectedTab(index);
          setTab(tab)
        }}
        style={{ cursor: "pointer", width: "300px" }}
      >
        {tab}
      </div>
    );
  };

  return (
    <div className={classes.tabs_wraper}>
      <div className={classes.tabs_container}>
        <div className={classes.tabs_container_inner + " font10"}>
          {
            data.length > 0 &&
            data.map((tab, index) => {
              return renderTab(tab, index);
            })}
        </div>
      </div>

    </div>
  );
};

export default Tabs;
