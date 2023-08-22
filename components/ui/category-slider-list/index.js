import "react-multi-carousel/lib/styles.css";

import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import CategoryItem from "./category-slider-item";
import { GetCategories } from "../../../services/apis/apisCart";
import classes from "./category-slider-item.module.less";
import { useRouter } from "next/router";

const CategorySlider = () => {
  const router = useRouter();
  const [currentCategories, setCurrentCategories] = useState([]);
  const getCategoriesFunc = GetCategories();
  //Get Categories
  useEffect(() => {
    getCategoriesFunc({
      callback: (res) => {
        if (res && res?.data) {
          console.log("Categories are---", res.data);
          setCurrentCategories(res.data);
        }
      },
    });
  }, []);

  console.log({ currentCategories });

  // const categories = [
  //   { category: "Digital Camera", image: "camera.jpg", route: "camera" },
  //   { category: "Peripherals", image: "devices.jpg", route: "peripheral" },
  //   { category: "Electronic", image: "electronic.jpg", route: "electronic" },
  //   { category: "Laptops", image: "laptop.jpg", route: "laptop" },
  //   { category: "Multimedia", image: "multimedia.jpg", route: "multimedia" },
  //   { category: "Smartphones", image: "smartphone.jpg", route: "smartphone" },
  //   { category: "Smart Gadgets", image: "smartgadget.jpg", route: "gadget" },
  //   { category: "Televisions", image: "tv.jpg", route: "television" },
  // ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1000, min: 598 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const openCategory = (category) => {
    setTimeout(() => {
      router.push(`/category/${category.name}/${category.id}`);
    }, 500);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.title + " font16"}>Top Categories</div>
        {currentCategories?.length ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            //autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            // dotListClass="custom-dot-list-style"
            // itemClass="carousel-item-padding-40-px"
          >
            {currentCategories?.map((cat, key) => {
              return (
                <div key={key} className={classes.category_slide}>
                  <div onClick={() => openCategory(cat)}>
                    <CategoryItem
                      item={cat}
                      key={key}
                      imgWidth={200}
                      imgHeight={300}
                    />
                  </div>
                </div>
              );
            })}
          </Carousel>
        ) : null}
      </div>
    </>
  );
};

export default CategorySlider;
