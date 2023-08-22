import React from "react";
import { useSetRecoilState } from "recoil";
import { showLoginModalState } from "../../../recoil/atoms/common";
import classes from "./logged-out-block.module.less";

const NotLoggedInBlock = (props) => {
  const setShowLoginModal = useSetRecoilState(showLoginModalState);
  return (
    <div className={classes.kupos_card + " " + classes.dont_have_account_block}>
      <div>
        <div className={classes.heading + " bold font13"}>
          {props.t("PASSENGER_DETAILS.NO_ACCOUNT")}
        </div>
        <div className="font10">
          {props.t("PASSENGER_DETAILS.CREATE_YOURS_AND_GET_BENIFIT")}
        </div>
      </div>
      <div>
        <button
          className="kupos-button font12"
          onClick={() => setShowLoginModal(true)}
        >
          <span>{props.t("PASSENGER_DETAILS.CREATE_ACCOUNT")}</span>
        </button>
      </div>
    </div>
  );
};

export default NotLoggedInBlock;
