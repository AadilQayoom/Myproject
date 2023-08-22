import React, { useState } from "react";
import classes from "./login-options.module.less";
import SvgCircularIcons from "../../../ui/svg-circular-icons/svg-circular-icons";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import AppData from "../../../../services/appData";
import KuposModal from "../../../ui/kupos-modal/kupos-modal";
import SvgHome from "../../../ui/svg-home/svg-home";
import TermsAndConditions from "../../../ui/terms-and-conditions/terms-and-conditions";
import { Login } from "../../../../services/apis/apisPB";

// pls check line no 28-32, 108, 136 ,166

const initialState = {
  showTNCModel: false,
};
const LoginOptions = (props) => {
  const [state, setState] = useState(initialState);

  const toggleTnCModal = () => {
    setState({ ...state, showTNCModel: !state.showTNCModel });
  };

  const loginApiFunc = Login();

  const loginResponseFacebook = (res) => {
    let oauth_account = null;
    let oauth_token = null;
    let oAuthLogin = false;
    if (res.email) {
      // this.setState({
      //   email: res.email,
      //   emailError: null,
      //   disableEmail: true,
      // });
    }
    oAuthLogin = true;
    let oAuthType = "facebook";
    oauth_account = res.userID;
    oauth_token = res.accessToken;
    let facebookData = res;
    if (res.first_name) {
      let oAuthName = res.first_name.trim();
    }
    if (res.last_name || res.middle_name) {
      let oAuthLastName =
        (res.middle_name || "").trim() + " " + (res.last_name || "").trim();
    }
    let oAuthEmail = res.email;
    if (res.picture && res.picture.data) {
      let oAuthPic = res.picture.data.url;
    }
    let data = {
      email: state.email,
      password: state.password,
    };
    data.oauth_account = oauth_account;
    data.oauth_token = oauth_token;
    data.oauth_type = oAuthType;
    data.auth_info = { email: oAuthEmail };
    if (oauth_account) {
      loginApiCall();
    }

    console.log("Data received from FB", res);
  };

  const responseGoogle = (res) => {
    console.log("Data received from google", res);
    let oauth_account = null;
    let oauth_token = null;
    let oAuthLogin = false;
    if (res.profileObj) {
      oauth_account = res.googleId;
      let oauth_token = res.tokenId;
      // let facebookData = res;
      let oAuthLogin = true;
      let oAuthType = "google";
      let oAuthName = res.profileObj.givenName;
      let oAuthLastName = res.profileObj.familyName;
      let oAuthEmail = res.profileObj.email;
      let oAuthPic = res.profileObj.imageUrl;
      localStorage.setItem("googleAccessToken", res.accessToken);
    }
    // alert(JSON.stringify(res));

    let data = {
      email: state.email,
      password: state.password,
    };
    data.oauth_account = oauth_account;
    data.oauth_token = oauth_token;
    data.oauth_type = oAuthType;
    data.auth_info = { email: oAuthEmail };
    if (oauth_account) {
      loginApiCall(data);
    }
  };

  const loginApiCall = (data) => {
    // call an login api
    loginApiFunc({
      data,
      callback: (res) => props.onLoginResponse(res),
    });
  };

  return (
    <div className="kupos-card log-in-card ">
      <div className="user-icon">
        <SvgCircularIcons name="user-orange" />
      </div>
      <div className="bold-text center-text font16">
        {props.t("PROFILE.LOG_IN_HEADING")}
      </div>

      <div className="center-text font11 light-text" style={{ marginTop: 10 }}>
        {props.t("PROFILE.LOGIN_MESSAGE1")}
        <span className="bold-text pointer" onClick={toggleTnCModal}>
          {" "}
          {props.t("PROFILE.LOGIN_MESSAGE2")}
        </span>
        {props.t("PROFILE.LOGIN_MESSAGE3")}
        <span className="bold-text pointer" onClick={toggleTnCModal}>
          {props.t("PROFILE.LOGIN_MESSAGE4")}
        </span>
      </div>

      <div className="login-signup-inputs">
        {/* <div
          className="login-signup-button option-buttons font12 "
          style={{ position: "relative" }}
        >
          <button
            // disabled={props.common.loginPending}
            className="kupos-button login_option-button facebook"
          >
            <div className="inner-button-login-options">
              <div
                style={{
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/images/login/fb.png" />
              </div>
              <span>{props.t("PROFILE.FACEBOOK_LOGIN")}</span>
            </div>
          </button>
          <span className="hidden-fb-login-button">
            <FacebookLogin
              appId={AppData.FB_APP_ID} //APP ID NOT CREATED YET
              fields="name,email,picture.height(400),first_name,middle_name,last_name"
              autoLoad={false}
              callback={loginResponseFacebook}
            />
          </span>
        </div> */}

        {/* <div className="login-signup-button option-buttons font12 relative ">
          <button
            // disabled={props.common.loginPending}
            className="kupos-button login_option-button google"
          >
            <div className="inner-button-login-options">
              <div
                style={{
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/images/login/google_reg.png" />
              </div>
              <span>{props.t("PROFILE.GOOGLE_LOGIN")}</span>
            </div>
          </button>
          <span className="hidden-fb-login-button">
            <GoogleLogin
              // clientId="369861062906-8s5lt8tvto7tls969nivt5bcjkpa706s.apps.googleusercontent.com"
              clientId="730867902568-lif64blhv270832luvpfaln2ll76u5gm.apps.googleusercontent.com"
              autoLoad={false}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              redirectUri="postmessage"
            />
          </span>
        </div> */}
        <div className="login-signup-button option-buttons font12">
          <button
            // disabled={props.common.loginPending}
            className="kupos-button login_option-button"
            onClick={() => {
              props.onLoginTypeClick("LOGIN", "mobile");
            }}
          >
            <div className="inner-button-login-options">
              <div
                style={{
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/images/login/phone-text.png" />
              </div>
              <span>{props.t("PROFILE.PHONE_LOGIN")}</span>
            </div>
          </button>
        </div>

        <div className="login-signup-button option-buttons font12">
          <button
            style={{ backgroundColor: "#F6E8E0" }}
            className="kupos-button login_option-button"
            onClick={() => {
              props.onLoginTypeClick("LOGIN", "email");
            }}
          >
            <div className="inner-button-login-options">
              <div
                style={{
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img style={{ height: 16 }} src="/images//login/email.png" />
              </div>
              <span className="primary-text">
                {props.t("PROFILE.EMAIL_LOGIN")}
              </span>
            </div>
          </button>
        </div>
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

export default LoginOptions;
