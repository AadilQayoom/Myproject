import SelectDropdown from "../select-dropdown/select-dropdown";
import classes from "./index.module.less";
import { useState } from "react";

const options = [
  { label: "Cotton", value: "cotton" },
  { label: "Lyocell", value: "lyocell" },
  { label: "Polyester", value: "polyster" },
  { label: "Silk", value: "silk" },
];

const Material = ({ t }) => {
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
        placeholder={"Material"}
        height={40}
        searchable={false}
        t={t}
        style={{ width: 140, border: "1px solid #ccc", backgroundColor: "#fff" }}

      />
    </div>
  );
};

export default Material;
