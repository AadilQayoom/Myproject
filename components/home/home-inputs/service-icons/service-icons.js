import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  kuposAppsState,
  adminAppsState,
  loginDataState,
  seletcedServiceState,
} from "../../../../recoil/atoms/common";
// import bus_anim from "../../../public/images/anims/bus.json";
import LottiePlayer from "../../../ui/lottie-player/lottie-player";
import classes from "./service-icons.module.less";

const ServiceIcons = (props) => {
  const kuposApps = useRecoilValue(kuposAppsState);
  const adminApps = useRecoilValue(adminAppsState);
  const [loginData, setLoginData] = useRecoilState(loginDataState);
  const [selectedApp, setSelectedApp] = useRecoilState(seletcedServiceState);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  let actualApps =
    loginData && loginData.is_agency_user ? adminApps : kuposApps;
  return (
    <div className={classes.home_menu_strip + " kupos-card"}>
      <div className={classes.home_menu_strip_icons}>
        {actualApps.map((val, key) => (
          <div
            className={classes.home_menu_strip_icon + " pointer"}
            key={key}
            // onClick={() => setKuposGoEnvironment(key)}
          >
            <div
              onClick={() => {
                setSelectedApp(key);
                // onSourceChange(null);
                setSource(null);
                setDestination(null);
              }}
              className={classes.home_search_widget_icon}
            >
              <LottiePlayer
                // animationData={
                //   selectedSearchApp == key ? val.icon_white : val.icon
                // }
                animation={selectedApp == key ? val.icon_white : val.icon}
                loop={true}
              />
            </div>
            <div className={classes.home_menu_icon_info + " mt-y-3 font8"}>
              <span className={classes.primary_triangle}></span>
              <span className={classes.tag_text}>{props.t(val.name)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceIcons;
