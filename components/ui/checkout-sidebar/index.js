import React, { useEffect, useState } from "react";
import MyButton from "../my-button";
import MyInput from "../my-input";
import classes from "./checkout-sidebar.module.less";
import { useRouter } from "next/router";
import { totalCartValueState } from "../../../recoil/atoms/cart";
import { useSetRecoilState } from "recoil";

const CheckoutSidebar = ({ totalItemsCost }) => {
  const router = useRouter();
  const [voucher, setVoucher] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  //recoil states
  const setTotalCartValue = useSetRecoilState(totalCartValueState);

  const showInput = () => {
    setVoucher(!voucher);
  };
  const routeToCheckout = () => {
    setTotalCartValue(totalItemsCost + deliveryFee);

    router.push("/checkout-page");
  };

  useEffect(() => {
    setDeliveryFee(Math.ceil((totalItemsCost * 1.3456) / 10));
  }, [totalItemsCost]);
  return (
    <div className={classes.checkout_container + " font12"}>
      <div className={classes.sidebar_item}>
        <span>Goods Subtotal</span>
        <span className="bold-text ">Rs {totalItemsCost}</span>
      </div>
      <div className={classes.sidebar_item}>
        <span>Delivery</span>
        <span className="bold-text">Rs {deliveryFee}</span>
      </div>
      <div className={classes.sidebar_item}>
        <span>GST</span>
        <span className="bold-text">NA</span>
      </div>

      {/* {!voucher ? (
        <div>
          <button className={classes.voucher_btn} onClick={showInput}>
            Add Voucher Code &#10095;
          </button>
        </div>
      ) : (
        ""
      )}
      {voucher ? (
        <div className={classes.checkout_btn}>
          <MyInput
            placeholder="Voucher Code"
            style={{ width: "120px", height: "40px" }}
            noSpace
          />
          <div className={classes.voucher_button}>
            <MyButton label="Apply" />
          </div>
        </div>
      ) : (
        ""
      )} */}
      <hr></hr>

      <div className={classes.sidebar_item + " " + classes.total}>
        <span>Total</span>
        <span className="bold-text">
          {"RS: " + (totalItemsCost + deliveryFee)}
        </span>
      </div>
      <div>
        <MyButton label="Checkout" onClick={routeToCheckout} />
      </div>

      <div className={classes.info_section}>
        <div className={classes.info_item}>
          <span className={classes.x_small_text + " font8"}>
            *Calculated based on your preferences or selected shipping
          </span>
        </div>
        <div className={classes.info_item}>Did you know?</div>
        <div className={classes.info_item}>
          <span className={classes.x_small_text + " font8 grey-text"}>
            You can now consolidate your order shipped to you; either the
            complete order or by each product line. Click here to learn more.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
