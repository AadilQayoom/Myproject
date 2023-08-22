import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import classes from "./index.module.less";
import ServiceIcons from "./service-icons/service-icons";
import {
  loginDataState,
  seletcedServiceState,
} from "../../../recoil/atoms/common";
import ServiceTitle from "./service-title/service-title";
import HomeInputs from "./service-inputs/home-inputs";

const HomeInputsIndex = (props) => {
  const [loginData, setLoginData] = useRecoilState(loginDataState);
  const selectedSearchApp = useRecoilValue(seletcedServiceState);

  return (
    <div style={{ position: "relative" }} className="content-container">
      <div className={classes.home_inputs_container + " kupos-card"}>
        <ServiceIcons t={props.t} />

        <ServiceTitle
          t={props.t}
          selectedSearchApp={selectedSearchApp}
          loginData={loginData}
          bipCashbackOffer={{}}
          // bipCashbackOffer={bipCashbackData}
        />

        <HomeInputs t={props.t} selectedSearchApp={selectedSearchApp} />
      </div>
    </div>
  );
};

export default HomeInputsIndex;
