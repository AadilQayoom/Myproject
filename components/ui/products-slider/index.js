import "react-multi-carousel/lib/styles.css";

import {
  currentProductState,
  productListState,
} from "../../../recoil/atoms/home";

import Carousel from "react-multi-carousel";
import ProductItem from "../../home/product-list/product-item/product-item";
import ProductList from "../../home/product-list";
import React from "react";
import classes from "./products-slider.module.less";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

const ProductsSlider = () => {
  const [products] = useRecoilState(productListState);
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useRecoilState(
    currentProductState
  );
  const productSelected = (product) => {
    setCurrentProduct(product);
    console.log("current product....", product);
    router.push(`../../../product-details/${product.id}`);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
   <>
     <div className=" font16">Great Deals</div>
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
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
    
      {products.slice(0, 9).map((product, key) => {
        return (
          <div key={key} className={classes.product_slide}>
            <div onClick={() => productSelected(product)}>
              <ProductItem
                item={product}
                key={key}
                imgWidth={300}
                imgHeight={200}
              />
            </div>
          </div>
        );
      })}
    </Carousel>
   </>
  );
};

export default ProductsSlider;
