import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginLoading } from "../../../../recoil/atoms/common";
import CommonService from "../../../../services/commonService";
import KuposCheckbox from "../../../ui/checkbox/kupos-checkbox";
import KuposInput from "../../../ui/input/kupos-input";
import SvgCircularIcons from "../../../ui/svg-circular-icons/svg-circular-icons";
import SvgHome from "../../../ui/svg-home/svg-home";
import classes from "./login-card.module.less";

const initialState = {
  email: "",
  emailError: "",
  password: "",
  rememberMe: false,
};

const LoginCard = (props) => {
  const [state, setState] = useState(initialState);
  const loading = useRecoilValue(loginLoading);

  const onLoginInputChange = (text, inp) => {
    if (inp == "email") {
      setState({
        ...state,
        emailError: "",
        email:
          props.loginType === "email"
            ? text
            : CommonService.phoneNumberFormat(CommonService.onlyNumbers(text)),
      });
    } else if (inp == "password") {
      setState({ ...state, passwordError: null, password: text });
    }
  };

  const onLoginInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "email") {
        props.loginType == "mobile"
          ? setState({ ...state, emailError: "VALIDATIONS.VALID_MOBILE" })
          : setState({
              ...state,
              emailError: "VALIDATIONS.VALID_NO_EMAIL",
            });
      } else if (inp == "password") {
        setState({
          ...state,
          passwordError: "VALIDATIONS.VALID_PASSWORD",
        });
      }
    } else if (props.loginType === "email") {
      if (inp == "email") {
        if (!CommonService.isEMailValid(text)) {
          setState({ ...state, emailError: "VALIDATIONS.VALID_EMAIL" });
        }
      }
    }
  };

  const createAccount = () => {
    setState(initialState);
    props.createAccountText();
  };

  const submitForgotPassword = () => {
    setState(initialState);
    props.onForgotPasswordText();
  };

  const onLogin = (e) => {
    e.preventDefault();
    let errorCount = 0;
    if (!state.email) {
      props.loginType == "mobile"
        ? setState({ ...state, emailError: "VALIDATIONS.VALID_MOBILE" })
        : setState({ ...state, emailError: "VALIDATIONS.VALID_NO_EMAIL" });
      errorCount++;
    }
    if (props.loginType === "email") {
      if (!CommonService.isEMailValid(state.email)) {
        setState({ ...state, emailError: "VALIDATIONS.VALID_EMAIL" });
        errorCount++;
      }
    }
    if (!state.password) {
      setState({ ...state, passwordError: "VALIDATIONS.VALID_PASSWORD" });
      errorCount++;
    }
    if (errorCount > 0) {
      return;
    }

    let data = {
      password: state.password,
    };
    props.loginType == "email"
      ? (data.email = state.email)
      : (data.phone_no = state.email);
    props.loginType == "mobile"
      ? (data.is_phone = true)
      : (data.is_phone = false);

    props.onLogin(data);
  };

  return (
    <div className="kupos-card log-in-card ">
      <div className="back-arrow" onClick={props.backIcon}>
        <SvgHome name="back-arrow" />
      </div>
      <div className="user-icon">
        <SvgCircularIcons name="user-orange" />
      </div>
      <div className="bold-text center-text font16">
        {props.t("PROFILE.LOG_IN_HEADING")}
      </div>

      <div style={{ marginTop: 10 }} className="center-text font11 light-text">
        {props.loginType == "email"
          ? props.t("PROFILE.LOGIN_DETAILS")
          : props.t("PROFILE.LOGIN_WITH_PHONE")}
      </div>

      <form onSubmit={onLogin}>
        <div className="login-signup-inputs">
          {props.loginType == "email" ? (
            <div className="login-signup-input font11">
              <KuposInput
                className="kupos-border light-placeholder"
                placeholder={props.t("PROFILE.ENTER_EMAIL")}
                t={props.t}
                onChange={(text) => onLoginInputChange(text, "email")}
                onBlur={(text) => onLoginInputBlur(text, "email")}
                value={state.email}
                error={state.emailError ? true : false}
                errorMessage={state.emailError ? props.t(state.emailError) : ""}
              />
            </div>
          ) : (
            <div className="login-signup-inputs row light-placeholder">
              <div
                className="login-signup-input  col-md-12 no-pad font11 mobile-signup-input"
                style={{ marginBottom: 0 }}
              >
                {/* <div className="input-flag-img">
                  <img src={"/images/general/chile-flag.png"} />
                </div> */}
                <KuposInput
                  placeholder={props.t("PROFILE.ENTER_PHONE")}
                  t={props.t}
                  onChange={(text) => onLoginInputChange(text, "email")}
                  onBlur={(text) => onLoginInputBlur(text, "email")}
                  focused={true}
                  value={state.email}
                />
              </div>
              <div className="errorMessageInput font8">
                {state.emailError ? props.t(state.emailError) : ""}
              </div>
            </div>
          )}
          <div className="login-signup-input font11">
            <KuposInput
              className="kupos-border light-placeholder"
              placeholder={props.t("PROFILE.ENTER_PASSWORD")}
              // type="password"
              t={props.t}
              onChange={(text) => onLoginInputChange(text, "password")}
              onBlur={(text) => onLoginInputBlur(text, "password")}
              value={state.password}
              error={state.passwordError ? true : false}
              showPasswordIcon={true}
              password={true}
              errorMessage={
                state.passwordError ? props.t(state.passwordError) : ""
              }
            />
          </div>
          {props.loginErrorMessage ? (
            <div className="login-server-error font10 secondary-text">
              {props.loginErrorMessage}
            </div>
          ) : null}
        </div>

        <div className="login-terms flex-row font10">
          <span>
            <KuposCheckbox
              t={props.t}
              label="REMEMBER_ME"
              checked={state.rememberMe}
              onChange={() =>
                setState({ ...state, rememberMe: !state.rememberMe })
              }
            />
          </span>
          <a onClick={submitForgotPassword} className="primary-text">
            {props.t("PROFILE.FORGET_PASSWORD")}
          </a>
        </div>

        <div className="login-signup-button font12">
          <button disabled={loading} className="kupos-button" type="onSubmit">
            {loading ? (
              <div className="loader-cricle"></div>
            ) : (
              <span>{props.t("PROFILE.LOG_IN_HEADING")}</span>
            )}
          </button>
        </div>
      </form>

      <div className="register-link font10">
        <span>{props.t("PROFILE.DONT_HAVE_ACCOUNT")}</span>&nbsp;
        <a
          onClick={() => {
            createAccount();
          }}
        >
          {props.t("PROFILE.REGISTER")}
        </a>
      </div>
    </div>
  );
};

export default LoginCard;
