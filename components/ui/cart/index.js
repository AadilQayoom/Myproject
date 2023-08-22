import CheckoutSidebar from "../checkout-sidebar";
import Image from "next/image";
import React from "react";
// import cartIcon from '../../../images/general/icons8-fast-cart-60.png'
import classes from "./cart.module.less";
const Cart = (props) => {
  return (
    <div className={classes.cart_box} onClick={props.onClick}>
      <div>
        <Image
          src={"/images/general/icons8-fast-cart-60.png"}
          width={40}
          height={40}
          alt=""
        />
      </div>
      <div>
        <div>{props.items} items</div>
        <div>Rs. {props.price}</div>
      </div>
    </div>
  );
};

export default Cart;
