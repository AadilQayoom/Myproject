import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
import CategoryItem from "./top-deal-item";
import React from "react";
import classes from "./top-deals-slider-item.module.less";

const TopDealsSlider = () => {
  const categories = [
    {
      title: "We have lowered our prices",
      image: "camera.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#BFB9B9",
      route: "laptop",
    },
    {
      title: "Products under Rs 199",
      image: "devices.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#99AEA0",
      route: "electronic",
    },
    {
      title: "Affordable products",
      image: "electronic.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#E5BFB4",
      route: "peripheral",
    },
    {
      title: "Last Chance to Buy",
      image: "laptop.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#D7D1B8",
      route: "multimedia",
    },
    {
      title: "Electronics Under rs 2000",
      image: "multimedia.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#D5C995",
      route: "laptop",
    },
    {
      title: "Our lowest prices",
      image: "smartphone.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#DFB3B0",
      route: "electronic",
    },
    {
      title: "starting at Rs 100",
      image: "smartgadget.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#D0B78F",
      route: "peripheral",
    },
    {
      title: "Popular buys",
      image: "tv.jpg",
      desc: "We have lowered our prices on some of our most popular products",
      color: "#C0C9AB",
      route: "multimedia",
    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
  const openCategory = (cat) => {
    console.log("clicked....", cat);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.title + " font16"}>Top Deals</div>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
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
          {categories.map((cat, key) => {
            return (
              <div key={key} className={classes.category_slide}>
                <div onClick={() => openCategory(cat.category)}>
                  <CategoryItem
                    item={cat}
                    key={key}
                    imgWidth={200}
                    imgHeight={200}
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default TopDealsSlider;
