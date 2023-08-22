import React, { useEffect, useState } from "react";
import KuposModal from "../../ui/kupos-modal/kupos-modal";
import classes from "./login-modal.module.less";
import SvgHome from "../../ui/svg-home/svg-home";
import SvgCircularIcons from "../../ui/svg-circular-icons/svg-circular-icons";
import SignUpSuccessModal from "../../ui/sign-up-success-modal/sign-up-success-modal";
import CommonService from "../../../services/commonService";
import KuposErrorSuccessModal from "../../ui/kupos-error-success-modal/kupos-error-success-modal";
import KuposInput from "../../ui/input/kupos-input";
import LoginCard from "./login-card/login-card";
import SignUpCard from "./signup-card/signup-card";
import SignUpMobileCard from "./signup-mobile-card/signup-mobile-card";
import ResetPasswordCard from "./reset-passwrod-card/reset-passwrod-card";
import LoginOptions from "./login-options/login-options";
import {
  GenerateOtp,
  Login,
  ResetPassword,
  SignUp,
  ValidateOtp,
} from "../../../services/apis/apisPB";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  generateOtpPending,
  isLoggedInState,
  loginDataState,
  loginLoading,
  metaDataState,
  resetPasswordPendingState,
  signUpLoading,
  validateOtpPendingState,
} from "../../../recoil/atoms/common";
import { useTranslation } from "react-i18next";

// var global = window;
var global;

const modalInitalState = {
  showSuccessFailureModal: false,
  showSuccessFailureModalStatus: false,
  showSuccessFailureModalBodyText: "",
};

const initialState = {
  modalType: "LOGIN-OPTIONS",
  loginType: "",
  email: "",
  loginErrorMessage: "",
  signupErrorMessage: "",
  signupCallingCode: "+56",
  signupMobile: "",
  otp1: "",
  otp2: "",
  otp3: "",
  otp4: "",
  validateOtpError: "",
  forgotMobile: "",
  selectedForgotTab: 1,
  forgotEmail: "",
  forgotEmailError: "",
  showForgotSuccess: "",
  forgotErrorMessage: "",
  successfullRegistration: false,
};

const LoginModal = (props) => {
  const { t } = useTranslation("common");
  // states
  const [state, setState] = useState(initialState);
  const [modalState, setModalState] = useState(modalInitalState);
  const [successModal, setSuccessModal] = useState(false);
  const setLoginLoading = useSetRecoilState(loginLoading);
  const [validateOtpPending, setValidateOtpPending] = useRecoilState(
    validateOtpPendingState
  );

  const [resetPasswordPending, setResetPasswordPending] = useRecoilState(
    resetPasswordPendingState
  );

  const setSignUpLoading = useSetRecoilState(signUpLoading);
  const setLoginData = useSetRecoilState(loginDataState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setGenerateOtp = useSetRecoilState(generateOtpPending);
  const metaData = useRecoilValue(metaDataState);

  // apis

  const loginApiFunc = Login();
  const signUpApiFunc = SignUp();
  const generateOtpApiFunc = GenerateOtp();
  const validateOtpApiFunc = ValidateOtp();
  const resetPasswordApiFunc = ResetPassword();

  // this variables are here
  let idCardTypes = [];
  let backView = [];
  let oauth_token = "";
  let oAuthName = "";
  let oauth_account = "";
  let oAuthEmail = "";
  let oAuthLastName = "";

  useEffect(() => {
    if (metaData)
      for (let c in metaData.id_card_types) {
        idCardTypes.push({
          value: metaData.id_card_types[c],
          id: metaData.id_card_types[c],
          label: c,
          name: c,
          selected: metaData.id_card_types[c] == 7,
        });
      }
    resetData();
  }, []);

  const resetData = () => {
    oAuthName = "";
    oauth_account = "";
    oauth_token = "";
    oAuthEmail = "";
    oAuthLastName = "";
    setState(initialState);
  };

  const onLogin = (data) => {
    // call an login api
    setLoginLoading(true);
    setState({ ...state, loginErrorMessage: "" });

    loginApiFunc({
      data,
      callback: onLoginResponse,
    });
  };

  const onLoginResponse = (result) => {
    try {
      console.log("onLoginResponse", result);
      if (result.data && result.data.error) {
        if (state.modalType == "LOGIN-OPTIONS" && oauth_token) {
          backView.push(state.modalType);
          setState({
            ...state,
            modalType: "REGISTER",
            signupName: oAuthName,
            signupNameError: "",
            signupLastName: oAuthLastName,
            signupLastNameError: "",
            signupEmail: oAuthEmail,
            signupEmailError: "",
            signupMobile: "",
            signupMobileError: "",
            loginType: "oauth",
          });
        } else {
          setState({ ...state, loginErrorMessage: result.data.error });
          return;
        }
      } else if (result.data.auth_token) {
        // GlobalService.setGlobal('token',result.data.auth_token);
        global.token = result.data.auth_token;
        CommonService.storeLoginDetails(result.data, setLoginData);
        isLoggedInState(true);
        setTimeout(() => {
          // CommonService.toast.show("¡Sesión iniciada éxitosamente!");
          if (
            !CommonService.isBookingScreen() &&
            !CommonService.isATBookingScreen()
          )
            // props.history.push("/my-account");
            onHide();
          // props.onLoginSuccess();
          if (CommonService.isBookingScreen()) {
            // fillPassengerAutoData();
          }
          if (CommonService.isATBookingScreen()) {
            // props.fillAtData()
          }
        }, 300);
      } else {
        if (state.modalType == "LOGIN-OPTIONS" && oauth_token) {
          backView.push(state.modalType);
          setState({
            ...state,
            modalType: "REGISTER",
            signupName: oAuthName,
            signupNameError: "",
            signupLastName: oAuthLastName,
            signupLastNameError: "",
            signupEmail: oAuthEmail,
            signupEmailError: "",
            signupMobile: "",
            signupMobileError: "",
          });
        }
      }
    } catch (error) {
    } finally {
      setLoginLoading(false);
    }
  };

  const signup = (payloadData) => {
    if (oauth_account && oAuthType) {
      payloadData.oauth_account = oauth_account;
      payloadData.oauth_token = oauth_token;
      payloadData.oauth_type = oAuthType;
      payloadData.image_url = oAuthPic;
      payloadData.auth_info = { email: oAuthEmail };
    }
    setSignUpLoading(true);
    setState({ ...state, signupErrorMessage: "" });
    signUpApiFunc({
      data: payloadData,
      callback: onSignupResponse,
    });
  };

  const onSignupResponse = (result) => {
    try {
      if (result.data && result.data.error) {
        setState({ ...state, signupErrorMessage: result.data.error });
        // this.onHide();
        return;
      } else if (result.data && result.data.id) {
        // GlobalService.setGlobal('token',result.data.auth_token);
        // global.token = result.data.id;
        // CommonService.storeLoginDetails(result.data, props.actions.setLoginData);
        if (result.data.auth_token) {
          global.token = result.data.auth_token;
          CommonService.storeLoginDetails(result.data, setLoginData);
          setTimeout(() => {
            // CommonService.toast.show("¡Sesión iniciada éxitosamente!");
            if (
              !CommonService.isBookingScreen() &&
              !CommonService.isATBookingScreen()
            )
              if (CommonService.isBookingScreen()) {
                // props.history.push("/my-account");
                // this.setState({
                //   email: null,
                //   password: null,
                // });
                // fillPassengerAutoData();
              }
            if (CommonService.isATBookingScreen()) {
              // props.fillAtData()
            }
          }, 300);
        }
        setTimeout(() => {
          // CommonService.toast.show("¡Sesión iniciada éxitosamente!");
          this.setState({
            signupName: null,
            signupEmail: null,
            signupMobile: null,
            signupPassword: null,
            signupCardNumber: null,
            successfullRegistration: true,
          });
          onHide();
          // resetData();
          // props.onSignupSuccess();
        }, 300);
      }
    } catch (error) {
    } finally {
      setSignUpLoading(false);
    }
  };

  const generateOtp = (data) => {
    console.log("generateOtp", data);
    setGenerateOtp(true);
    generateOtpApiFunc({
      data,
      callback: onGenerateOtpResponse,
    });
  };

  const onGenerateOtpResponse = (res) => {
    try {
      if (res.data && res.data.status === 200) {
        backView.push(state.modalType);
        setState({ ...state, modalType: "OTP-REGISTER" });
      } else if (res.data) {
        setState({ ...state, signupMobileError: res.data.message });
      }
    } catch (error) {
    } finally {
      setGenerateOtp(false);
    }
  };

  const validateOtp = ({ countryCode, mobile, type }) => {
    if (!state.otp1 || !state.otp2 || !state.otp3 || !state.otp4) {
      return;
    }
    validateOtpApiFunc({
      data: {
        country_code: countryCode,
        mobile_number: mobile.toString(),
        cat_type: type,
        code: state.otp1 + "" + state.otp2 + "" + state.otp3 + "" + state.otp4,
      },
      callback: validateOtpResponse,
    });
  };

  const validateOtpResponse = (res) => {
    if (res.data && res.data.status === 200) {
      backView.push(state.modalType);
      setState({
        ...state,
        modalType: type == "sign_up" ? "REGISTER" : "RESET-PASSWORD",
      });
    } else {
      // console.log("Response is ", res);
      setState({
        ...state,
        // showSuccessFailureModal: true,
        // showSuccessFailureModalStatus: false,
        // showSuccessFailureModalBodyText: res.data.message,
        validateOtpError: res.data.message,
      });
    }
  };

  const renderOtpView = () => {
    return (
      <div className="login-signup-inputs row light-placeholder">
        <div className="login-signup-input  col-md-12 no-pad font11 mobile-signup-input no-border">
          <div className="flex-row otp-inps">
            <input
              value={state.otp1}
              ref="otp1"
              autoCorrect={false}
              type="password"
              onKeyUp={(el) => {
                let key = el.keyCode || el.charCode;
                // if (key == 39) this.refs.otp2.focus();
              }}
              onChange={(el) => {
                setState({
                  ...state,
                  otp1: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                if (el.target.value) this.refs.otp2.focus();
                else this.refs.otp1.focus();
              }}
            />
            <input
              value={state.otp2}
              ref="otp2"
              autoCorrect={false}
              type="password"
              onKeyUp={(el) => {
                let key = el.keyCode || el.charCode;
                // if (key == 8 || key == 46) this.refs.otp1.focus();
                // if (key == 37) this.refs.otp1.focus();
                // if (key == 39) this.refs.otp3.focus();
              }}
              onChange={(el) => {
                setState({
                  ...state,
                  otp2: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                // if (el.target.value) this.refs.otp3.focus();
                // else this.refs.otp1.focus();
              }}
            />
            <input
              value={state.otp3}
              ref="otp3"
              autoCorrect={false}
              type="password"
              onKeyUp={(el) => {
                let key = el.keyCode || el.charCode;
                // if (key == 8 || key == 46) this.refs.otp2.focus();
                // if (key == 37) this.refs.otp2.focus();
                // if (key == 39) this.refs.otp4.focus();
              }}
              onChange={(el) => {
                setState({
                  ...state,
                  otp3: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                // if (el.target.value) this.refs.otp4.focus();
                // else this.refs.otp2.focus();
              }}
            />
            <input
              value={state.otp4}
              ref="otp4"
              autoCorrect={false}
              type="password"
              onKeyUp={(el) => {
                let key = el.keyCode || el.charCode;
                // if (key == 8 || key == 46) this.refs.otp3.focus();
                // if (key == 37) this.refs.otp3.focus();
              }}
              onChange={(el) => {
                setState({
                  ...state,
                  otp4: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                // this.refs.otp4.focus();
                // if (el.target.value) this.refs.otp4.focus();
                // else this.refs.otp3.focus();
              }}
            />
          </div>
        </div>
        <div className="errorMessageInput font8 margin-auto">
          {state.validateOtpError ? state.validateOtpError : ""}
        </div>
      </div>
    );
  };

  const renderSignupOTPCard = () => {
    return (
      <div className="kupos-card log-in-card signup">
        <div
          className="back-arrow"
          onClick={() => {
            setState({ ...state, modalType: backView.pop() });
          }}
        >
          <SvgHome name="back-arrow" />
        </div>

        <div className="user-icon">
          <img src="/images/circular/forgot-circle.png" />
        </div>
        <div className="bold-text center-text font16">Verifica tu teléfono</div>
        <div
          style={{ marginTop: 10 }}
          className="center-text font11 light-text"
        >
          Ingresa el código de 4 dígitos que enviamos al número registrado.
        </div>
        {renderOtpView()}
        <div className="login-signup-button font12">
          <button
            disabled={validateOtpPending}
            className="kupos-button"
            onClick={() => {
              validateOtp({
                countryCode: state.signupCallingCode,
                mobile: state.signupMobile,
                type: "sign_up",
              });
            }}
          >
            {validateOtpPending ? (
              <div className="loader-cricle"></div>
            ) : (
              <span>{"RESULTS_PAGE.CONTINUE"}</span>
            )}
          </button>
        </div>
        <div className="register-link font10">
          <div>¿No recibiste el código? </div>
          <a
            onClick={() => {
              const data = {
                countryCode: state.signupCallingCode,
                mobile: state.signupMobile,
                type: "sign_up",
              };
              generateOtp(data);
            }}
          >
            Haz clic aquí para reenviar.
          </a>
        </div>
      </div>
    );
  };

  const onForgotInputChange = (text, inp) => {
    if (inp == "email") {
      setState({
        ...state,
        forgotErrorMessage: null,
        forgotEmailError: null,
        forgotEmail: text,
      });
    } else if (inp == "mobile") {
      setState({
        ...state,
        forgotErrorMessage: null,
        otpMobileError: null,
        forgotMobile: CommonService.phoneNumberFormat(text),
      });
    }
  };

  const onForgotInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "email") {
        setState({ ...state, forgotEmailError: "VALIDATIONS.VALID_EMAIL" });
      }
    } else if (inp == "email") {
      if (!CommonService.isEMailValid(text)) {
        setState({
          ...state,
          forgotEmailError: "VALIDATIONS.VALID_EMAIL_VALIDATION",
        });
      }
    }
  };

  const resetPassword = () => {
    let errorCount = 0;
    if (state.selectedForgotTab == 2) {
      if (!state.forgotEmail) {
        setState({ ...state, forgotEmailError: "VALIDATIONS.VALID_EMAIL" });
        errorCount++;
      } else if (!CommonService.isEMailValid(state.forgotEmail)) {
        this.setState({
          forgotEmailError: "VALIDATIONS.VALID_EMAIL",
        });
        errorCount++;
      }
      if (errorCount > 0) {
        return;
      }
      let data = {
        user: { email: state.forgotEmail },
      };

      resetPasswordApiFunc({
        data,
        callback: onForgotResponse,
      });
    } else {
      let errorCount = 0;
      if (!state.forgotMobile) {
        setState({ ...state, otpMobileError: "Ingresa tu número de teléfono" });
        errorCount++;
      } else if (state.forgotMobile.toString().length != 9) {
        setState({
          ...state,
          otpMobileError: "El teléfono debe contener mínimo 9 dígitos",
        });
        errorCount++;
      }
      if (errorCount > 0) {
        return;
      }

      generateOtpApiFunc({
        data: {
          country_code: this.state.signupCallingCode,
          mobile_number: this.state.forgotMobile.toString(),
          cat_type: "change_pwd_valid",
        },
        callback: (res) => {
          if (res.data && res.data.status === 200) {
            backView.push(this.state.modalType);
            setState({ ...state, modalType: "OTP-FORGOT" });
          } else {
            setState({ ...state, otpMobileError: res.data.message });
          }
        },
      });
    }
  };

  const onForgotResponse = (result) => {
    if (result.data && result.data.error) {
      setState({ ...state, forgotEmailError: result.data.error });
      return;
    } else if (result.data.message) {
      setState({ ...state, forgotEmail: "", showForgotSuccess: true });
    }
  };

  const renderForgotPasswordCard = () => {
    return !state.showForgotSuccess ? (
      <div className="kupos-card log-in-card forgot">
        <div
          className="back-arrow"
          onClick={() => {
            setState({
              ...state,
              modalType: backView.pop(),
              selectedForgotTab: 1,
              forgotEmail: null,
              forgotEmailError: null,
              forgotMobile: null,
              otpMobileError: null,
              forgotErrorMessage: null,
            });
          }}
        >
          <SvgHome name="back-arrow" />
        </div>

        <div className="user-icon">
          <SvgCircularIcons name="forgot-password" />
        </div>
        <div className="bold-text center-text font16">
          {t("PROFILE.RESET_PASSWORD_HEADING")}
        </div>

        <br />
        {state.selectedForgotTab == 1 ? (
          <div className="center-text font11 light-text">
            {t("PROFILE.RESET_DETAILS_PHONE")}
          </div>
        ) : (
          <div className="center-text font11 light-text">
            {t("PROFILE.RESET_DETAILS")}
          </div>
        )}

        <div className="forgot-tabs-container">
          <div className="kupos-tabs-container font10">
            <div
              className={
                "kupos-tab-item " +
                (state.selectedForgotTab == 1 ? "active" : "")
              }
              onClick={() =>
                setState({
                  ...state,
                  selectedForgotTab: 1,
                  forgotEmail: null,
                  forgotEmailError: null,
                  forgotMobile: null,
                  otpMobileError: null,
                  forgotErrorMessage: null,
                })
              }
            >
              {t("HOME.PHONE_NUMBER")}
            </div>
            <div
              className={
                "kupos-tab-item " +
                (state.selectedForgotTab == 2 ? "active" : "")
              }
              onClick={() =>
                setState({
                  ...state,
                  selectedForgotTab: 2,
                  forgotEmail: null,
                  forgotEmailError: null,
                  forgotMobile: null,
                  otpMobileError: null,
                  forgotErrorMessage: null,
                })
              }
            >
              {t("HOME.EMAIL_ID")}
            </div>
          </div>
        </div>
        <div className="login-signup-inputs">
          {state.selectedForgotTab == 2 ? (
            <div className="login-signup-input font11">
              <KuposInput
                className="kupos-border light-placeholder"
                placeholder={t("PROFILE.ENTER_EMAIL_FULL")}
                t={props.t}
                onChange={(text) => onForgotInputChange(text, "email")}
                onBlur={(text) => onForgotInputBlur(text, "email")}
                value={state.forgotEmail}
                error={state.forgotEmailError ? true : false}
                errorMessage={
                  state.forgotEmailError ? state.forgotEmailError.message : ""
                }
              />
            </div>
          ) : (
            <div className="login-signup-input light-placeholder">
              <div
                className="login-signup-input  col-md-12 no-pad font11 mobile-signup-input"
                style={{ marginBottom: 0 }}
              >
                {/* <div className="input-flag-img">
                  <img src={"/images/general/chile-flag.png"} />
                </div> */}
                <KuposInput
                  placeholder={t("PROFILE.ENTER_PHONE")}
                  t={props.t}
                  onChange={(text) => onForgotInputChange(text, "mobile")}
                  onBlur={(text) => onForgotInputBlur(text, "mobile")}
                  focused={true}
                  value={state.forgotMobile}
                />
              </div>
              <div className="errorMessageInput font8">
                {state.otpMobileError ? state.otpMobileError.message : ""}
              </div>
            </div>
          )}
          {state.forgotErrorMessage ? (
            <div className="login-server-error font10 secondary-text">
              {state.forgotErrorMessage}
            </div>
          ) : null}
        </div>

        <div className="login-signup-button font12">
          <button
            disabled={resetPasswordPending}
            className="kupos-button"
            onClick={resetPassword}
          >
            {resetPasswordPending ? (
              <div className="loader-cricle"></div>
            ) : (
              <span>{t("HOME.SEND")}</span>
            )}
          </button>
        </div>
      </div>
    ) : (
      <div className="kupos-card log-in-card forgot-success">
        <div className="user-icon">
          <img src="/images/general/circular-icons/icon-success.png" />
        </div>
        <div className="bold-text center-text font16">{"PROFILE.ALL_SET"}</div>
        <br />
        <div className="center-text font11 light-text">
          {t("PROFILE.RESET_SENT_EMAIL")}
        </div>
        <div className="login-signup-button font12">
          <button className="kupos-button" onClick={onHide}>
            <span>{t("PROFILE.OK_CONTINUE")}</span>
          </button>
        </div>
      </div>
    );
  };

  const renderForgotOTPCard = () => {
    return (
      <div className="kupos-card log-in-card signup">
        <div
          className="back-arrow"
          onClick={() => {
            setState({ ...state, modalType: backView.pop() });
          }}
        >
          <SvgHome name="back-arrow" />
        </div>

        <div className="user-icon">
          <SvgCircularIcons name="forgot-password" />
        </div>
        {/* <div className="bold-text center-text font16">
          {'PROFILE.RESET_PASSWORD')}
        </div> */}
        <div className="bold-text center-text font16">
          {"PROFILE.VERIFY_PHONE"}
        </div>
        <div
          style={{ marginTop: 10 }}
          className="center-text font11 light-text"
        >
          {"PROFILE.VERIFY_PHONE_DESC"}
        </div>
        {renderOtpView()}
        <div className="login-signup-button font12">
          <button
            disabled={validateOtpPending}
            className="kupos-button"
            onClick={() =>
              validateOtp({
                countryCode: state.signupCallingCode,
                mobile: state.forgotMobile,
                type: "change_pwd_valid",
              })
            }
          >
            {validateOtpPending ? (
              <div className="loader-cricle"></div>
            ) : (
              <span>{"RESULTS_PAGE.CONTINUE"}</span>
            )}
          </button>
        </div>
        <div className="register-link font10">
          <div>{"PROFILE.NOT_RECEIVED_CODE"}</div>
          <a onClick={() => resetPassword()}>{"PROFILE.CLICK_TO_RESEND"}</a>
        </div>
      </div>
    );
  };

  const changePassword = (resetPassword, resetConfirmPassword) => {
    try {
      validateOtpApiFunc({
        data: {
          country_code: state.signupCallingCode,
          mobile_number: state.forgotMobile.toString(),
          cat_type: "change_pwd",
          code:
            state.otp1 + "" + state.otp2 + "" + state.otp3 + "" + state.otp4,
          user: {
            password: resetPassword,
            password_confirmation: resetConfirmPassword,
          },
        },
        callback: (res) => {
          if (res.data && res.data.status === 200) {
            backView = [];
            modalState({
              showSuccessFailureModal: true,
              showSuccessFailureModalStatus: true,
              showSuccessFailureModalBodyText: res.data.message,
              modalType: "LOGIN-OPTIONS",
            });

            setState({ ...state, modalType: "LOGIN-OPTIONS" });
          } else {
            modalState({
              showSuccessFailureModal: true,
              showSuccessFailureModalStatus: false,
              showSuccessFailureModalBodyText: res.data.message,
            });
          }
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setValidateOtpPending(false);
    }
  };

  const onHide = () => {
    resetData();
    props.onHide();
  };

  const onLoginTypeClick = (modalType, loginType) => {
    resetData();
    setState({ ...state, modalType: modalType, loginType: loginType });
    backView.push(state.modalType);
  };

  const createAccountText = () => {
    backView.push(state.modalType);
    setState({
      ...state,
      modalType: state.loginType == "email" ? "REGISTER" : "MOBILE-REGISTER",
    });
  };

  const onForgotPasswordText = () => {
    backView.push(state.modalType);
    setState({ ...state, modalType: "FORGOT" });
  };

  const renderModalView = () => {
    switch (state.modalType) {
      case "LOGIN-OPTIONS":
        return (
          <LoginOptions
            onLoginTypeClick={onLoginTypeClick}
            t={t}
            onLoginResponse={onLoginResponse}
          />
        );
        break;
      case "LOGIN":
        return (
          <LoginCard
            t={t}
            loginType={state.loginType}
            onLogin={onLogin}
            createAccountText={createAccountText}
            onForgotPasswordText={onForgotPasswordText}
            backIcon={() =>
              setState({
                ...state,
                modalType: backView.pop(),
                loginErrorMessage: "",
              })
            }
            loginErrorMessage={state.loginErrorMessage}
          />
        );
        break;
      case "REGISTER":
        return (
          <SignUpCard
            t={t}
            loginType={state.loginType}
            idCardTypes={idCardTypes}
            onSignup={signup}
            backIcon={() =>
              setState({
                ...state,
                modalType: backView.pop(),
                signupErrorMessage: "",
              })
            }
            signupErrorMessage={state.signupErrorMessage}
          />
        );
        break;
      case "MOBILE-REGISTER":
        return (
          <SignUpMobileCard
            t={t}
            loginType={state.loginType}
            backIcon={() => setState({ ...state, modalType: backView.pop() })}
            generateOtp={generateOtp}
          />
        );
        break;
      case "OTP-REGISTER":
        return renderSignupOTPCard();
        break;
      case "OTP-FORGOT":
        return renderForgotOTPCard();
        break;
      case "RESET-PASSWORD":
        return (
          <ResetPasswordCard
            loginType={state.loginType}
            t={t}
            backIcon={() => setState({ ...state, modalType: backView.pop() })}
            changePassword={changePassword}
          />
        );
        break;
      case "FORGOT":
        return renderForgotPasswordCard();
        break;
      default:
        return (
          <LoginOptions
            onLoginTypeClick={onLoginTypeClick}
            t={t}
            onLoginResponse={onLoginResponse}
          />
        );
        break;
    }
  };

  // console.log(this.state);

  return (
    <div className={classes.common_login_modal}>
      <KuposModal
        showModal={props.showModal}
        onHide={onHide}
        size="md"
        ariaLabel="login-modal"
        backdrop={false}
      >
        <div className="login-signup-block">
          <div className="close-button pointer" onClick={onHide}>
            <SvgHome name="close" />
          </div>
          {renderModalView()}
        </div>
      </KuposModal>

      <SignUpSuccessModal
        showModal={successModal}
        onHide={() => {
          setSuccessModal(false);
          onHide();
        }}
        oAuthSignup={CommonService.isLoggedIn() ? true : false}
        t={props.t}
      />
      <KuposErrorSuccessModal
        showModal={modalState.showSuccessFailureModal}
        success={modalState.showSuccessFailureModalStatus}
        bodyText={modalState.showSuccessFailureModalBodyText}
        buttonText={"OK, CONTINUAR"}
        onButtonClick={() => {
          setModalState(modalInitalState);
        }}
      />
    </div>
  );
};

export default LoginModal;
