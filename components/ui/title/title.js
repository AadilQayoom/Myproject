import React from "react";
import classes from "./title.module.less";

const Title = (props) => {
  return (
    <div className={classes.why_kupos + " font26"}>
      <span>{props.leftText} </span>
      <span className={classes.gradient_text + " bold-text"}>
        {props.rightText}
      </span>
    </div>
  );
};

export default Title;
