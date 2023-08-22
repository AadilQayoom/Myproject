import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import CommonService from "../../../services/commonService";
import Filters from "../../ui/filters";
import ProductItem from "./product-item/product-item";
import classes from "./product-list.module.less";
import { currentProductState } from "../../../recoil/atoms/home";
import { productListState } from "../../../recoil/atoms/home";
import { useRouter } from "next/router";

const ProductList = ({ size, t, showFilters = false, categoryProducts }) => {
  const products = useRecoilValue(productListState);
  const [currentProduct, setCurrentProduct] = useRecoilState(
    currentProductState
  );
  const router = useRouter();
  const productSelected = (product) => {
    setCurrentProduct(product);
    sessionStorage.setItem("product", JSON.stringify(product));
    router.push(`/new-product-details/${product.id}`);
    // console.log("product is", product);
  };
  let [productsToDisplay, setProductsToDisplay] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({ value: "none" });

  console.log({ products });

  useEffect(() => {
    if (categoryProducts?.length > 0) setProductsToDisplay(categoryProducts);
    else setProductsToDisplay(products);
  }, [categoryProducts]);

  const setFilter = (val) => {
    console.log({ val });
    setCurrentFilter(val);
    sortProducts(val);
  };

  const sortProducts = (filter) => {
    // console.log({ filter });
    let productsToSort = CommonService.copyObject(productsToDisplay);
    if (filter.value === "rating") {
      setProductsToDisplay(
        productsToSort.sort((a, b) => b.rating?.rate - a.rating?.rate)
      );
    } else if (filter.value === "price") {
      setProductsToDisplay(productsToSort.sort((a, b) => b.price - a.price));
    } else if (filter.value === "count") {
      setProductsToDisplay(
        productsToSort.sort((a, b) => b.rating?.count - a.rating?.count)
      );
    } else if (filter.value === "ascending") {
      productsToDisplay.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (filter.value === "descending") {
      productsToDisplay.sort(function (a, b) {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
    } else if (filter.value === "categorical") {
      productsToDisplay.sort(function (a, b) {
        if (a.category < b.category) {
          return -1;
        }
        if (a.category > b.category) {
          return 1;
        }
        return 0;
      });
    } else if (filter.value === "Low to High") {
      setProductsToDisplay(productsToSort.sort((a, b) => a.price - b.price));
    } else if (filter.value === "High to Low") {
      setProductsToDisplay(productsToSort.sort((a, b) => b.price - a.price));
    }
    //ends if
  };

  return (
    <div className={classes.filter_and_products}>
      {showFilters && <Filters t={t} setFilter={setFilter} />}
      <div className={classes.products_parent_container}>
        <div className={classes.section_title + " font16"}>
          Items in the category
        </div>
        <div className={classes.category_list}>
          {productsToDisplay?.length &&
            productsToDisplay?.slice(0, size || 4).map((product, key) => {
              return (
                <div key={key}>
                  <div
                    className={classes.product_item}
                    // onClick={() => productSelected(product)}
                  >
                    <div>
                      <ProductItem
                        item={product}
                        key={key}
                        imgWidth={300}
                        imgHeight={300}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
