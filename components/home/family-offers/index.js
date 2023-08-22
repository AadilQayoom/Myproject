import Image from "next/image";
import React from "react";
import classes from "./family-offers.module.less";
import { useRouter } from "next/router";
import { useState } from "react";
const FamilyOffers = () => {
  const router = useRouter();
  const routeToShopPage = () => {
    router.push('/shop-page')
  }
  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>
          <span className="font18">SKYBIZ Top Curated Offers</span>
        </div>
        <div className={classes.grid_container}>
          <div className={classes.relative}>
            <div className={classes.img} onClick={routeToShopPage}>
              <Image
                src={"/images/home/wallpaper/wall2.jpg"}
                width={400}
                height={500}
                alt=""
              />
            </div>
            <div className={classes.absolute}>
              <span>Our bond makes us serve you better.</span>
            </div>
          </div>
          <div className={classes.sub_container}>
            <div className={classes.view_all}>
              <div className={classes.view_all_title}>
                <span className="font18">Top Curated Offers</span>
              </div>
              <div
                className={classes.link}
                onClick={routeToShopPage}
              >
                <div>
                  <span>View All</span>
                </div>
                <div className={classes.arrow}>
                  <Image
                    src={"/images/icons/home/icon_arrow_right.png"}
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div>
              <div className={classes.img} onClick={routeToShopPage}>
                <Image
                  src={"/images/home/wallpaper/wall4.jpeg"}
                  width={400}
                  height={240}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={classes.sub_container}>
            <div>
              <div className={classes.img} onClick={routeToShopPage}>
                <Image
                  src={"/images/home/wallpaper/wall5.jpg"}
                  width={400}
                  height={240}
                  alt=""
                />
              </div>
            </div>
            <div>
              <div className={classes.img} onClick={routeToShopPage}>
                <Image
                  src={"/images/home/wallpaper/wall6.jpeg"}
                  width={400}
                  height={240}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyOffers;
