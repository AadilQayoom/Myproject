import Image from "next/image";
import React from "react";
import classes from "./category-item.module.less";
import baseUrls from "../../../../services/constants/baseUrls";
const CategoryItem = (props) => {
  return (
    <div className={classes.category_item_wraper}>
      <div className={classes.background}>
        <Image
          src={`${baseUrls.mediaUrl}category/${props.item.image}`}
          width={props.imgWidth ? props.imgWidth : 100}
          height={props.imgHeight ? props.imgHeight : 100}
          alt=""
        />
      </div>
      <div className={classes.overlay}>
        <div className={classes.overlay_inner}>
          <span>{props.item.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
