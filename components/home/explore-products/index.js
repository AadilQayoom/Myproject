import Image from "next/image";
import MyButton from "../../ui/my-button";
import React from "react";
import classes from "./explore-products.module.less";
import { useRouter } from "next/router";
const ExploreProducts = () => {
  const router = useRouter();
  const exploreProducts = () => {
    console.log("exploring products");

    router.push("/shop-page");
  };
  return (
    <>
      <div className={classes.explore_wrapper}>
        <div>
          <Image
            src={"/images/home/wallpaper/wall1.jpeg"}
            width={600}
            height={400}
            alt=""
          />
        </div>
        <div className={classes.explore}>
          <div className={classes.title}>
            <span className="font18 black-text">
              Get ready for celebrations
            </span>
          </div>
          <div className={classes.desc}>
            <span className="font11 general-text">
              Celebrating with your loved ones is something to always treasure.
              Start off right with our curated product ranges. Our selection of
              fun and useful helpers is just right for all types of celebrations
              with your friends and family.
            </span>
          </div>
          <MyButton
            style={{ borderRadius: 100, width: 100 }}
            onClick={exploreProducts}
            label="Explore"
          />
        </div>
      </div>
    </>
  );
};

export default ExploreProducts;
