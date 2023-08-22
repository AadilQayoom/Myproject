import React, { useState } from "react";

import Slider from "react-input-slider";
import classes from "./price-range-slider.module.less";

const PriceRangeSlider = ({ priceRange }) => {
  const [state, setState] = useState({ x: 10 });

  return (
    <div className={classes.price_range_slider}>
      <div className="font10">
        <div className={classes.value}>({state.x})</div>
        <Slider
          styles={{
            track: {
              backgroundColor: "#ccc",
            },
            active: {
              backgroundColor: "black",
            },
            thumb: {
              width: 20,
              height: 20,
            },
            disabled: {
              opacity: 0.5,
            },
          }}
          axis="x"
          xmin={priceRange.min}
          xstep={10}
          xmax={priceRange.max}
          x={state.x}
          onChange={({ x }) => setState((state) => ({ ...state, x }))}
        />
      </div>
      <div className={classes.price_range + " font10"}>
        <span>{priceRange.min || 0}</span>
        <span>to</span>
        <span>{priceRange.max || 0}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
