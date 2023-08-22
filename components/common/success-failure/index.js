import React from "react";
import Lottie from "lottie-react";
import tick from "../../../public/images/anims/checkmark_anim.json";
import cross from "../../../public/images/anims/xmark_anim.json";
import confeti from "../../../public/images/anims/kupos_confetti_alone.json";
import classes from "./success-failure.module.less";
import classNames from "classnames";
const SuccessFailure = ({
  t,
  success,
  icon,
  infoText,
  title,
  subtitle,
  children,
}) => {
  let audio;

  return (
    <div className={classes.kupos_success_failure}>
      <div
        className={classNames({
          "content-container": true,
          [classes.cancel_done_section]: true,
        })}
      >
        <div className={classes.cancel_ticket_done}>
          {success ? (
            // <div style={{ position: 'absolute', zIndex: 99, width: '100vw', height: '50vh' }}>
            <Lottie
              animationData={confeti}
              loop={false}
              style={{
                position: "absolute",
                zIndex: 99,
                width: "100vw",
                height: "50vh",
              }}
            />
          ) : // </div>
          null}

          <div
            className={classes.anim_container}
            style={{ width: 90, height: "auto" }}
          >
            {icon ? (
              <img src={icon} alt="" />
            ) : success ? (
              <Lottie animationData={tick} loop={false} />
            ) : (
              <Lottie animationData={cross} loop={false} />
            )}
          </div>
        </div>

        <div
          className={classNames({
            "mt-y-3": true,
            [classes.cancel_ticket_done]: true,
          })}
        >
          <span className="bold-text font20">
            {title
              ? title
              : success
              ? t
                ? t("HOME.THANK_YOU")
                : "¡Listo!"
              : t
              ? t("HOME.WE_ARE_SORRY")
              : "¡Lo sentimos!"}
          </span>
        </div>

        <div
          className={classNames({
            "mt-y-3": true,
            font12: true,
            [classes.cancel_ticket_done]: true,
            [classes.cancel_ticket_done_desc]: true,
          })}
        >
          <span style={{ textAlign: "center" }}>{subtitle}</span>
        </div>

        {infoText ? (
          <div className={classes.success_info_container}>
            <div
              className={classNames({
                "mt-y-3": true,
                font12: true,
                [classes.cancel_ticket_done]: true,
                [classes.cancel_success_info_div]: true,
              })}
            >
              <span className={classes.primary_triangle}></span>
              <span>{infoText} </span>
            </div>
          </div>
        ) : null}
      </div>

      {children ? (
        <div
          className={classNames({
            "content-container": true,
            [classes.success_failure_content]: true,
          })}
          style={
            success
              ? {
                  zIndex: 100,
                  position: "absolute",
                  minWidth: "100vw",
                }
              : {}
          }
        >
          {children}
        </div>
      ) : null}

      {/* {success ? (
        <audio
          ref={(aud) => {
            // audio = aud;
          }}
          // controls
          autoPlay={true}
          src="https://kupos.s3.amazonaws.com/kupos_success_sound.mpeg"
        />
      ) : null} */}
    </div>
  );
};

export default SuccessFailure;
