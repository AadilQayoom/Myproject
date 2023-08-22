import Image from "next/image";
import MyButton from "../my-button";
import React from "react";
import baseUrls from "../../../services/constants/baseUrls";
import { cartListState } from "../../../recoil/atoms/cart";
import classes from "./delivering-items.module.less";
import { useRecoilValue } from "recoil";
const DeliveringItems = () => {
  const itemInCart = useRecoilValue(cartListState);
  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
  ];

  const qtyChange = (qty) => {};
  return (
    <>
      <div className={classes.delivery_items_wraper}>
        {itemInCart ? (
          <div className={classes.in_cart}>
            {itemInCart.map((item) => {
              return (
                <>
                  <div className={classes.delivery_item_inner}>
                    <div className={classes.delivery_desc}>
                      <div className={classes.delivery_item_image}>
                        <Image
                          src={`${baseUrls.mediaUrl}product/${item.image}`}
                          width={200}
                          height={100}
                          alt=""
                        />
                      </div>
                      <div className="font8">{item.name}</div>
                      <span>{item.description}</span>
                    </div>
                    {/* <div className={classes.price_instock}>
                      <div>Price : Rs {item?.price}</div>
                      <div>In Stock : {item?.rating?.count}</div>
                      <div>
                        <MyDropdown
                          options={options}
                          label="Qty"
                          onChange={(qty) => qtyChange(qty)}
                        />
                      </div>
                    </div> */}
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          "No Item In Cart"
        )}
      </div>
    </>
  );
};

export default DeliveringItems;
