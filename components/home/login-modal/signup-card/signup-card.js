import React, { useState } from "react";
import { signUpLoading } from "../../../../recoil/atoms/common";
import CommonService from "../../../../services/commonService";
import KuposCheckbox from "../../../ui/checkbox/kupos-checkbox";
import KuposInput from "../../../ui/input/kupos-input";
import KuposModal from "../../../ui/kupos-modal/kupos-modal";
import SelectDropdown from "../../../ui/select-dropdown/select-dropdown";
import SvgHome from "../../../ui/svg-home/svg-home";
import TermsAndConditions from "../../../ui/terms-and-conditions/terms-and-conditions";
import classes from "./signup-card.module.less";
import { useRecoilValue } from "recoil";

const initialState = {
  signupName: "",
  signupNameError: "",
  signupLastName: "",
  signupLastNameError: "",
  signupCardNumber: "",
  signupCardNumberError: "",
  signupCardType: { value: 7, label: "RUT" },
  signupEmail: "",
  signupEmailError: "",
  signupMobile: "",
  signupMobileError: "",
  signupCallingCode: "",
  signupPassword: "",
  signupPasswordError: "",
  signupConfirmPassword: "",
  signupConfirmPasswordError: "",
  recieveOffer: false,
  termsAndCondionsError: "",
  showTNCModel: false,
  signupCallingCode: "+56",
  idCardTypesSelect: [
    { value: 7, label: "RUT" },
    { value: 3, label: "DNI/Pasaporte" },
  ],
};

const SignUpCard = (props) => {
  const [state, setState] = useState(initialState);
  const loading = useRecoilValue(signUpLoading);

  const onSignupInputChange = (text, inp) => {
    if (inp == "name") {
      setState({ ...state, signupNameError: "", signupName: text });
    } else if (inp == "lastname") {
      setState({ ...state, signupLastNameError: "", signupLastName: text });
    } else if (inp == "email") {
      setState({ ...state, signupEmailError: "", signupEmail: text });
    } else if (inp == "mobile") {
      if (text) {
        text = CommonService.phoneNumberFormat(text);
      }
      setState({ ...state, signupMobileError: "", signupMobile: text });
    } else if (inp == "cardNumber") {
      setState({ ...state, signupCardNumberError: "" });
      if (text) {
        // let cardNumber = CommonService.isRut(this.state.signupCardType,this.idCardTypes) ? CommonService.formatRut(text) : text;
        setState({ ...state, signupCardNumber: text });
      } else {
        setState({ ...state, signupCardNumber: text });
      }
    } else if (inp == "cardType") {
      for (let item of props.idCardTypes) {
        item.selected = false;
      }
      text.selected = true;
      setState({
        ...state,
        signupCardNumberError: "",
        signupCardNumber: "",
        signupCardType: { value: text.value },
      });
    } else if (inp == "password") {
      setState({ ...state, signupPasswordError: "", signupPassword: text });
    } else if (inp == "confirmPassword") {
      setState({
        ...state,
        signupConfirmPasswordError: "",
        signupConfirmPassword: text,
      });
    }
  };

  const onSignupInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "name") {
        setState({ ...state, signupNameError: "VALIDATIONS.VALID_NAME" });
      } else if (inp == "lastname") {
        setState({
          ...state,
          signupLastNameError: "VALIDATIONS.VALID_SURNAME",
        });
      } else if (inp == "email") {
        setState({
          ...state,
          signupEmailError: "VALIDATIONS.VALID_NO_EMAIL",
        });
      } else if (inp == "password") {
        setState({
          ...state,
          signupPasswordError: "VALIDATIONS.VALID_PASSWORD",
        });
      } else if (inp == "confirmPassword") {
        setState({
          ...state,
          signupConfirmPasswordError: "VALIDATIONS.VALID_CONFIRM_PASSWORD",
        });
      } else if (inp == "mobile") {
        setState({
          ...state,
          signupMobileError: "VALIDATIONS.VALID_MOBILE",
        });
      } else if (inp == "cardNumber") {
        setState({
          ...state,
          signupCardNumberError: "VALIDATIONS.VALID_DOCUMENT_NUMBER",
        });
      }
      // } else if (inp == 'name') {
      //   if (text.length < 4) {
      //     setState({...state,
      //       signupNameError: {
      //         message: 'VALIDATIONS.VALID_NAME_LENGTH',
      //       },
      //     });
      //   }
    } else if (inp == "email") {
      if (!CommonService.isEMailValid(text)) {
        setState({
          ...state,
          signupEmailError: "VALIDATIONS.VALID_EMAIL_VALIDATION",
        });
      }
    } else if (inp == "password") {
      if (state.signupPassword.length < 4) {
        setState({
          ...state,
          signupPasswordError: "VALIDATIONS.VALID_PASSWORD_LENGTH",
        });
      }
    } else if (inp == "confirmPassword") {
      if (state.signupPassword != state.signupConfirmPassword) {
        setState({
          ...state,
          signupConfirmPasswordError:
            "VALIDATIONS.VALID_CONFIRM_PASSWORD_VALID",
        });
      }
    } else if (inp == "mobile") {
      if (state.signupMobile.toString().length != 9) {
        setState({
          ...state,
          signupMobileError: "VALIDATIONS.VALID_MOBILE_LENGTH_9",
        });
      }
    } else if (inp == "cardNumber") {
      let cardNumber =
        state.signupCardType.value == 7 ? CommonService.formatRut(text) : text;
      // let cardNumber = CommonService.formatRut(text);
      setState({ ...state, signupCardNumber: cardNumber });
      if (
        !CommonService.isRutValid(state.signupCardNumber) &&
        state.signupCardType.value == 7
      ) {
        setState({
          ...state,
          signupCardNumberError: "VALIDATIONS.VALID_RUT_VALID",
        });
      }
    }
  };
  const toggleTnCModal = () => {
    setState({ ...state, showTNCModel: !state.showTNCModel });
  };

  const isSignupValid = () => {
    let errorCount = 0;

    if (!state.signupName) {
      setState({
        signupNameError: "VALIDATIONS.VALID_NAME",
      });
      errorCount++;
      // } else if (state.signupName.length < 4) {
      //   setState({
      //     signupNameError: {
      //       message: 'VALIDATIONS.VALID_NAME_LENGTH',
      //     },
      //   });
      //   errorCount++;
    }
    if (!state.signupEmail) {
      setState({
        signupEmailError: "VALIDATIONS.VALID_EMAIL",
      });
      errorCount++;
    } else if (!CommonService.isEMailValid(state.signupEmail)) {
      setState({
        signupEmailError: "VALIDATIONS.VALID_EMAIL_VALIDATION",
      });
      errorCount++;
    }
    if (!state.signupPassword) {
      setState({
        signupPasswordError: "VALIDATIONS.VALID_PASSWORD",
      });
      errorCount++;
    } else if (state.signupPassword.length < 4) {
      setState({
        signupPasswordError: "VALIDATIONS.VALID_PASSWORD_LENGTH",
      });
      errorCount++;
    }
    if (state.signupPassword != state.signupConfirmPassword) {
      setState({
        signupConfirmPasswordError: "VALIDATIONS.VALID_CONFIRM_PASSWORD",
      });
      errorCount++;
    }
    if (!state.signupMobile) {
      setState({
        signupMobileError: "VALIDATIONS.VALID_MOBILE",
      });
      errorCount++;
    } else if (state.signupMobile.toString().length != 9) {
      setState({
        signupMobileError: "VALIDATIONS.VALID_MOBILE_LENGTH_9",
      });
      errorCount++;
    }
    // if(!state.gender){
    //     setState({
    //         genderError:{
    //             message:'Seleccionar Género'
    //         }
    //     })
    //     errorCount++;
    // }
    if (!state.signupCardNumber) {
      setState({
        signupCardNumberError: "VALIDATIONS.VALID_DOCUMENT_NUMBER",
      });
      errorCount++;
    } else if (
      !CommonService.isRutValid(state.signupCardNumber) &&
      state.signupCardType == 7
    ) {
      setState({
        signupCardNumberError: "VALIDATIONS.VALID_RUT_VALID",
      });
      errorCount++;
    }
    if (!state.recieveOffer) {
      setState({
        termsAndCondionsError: "VALIDATIONS.SELECT_TNC",
      });
      errorCount++;
    }
    if (errorCount <= 0) {
      return true;
    }
    return false;
  };

  const signup = () => {
    if (!isSignupValid()) {
      return;
    }

    let data = {
      name: state.signupName,
      last_name: state.signupLastName,
      email: state.signupEmail,
      password: state.signupPassword,
      phone: state.signupMobile,
      identity_type: state.signupCardType.value,
      identity_val: state.signupCardNumber,
      referrer_code: state.referCode ? state.referCode : "",
      gender: state.gender,
      is_kupos: true,
      // gender: this.state.gender || 'M',
      // device_details: this.props.data.deviceInfo
    };

    props.onSignup(data);
  };

  const onSubmitBackIcon = () => {
    setState(initialState);
    props.backIcon();
  };
  return (
    <div className="kupos-card log-in-card signup">
      <div className="back-arrow" onClick={onSubmitBackIcon}>
        <SvgHome name="back-arrow" />
      </div>

      <div className="bold-text center-text font16">
        {props.t("PROFILE.CREATE_ACCOUNT")}
      </div>
      <div className="login-signup-inputs row light-placeholder">
        <div className="login-signup-input col-md-6 no-pad font11">
          <KuposInput
            className="kupos-border"
            placeholder={props.t("PROFILE.ENTER_NAME")}
            t={props.t}
            onChange={(text) => onSignupInputChange(text, "name")}
            onBlur={(text) => onSignupInputBlur(text, "name")}
            value={state.signupName}
            error={state.signupNameError ? true : false}
            errorMessage={
              state.signupNameError ? props.t(state.signupNameError) : ""
            }
          />
        </div>

        <div className="login-signup-input col-md-6 no-pad font11">
          <KuposInput
            className="kupos-border"
            placeholder={props.t("PROFILE.ENTER_LAST_NAME")}
            t={props.t}
            onChange={(text) => onSignupInputChange(text, "lastname")}
            onBlur={(text) => onSignupInputBlur(text, "lastname")}
            value={state.signupLastName}
            error={state.signupLastNameError ? true : false}
            errorMessage={
              state.signupLastNameError
                ? props.t(state.signupLastNameError)
                : ""
            }
          />
        </div>
        {/* <div className="login-signup-input col-md-6 no-pad font11">
          <SelectDropdown
            readonly={true}
            height={40}
            // -----------------
            onChange={(val) => setState({ ...state, signupCardType: val })}
            options={state.idCardTypesSelect}
            selectedOption={state.signupCardType}
            t={props.t}
          />
        </div>
        <div className="login-signup-input col-md-6 no-pad font11">
          <KuposInput
            className="kupos-border "
            placeholder={props.t("PROFILE.DOCUMENT_NUMBER")}
            t={props.t}
            onChange={(text) => onSignupInputChange(text, "cardNumber")}
            onBlur={(text) => onSignupInputBlur(text, "cardNumber")}
            value={state.signupCardNumber}
            error={state.signupCardNumberError ? true : false}
            errorMessage={
              state.signupCardNumberError
                ? props.t(state.signupCardNumberError)
                : ""
            }
          />
        </div> */}

        <div className="login-signup-input col-md-12 no-pad font11">
          <KuposInput
            className="kupos-border"
            t={props.t}
            placeholder={props.t("PROFILE.ENTER_EMAIL")}
            onChange={(text) => onSignupInputChange(text, "email")}
            onBlur={(text) => onSignupInputBlur(text, "email")}
            value={state.signupEmail}
            error={state.signupEmailError ? true : false}
            errorMessage={
              state.signupEmailError ? props.t(state.signupEmailError) : ""
            }
            // disabled={this.oAuthEmail && state.signupEmail}
          />
        </div>

        <div className="login-signup-input col-md-12 no-pad font11">
          <KuposInput
            className="kupos-border"
            placeholder={props.t("PROFILE.PHONE_NUMBER")}
            t={props.t}
            onChange={(text) => onSignupInputChange(text, "mobile")}
            onBlur={(text) => onSignupInputBlur(text, "mobile")}
            focused={true}
            value={state.signupMobile}
            error={state.signupMobileError ? true : false}
            errorMessage={
              state.signupMobileError
                ? props.t(state.signupMobileError.message)
                : ""
            }
            disabled={props.loginType == "mobile" && state.signupMobile}
            codeandphone={false}
            countryCode={state.signupCallingCode}
            onCountryCodeChange={(text) =>
              onSignupInputChange(text, "country_code")
            }
          />
        </div>

        <div className="login-signup-input col-md-6 no-pad font11">
          <KuposInput
            className="kupos-border"
            type="password"
            t={props.t}
            placeholder={props.t("PROFILE.ENTER_PASSWORD")}
            onChange={(text) => onSignupInputChange(text, "password")}
            onBlur={(text) => onSignupInputBlur(text, "password")}
            value={state.signupPassword}
            error={state.signupPasswordError ? true : false}
            errorMessage={
              state.signupPasswordError
                ? props.t(state.signupPasswordError)
                : ""
            }
          />
        </div>
        <div className="login-signup-input col-md-6 no-pad font11">
          <KuposInput
            className="kupos-border"
            type="password"
            t={props.t}
            placeholder={props.t("PROFILE.CONFIRM_PASSWORD")}
            onChange={(text) => onSignupInputChange(text, "confirmPassword")}
            onBlur={(text) => onSignupInputBlur(text, "confirmPassword")}
            value={state.signupConfirmPassword}
            error={state.signupConfirmPasswordError ? true : false}
            errorMessage={
              state.signupConfirmPasswordError
                ? props.t(state.signupConfirmPasswordError)
                : ""
            }
          />
        </div>
      </div>

      <div className="login-terms flex-row font10">
        <span className="flex-row align-center">
          <KuposCheckbox
            t={props.t}
            checked={state.recieveOffer}
            onChange={() =>
              setState({
                ...state,
                recieveOffer: !state.recieveOffer,
                termsAndCondionsError: "",
              })
            }
          />
          <a onClick={() => setState({ ...state, showTNCModel: true })}>
            {props.t("PROFILE.TNC")}
          </a>
        </span>
        {state.termsAndCondionsError ? (
          <div className="errorMessageInput font8">
            {props.t(state.termsAndCondionsError)}
          </div>
        ) : null}
      </div>
      {props.signupErrorMessage ? (
        <div className="login-server-error font10 secondary-text">
          {props.signupErrorMessage}
        </div>
      ) : null}

      <div className="login-signup-button font12">
        <button disabled={loading} className="kupos-button" onClick={signup}>
          {loading ? (
            <div className="loader-cricle"></div>
          ) : (
            <span>{props.t("PROFILE.SIGN_UP")}</span>
          )}
        </button>
      </div>

      <KuposModal
        ariaLabel="tnc-pnr-modal-outer"
        size={"xl"}
        onHide={toggleTnCModal}
        showModal={state.showTNCModel}
      >
        <div className="tnc-pnr-modal">
          <TermsAndConditions />
          <div className="close-button pointer" onClick={toggleTnCModal}>
            <SvgHome name="close" />
          </div>
        </div>
      </KuposModal>
    </div>
  );
};

export default SignUpCard;
