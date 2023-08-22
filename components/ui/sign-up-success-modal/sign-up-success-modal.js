import React from "react";
import KuposModal from "../kupos-modal/kupos-modal";
import SvgHome from "../svg-home/svg-home";
import classes from "./sign-up-success-modal.module.less";
const SignUpSuccessModal = (props) => {
  return (
    <div className={classes.common_sign_up_success_modal}>
      <KuposModal
        showModal={props.showModal}
        onHide={props.onHide}
        size="md"
        ariaLabel="login-modal"
      >
        <div className="login-signup-block">
          <div className="close-button pointer" onClick={props.onHide}>
            <SvgHome name="close" />
          </div>
          <div className="kupos-card log-in-card ">
            <div className="user-icon kupos-go-modal-image">
              <img src="/images/icons/registration-done-circle.png" />
            </div>
            <div className="bold-text center-text font16">
              {"HOME.SUCCESS_SIGNUP_TITLE"}
            </div>

            {!props.oAuthSignup ? (
              <div
                className="center-text font11 light-text"
                style={{ margin: 20 }}
              >
                {"HOME.SUCCESS_SIGNUP_1"}
              </div>
            ) : null}

            <div
              className="center-text font11 light-text"
              style={{ margin: 20 }}
            >
              {"HOME.SUCCESS_SIGNUP_2"}
            </div>

            <div className="login-signup-button font12">
              <button
                className="kupos-button signup-success"
                onClick={props.onHide}
              >
                <span>{"HOME.SIGNUP_SUCCESS_BUTTON"}</span>
              </button>
            </div>
          </div>
        </div>
      </KuposModal>
    </div>
  );
};

export default SignUpSuccessModal;
