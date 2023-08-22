import SelectDropdown from "../select-dropdown/select-dropdown";
import classes from "./index.module.less";
import { useState } from "react";

const options = [
  { label: "Extra Small", value: "extra_small" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Extra Large", value: "extra_large" },
];

const Size = ({ t }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const setSelection = (val) => {
    console.log('val in sort', val)
    setSelectedValue(val);
  };
  return (
    <div className={classes.single_filter}>
      <SelectDropdown
        readonly={true}
        options={options}
        selectedOption={selectedValue}
        onChange={(val) => setSelection(val.value)}
        // icon="/images/icons/home/icon_source2.png"
        hideArrow={true}
        placeholder={"Size"}
        height={40}
        searchable={false}
        t={t}
        style={{ width: 140, border: "1px solid #ccc", backgroundColor: "#fff" }}
      />
    </div>
  );
};

export default Size;
