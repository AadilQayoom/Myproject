import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import classes from "./top-deal-item.module.less";
const TopDealItem = ({ item, imgWidth, imgHeight }) => {
  const router = useRouter();
  const gotoCategory = () => {
    console.log("selected the category...");
    router.push(`/category/${item.route}`);
  };
  return (
    <div className={classes.category_item_wraper}>
      <div className={classes.upper}>
        <Image
          src={`/images/categories/${item?.image}`}
          width={imgWidth ? imgWidth : 100}
          height={imgHeight ? imgHeight : 100}
          alt=""
        />
      </div>
      <div className={classes.lower} style={{ backgroundColor: item.color }}>
        <div className={classes.lower_content}>
          <div className={classes.title}>
            <span>{item.title}</span>
          </div>
          <div className={classes.desc + " general-text"}>
            <span>{item.desc}</span>
          </div>
        </div>

        <div className={classes.action_button} onClick={gotoCategory}>
          <Image
            src={`/images/icons/home/icon_arrow_right.png`}
            width={40}
            height={40}
            alt="arrow"
          />
        </div>
      </div>
    </div>
  );
};

export default TopDealItem;
