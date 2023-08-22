import React from "react";
import classes from "./download-section.module.less";
import Image from "next/image";

const DownloadSection = () => {
  return (
    <div className={classes.download_our_app_section_outer}>
      <div className="content-container">
        <div className={classes.download_our_app_section}>
          <div className={classes.app_screenshot_container}>
            <Image
              loader={""}
              src={"/images/home/home-cellphones.png"}
              alt="Download kupos.cl mobile app on Android and iOS"
              className={classes.app_screenshot}
              height={590}
              width={577}
            />
          </div>
          <div className={classes.download_app_overlay_text_items}>
            <span
              className={
                classes.download_app_overlay_text_heading + " bold-text font39"
              }
            >
              Download our app free!
            </span>
            <span
              className={
                classes.download_app_overlay_text_details + " font12 light-text"
              }
            >
              Create your account and pay your tickets with
            </span>
            <div className={classes.download_app_kupos_pay_image}>
              <Image
                loader={""}
                alt="Logo of KuposPay"
                src="/images/svgs/generic/kupos_pay.svg"
                className={classes.app_screenshot}
                height={56}
                width={250}
              />
            </div>
            <div className={classes.download_app_kupos_pay_store}>
              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.bitla.mba.pasajebus"
              >
                <Image
                  loader={""}
                  src="/images/home/google-play.png"
                  alt="Download kupos.cl on Android play store"
                  className={classes.app_screenshot}
                  height={38}
                  width={100}
                />
              </a>
              <a
                target="_blank"
                href="https://itunes.apple.com/us/app/pasaje-bus/id973424151?ls=1&amp;mt=8"
              >
                <Image
                  loader={""}
                  src="/images/home/app-store.png"
                  className={classes.app_screenshot}
                  alt="Download kupos.cl on iOS App Store"
                  height={38}
                  width={100}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
