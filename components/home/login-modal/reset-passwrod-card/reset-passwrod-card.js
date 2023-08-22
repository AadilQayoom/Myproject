import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { validateOtpPendingState } from "../../../../recoil/atoms/common";
import KuposInput from "../../../ui/input/kupos-input";
import SvgCircularIcons from "../../../ui/svg-circular-icons/svg-circular-icons";
import SvgHome from "../../../ui/svg-home/svg-home";
// import classes from "./reset-password-card.module.less";

// lines that need to be checked last line

const initialState = {
  resetPassword: "",
  resetPasswordError: "",
  resetConfirmPassword: "",
  resetConfirmPasswordError: "",
};

const ResetPasswordCard = (props) => {
  const [state, setState] = useState(initialState);
  const [validateOtpPending, setValidateOtpPending] = useRecoilState(
    validateOtpPendingState
  );

  const onResetInputChange = (text, inp) => {
    if (inp == "password") {
      setState({ ...state, resetPasswordError: "", resetPassword: text });
    } else if (inp == "confirmPassword") {
      setState({
        ...state,
        resetConfirmPasswordError: "",
        resetConfirmPassword: text,
      });
    }
  };

  const onResetInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "password") {
        setState({
          ...state,
          resetPasswordError: "VALIDATIONS.VALID_PASSWORD",
        });
      } else if (inp == "confirmPassword") {
        setState({
          ...state,
          resetConfirmPasswordError: "VALIDATIONS.VALID_CONFIRM_PASSWORD",
        });
      }
    } else if (inp == "password") {
      if (state.resetPassword.length < 4) {
        setState({
          ...state,
          resetPasswordError: "VALIDATIONS.VALID_PASSWORD_LENGTH",
        });
      }
    } else if (inp == "confirmPassword") {
      if (state.resetPassword != state.resetConfirmPassword) {
        setState({
          ...state,
          resetConfirmPasswordError: "VALIDATIONS.VALID_CONFIRM_PASSWORD_VALID",
        });
      }
    }
  };

  const onSubmit = () => {
    let errorCount = 0;
    if (!state.resetPassword) {
      setState({ ...state, resetPasswordError: "Ingresa tu contraseña" });
      errorCount++;
    } else if (state.resetPassword.length < 4) {
      setState({
        resetPasswordError: "La contraseña debe contener mínimo 6 dígitos",
      });
      errorCount++;
    }
    if (state.resetPassword != state.resetConfirmPassword) {
      setState({
        resetConfirmPasswordError: "Las contraseñas deben coincidir",
      });
      errorCount++;
    }
    if (errorCount > 0) {
      return;
    }
    setValidateOtpPending(true);
    props.changePassword(state.resetPassword, state.resetConfirmPassword);
  };

  return (
    <div className="kupos-card log-in-card signup">
      <div className="back-arrow" onClick={props.backIcon}>
        <SvgHome name="back-arrow" />
      </div>

      <div className="user-icon">
        <SvgCircularIcons name="forgot-password" />
      </div>
      <div className="bold-text center-text font16">
        {props.t("RESET_PASSWORD")}
      </div>
      <div style={{ marginTop: 10 }} className="center-text font11 light-text">
        {props.t("RESET_PASSWORD_DESC")}
      </div>
      <div className="login-signup-inputs">
        <div className="login-signup-input  col-md-12 no-pad font11">
          <KuposInput
            className="kupos-border"
            type="password"
            t={props.t}
            placeholder={props.t("ENTER_PASSWORD")}
            onChange={(text) => onResetInputChange(text, "password")}
            onBlur={(text) => onResetInputBlur(text, "password")}
            value={state.resetPassword}
            error={state.resetPasswordError ? true : false}
            errorMessage={
              state.resetPasswordError ? props.t(state.resetPasswordError) : ""
            }
          />
        </div>
        <div className="login-signup-input  col-md-12 no-pad font11">
          <KuposInput
            className="kupos-border"
            type="password"
            t={props.t}
            placeholder={props.t("CONFIRM_PASSWORD")}
            onChange={(text) => onResetInputChange(text, "confirmPassword")}
            onBlur={(text) => onResetInputBlur(text, "confirmPassword")}
            value={state.resetConfirmPassword}
            error={state.resetConfirmPasswordError ? true : false}
            errorMessage={
              state.resetConfirmPasswordError
                ? props.t(state.resetConfirmPasswordError)
                : ""
            }
          />
        </div>
      </div>
      <div className="login-signup-button font12">
        <button
          disabled={validateOtpPending}
          className="kupos-button"
          onClick={onSubmit}
        >
          {validateOtpPending ? (
            <div className="loader-cricle"></div>
          ) : (
            <span>{props.t("RESULTS_PAGE.CONTINUE")}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordCard;
