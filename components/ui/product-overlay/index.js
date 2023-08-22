import Image from "next/image";
import React from "react";
import classes from "./product-overlay.module.less";
const ProductOverlay = (props) => {
  return (
    <>
      <div className={classes.side_overlay}>
        <div className={classes.invisible_part} onClick={props.onClose}></div>
        <div className={classes.visible_part}>
          <div className={classes.label_close_button} onClick={props.onClose}>
            <div className={classes.title + " font11 bold-text"}>
              Sort and Filter
            </div>

            <div className={classes.close_button}>
              <Image
                src="/images/icons/home/cross.png"
                alt="caret down"
                height={14}
                width={14}
              />
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default ProductOverlay;
