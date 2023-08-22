import {
  AddWishList,
  GetWishList,
  RemoveFromWishList,
} from "../../../../services/apis/apisCart";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import CommonService from "../../../../services/commonService";
import Icon from "../../../common/icon";
import Image from "next/image";
import MyButton from "../../../../components/ui/my-button/index";
import baseUrls from "../../../../services/constants/baseUrls";
import { cartListState } from "../../../../recoil/atoms/cart";
import classes from "./product-item.module.less";
import { currentProductState } from "../../../../recoil/atoms/home";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ProductItem = (props) => {
  const router = useRouter();
  const setCurrentProduct = useSetRecoilState(currentProductState);
  const [imageHovered, setImageHovered] = useState(false);
  const [cartList, setCartList] = useRecoilState(cartListState);
  const [isPresentInCart, setIsPresentInCart] = useState(null);
  const [isPresentInWishList, setIsPresentInWishList] = useState(false);
  const [wishlistUpdated, setWishListUpdated] = useState(0);

  //API HANDLES
  const addToWishlistFunc = AddWishList();
  const removeFromWishlistFunc = RemoveFromWishList();
  const getWishListFunc = GetWishList();

  const openProduct = () => {
    setCurrentProduct(props.item);
    setTimeout(() => {
      router.push(`/new-product-details/${props.item.name}`);
    }, 500);
  };

  //to check if item is in cart
  useEffect(() => {
    let cartItems = CommonService.copyObject(cartList);
    cartItems?.map((cartItem) => {
      if (cartItem.id === props.item?.id) {
        setIsPresentInCart(cartItem);
      }
    });
  }, [cartList]);

  //to check if item is in wishlist
  useEffect(() => {
    getWishListFunc({
      callback: (res) => {
        if (res?.data?.product?.length) {
          let found = false;
          res.data.product.map((product) => {
            if (product.id === props.item?.id) {
              found = true;
            }
          });
          setIsPresentInWishList(found);
        }
      },
    });
  }, [wishlistUpdated]);

  const updateCartItem = (product, increase) => {
    let newItemsArr = [...cartList];
    let qty = increase
      ? isPresentInCart?.quantity + 1
      : isPresentInCart?.quantity - 1;

    let tempProduct = {
      ...product,
      ["quantity"]: qty,
    };

    //to find where current item is present
    let productIndex = null;
    newItemsArr.map((item, i) => {
      if (item.id === isPresentInCart?.id) {
        productIndex = i;
      }
    });

    newItemsArr.splice(productIndex, 1, tempProduct);
    setCartList(newItemsArr);
  };

  const addItemToCart = () => {
    let product = props.item;
    let newItemsArr = [...cartList];
    let tempProduct = {};

    if (isPresentInCart) {
      updateCartItem(product, true);
      toast("Item was already in cart, only quantity was updated!");
    } else {
      tempProduct = { ...product, ["quantity"]: 1 };
      newItemsArr.push(tempProduct);
      setCartList(newItemsArr);
      toast.success("Item added to cart!");
    }
  };

  const addToWishlist = () => {
    let data = {
      product_id: props?.item?.id,
    };

    addToWishlistFunc({
      callback: (res) => {
        setWishListUpdated(wishlistUpdated + 1);
        if (res && res.code === "CREATE_SUCCESS") {
          toast.success("Item added to wishlist!");
        } else if (res && res.data && res.data.message) {
          toast.error(res.data.message);
        }
      },
      data: data,
    });
  };

  const removeFromWishlist = () => {
    let data = {
      product_id: props?.item?.id,
    };

    removeFromWishlistFunc({
      callback: (res) => {
        setWishListUpdated(wishlistUpdated + 1);
        if (res && res.success && res.message === "Successfully removed!") {
          toast.success("Item removed from wishlist!");
        } else if (res && !res.success && res.message) {
          toast.error(res.message);
        }
      },
      data: data,
    });
  };

  return (
    <>
      <div className={classes.categories_wraper}>
        <div className={classes.categories_images} onClick={openProduct}>
          <Image
            src={
              imageHovered
                ? // ? `/images/home/products/${
                  //     props.item.hoverImage
                  //       ? props.item.hoverImage
                  //       : props.item.image
                  //   }`
                  baseUrls.mediaUrl + "product/" + props.item.image
                : baseUrls.mediaUrl + "product/" + props.item.image
            }
            width={props.imgWidth ? props.imgWidth : 100}
            height={props.imgHeight ? props.imgHeight : 100}
            alt=""
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          />
        </div>

        <div className={classes.product_info}>
          <div className={classes.clickearea} onClick={openProduct}>
            <div className={classes.new_tag}>New</div>
            <div className={classes.title + " bold-text"}>
              {props.item.name}
            </div>
            <div className={classes.price_tag}>
              Rs. <span className="font16 bold-text">{props.item.price}</span>
            </div>
          </div>
          <div className={classes.action_buttons}>
            <div className={classes.basket_wrapper} onClick={addItemToCart}>
              <Icon
                icon={"/images/icons/home/basket-white.png"}
                height={24}
                width={24}
              />
            </div>
            <div className={classes.fav_wrapper}>
              <Icon
                icon={
                  isPresentInWishList
                    ? "/images/icons/home/heart-filled.png"
                    : "/images/icons/home/heart.png"
                }
                height={20}
                width={20}
                onClick={
                  isPresentInWishList ? removeFromWishlist : addToWishlist
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        {props.button === true ? <MyButton label="Add To Cart"></MyButton> : ""}
      </div>
    </>
  );
};

export default ProductItem;
