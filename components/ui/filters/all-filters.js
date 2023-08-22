import CommonService from "../../../services/commonService";
import ProductOverlay from "../product-overlay";
import SideMenu from "./side-menu/side-menu";
import classes from "./index.module.less";
import { useState } from "react";

const AllFilters = ({ t, changeFilter }) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [options, setOptions] = useState([
    { filters: ["count", "price", "rating"], label: "Sort", selected: 0 },
    {
      filters: ["ascending", "descending", "categorical"],
      label: "Alphabetically",
      selected: 0,
    },
    { filters: ["Low to High", "High to Low"], label: "Price", selected: 0 },
    {
      filters: ["< 1 cm", "> 1 cm", "> 5 cm"],
      label: "Dimensions",
      selected: 0,
    },
  ]);
  const print = (clicked) => {
    console.log("clicked...", clicked);
  };

  const onChange = (innerIndex, filterIndex) => {
    let myOptions = CommonService.copyObject(options);

    myOptions[filterIndex]["selected"] = innerIndex;

    setOptions(myOptions);
  };
  return (
    <div className={classes.single_filter}>
      <div
        className={classes.all_filters}
        onClick={() => setSideMenu(!sideMenu)}
      >
        All Filters
      </div>
      {sideMenu ? (
        <ProductOverlay onClose={() => setSideMenu(!sideMenu)}>
          <div>
            {options.map((filter, index) => {
              return (
                <div key={index}>
                  <SideMenu
                    label={filter.label}
                    options={filter.filters}
                    onClick={(val) => changeFilter(val)}
                    selected={filter.selected}
                    onChange={(val) => onChange(val, index)}
                  />
                </div>
              );
            })}
          </div>
        </ProductOverlay>
      ) : null}
    </div>
  );
};

export default AllFilters;
