import React, { useEffect, useState } from "react";
import { cartListState, totalCartValueState } from "../../../recoil/atoms/cart";
import { useRecoilState, useRecoilValue } from "recoil";

import Cart from "../cart";
import ContentContainer from "../content-container/content-container";
import Image from "next/image";
import LoginModal from "../../home/login-modal/login-modal";
import SearchBar from "../search-bar";
import classes from "./header.module.less";
import { useRouter } from "next/router";
import { loginDataState } from "../../../recoil/atoms/common";


const Header = () => {

    //recoil states
    const loginData = useRecoilValue(loginDataState);

  const cartItems = useRecoilState(cartListState);
  const totalCartValue = useRecoilValue(totalCartValueState);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const options = [
    { label: "All", value: "all" },
    { label: "Aerospace", value: "Aerospace" },
    { label: "Automobiles", value: "Automobiles" },
    { label: "Towers", value: "Towers" },
    { label: "Railways", value: "Railways" },
  ];
  const [isLoggedIn, setIsLoggedIn] = useState(loginData?.id)
  // console.log("cart....", cartItems[0]);


  const searchFunction = () => {
    router.push("/search-page");
  };

  const gotoCartPage = () => {
    router.push("/cart-page");
  };
  const returnHome = () => {
    router.push("/");
  };
  const registerPage = () => {

    router.push("/register");
  };
  const loginPage = () => {

    if(isLoggedIn){
      router.push("/studentprofile");
    }else{
      router.push("/login");
    }
  };
  const gotoWishList = () => {
    router.push("/wish-list");
  };
  const HandleClick=() =>{
    router.push('/aboutus');
  }
  const GotoEventPage=() =>{
    router.push('/viewallEvents');
  }

  const gallerypage=() =>{
    router.push('/gallerypage');
  }


  useEffect(() => {
    setIsLoggedIn(loginData?.id)
  }, [loginData])

  console.log({isLoggedIn})

  return (
    <div className={classes.main_wrapper}>
      <ContentContainer>
        <div className={classes.main_wrapper_inner}>
          <div className={classes.logo_container} onClick={returnHome}>
            <Image
              src={"/images/iustimages/image7.png"}
              width={120}
              height={80}
              alt=""
              onClick={returnHome}
            /> 
            {/* Computer club */}
          </div>

          {/* <div className={classes.search_bar}>
            <SearchBar
              label="Search"
              placeholder="search products"
              onFocus={searchFunction}
              onChange={(e) => setSearchOption(e)}
              onChangeInput={(e) => setSearch(e.target.value)}
              value={search}
              options={options}
              border={false}
              sugesstions={true}
              searchHistory={search}
            />
          </div> */}

          <div className={classes.cart_login}>
            <div
              style={{ display: "flex" }}
              className={classes.cart}
              onClick={GotoEventPage}
            >
              {/* <Image
                src={"/images/icons/home/heart-filled.png"}
                width={34}
                height={34}
                alt=""
              /> */}
            Events
            </div>
            <div className={classes.login_register} onClick={gallerypage}>
              {/* <Image
                src={"/images/icons/login-reg.png"}
                width={34}
                height={34}
                alt=""
              /> */}
              Gallery
            </div>
            <div
              style={{ display: "flex" }}
              className={classes.cart}
              onClick={HandleClick}
            >
              {/* <Image
                src={"/images/general/icons8-fast-cart-60.png"}
                width={34}
                height={34}
                alt=""
              /> */}
              About
            </div>

            <div className={classes.login_register} onClick={loginPage}>
              {/* <Image
                src={"/images/icons/login-reg.png"}
                width={34}
                height={34}
                alt=""
              /> */}
              {isLoggedIn ?  "My Account":"Login"}
            </div>
          </div>
        </div>
      </ContentContainer>
      <div className={classes.login_modal}>
        <LoginModal
          showModal={showLoginModal}
          onHide={() => setShowLoginModal(false)}
          // t={t}
        />
      </div>
    </div>
  );
};

export default Header;
