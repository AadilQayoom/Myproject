import SelectDropdown from "../select-dropdown/select-dropdown";
import classes from "./index.module.less";
import { useState } from "react";

const options = [
  { label: "Name", value: "name" },
  { label: "Rating", value: "rating" },
  { label: "Price", value: "price" },
  { label: "Popular", value: "popular" },
  { label: "None", value: "none" },
];

const Sorter = ({ t, changeFilter }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const setSelection = (val) => {
    setSelectedValue(val);
    changeFilter(val);
  };
  return (
    <div className={classes.single_filter}>
      <SelectDropdown
        readonly={true}
        options={options}
        selectedOption={selectedValue}
        onChange={(val) => setSelection(val)}
        hideArrow={true}
        placeholder={"Sort"}
        height={40}
        searchable={false}
        t={t}
        style={{ width: 140, border: "1px solid #ccc", backgroundColor: "#fff" }}
      />
    </div>
  );
};
export default Sorter;
