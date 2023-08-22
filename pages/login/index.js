import React, { useEffect } from "react";

import CommonService from "../../services/commonService";
import Image from "next/image";
import KuposCheckbox from "../../components/ui/checkbox/kupos-checkbox";
import { LoginUser } from "../../services/apis/apisAuth";
import MyButton from "../../components/ui/my-button";
import MyInput from "../../components/ui/my-input";
import classes from "./login.module.less";
import { loginDataState } from "../../recoil/atoms/common";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  let router = useRouter();

  const [loginData, setLoginData] = useRecoilState(loginDataState);

  const LoginFunc = LoginUser();

  const [forgotEmail, setForgotEmail] = useState("")
  const [staySigned, setStaySigned] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  let forgot = null;
  const [inputsdata, setInputsdata] = useState({
    login: "",
    password: "",
    checked: staySigned,
  });
  const getInput = (val, type) => {
    setInputsdata({ ...inputsdata, [type]: val });
  };


  useEffect(() => {
    if (loginData && loginData?.token) {
      router.push("/studentprofile");
    }
  }, [loginData]);

  console.log({ loginData });

  const proceedLogin = () => {
    console.log("login data", inputsdata);

    let data = {
      mobile: inputsdata.login,
      password: inputsdata.password,
    };

    LoginFunc({
      callback: (res) => {
        console.log("response from login api---", res);
        //save data to local store and recoil and move user to my account

        if (res && res.data && res.data.id) {
          setLoginData(res.data);
          // CommonService.setLocalEncryp("loginData", res.data);
          router.push("/");
        }
      },
      data: data,
    });
  };
  const proceedForgot = (val) => {
    forgot = val;
  };
  const gotoRegister = () => {
    router.push('/register')
  }


  // let start_date = "22/08/2023"


  // let startDayte = new Date(start_date).getTime()


  return (
    <>
      <div className={classes.main_wrapper}>
        {/* <ResetMyAccountData /> */}
        <div className={classes.left_side_and_arrow}>
          <div className={classes.arrow} onClick={() => router.back()}>
            <Image
              src="/images/icons/home/left-arrow-white.png"
              alt=""
              height={20}
              width={30}
            />
          </div>
          <div className={classes.left_side}>
            <div className={classes.logo}>
              <Image
                src={"/images/iustimages/image7.png"}
                width={100}
                height={50}
                alt=""
              />
            </div>
            <div className={classes.mid_way}>
              <div className={classes.title}>
                <span className="font20 bold">
                  Login to your COMPUTER CLUB account.
                </span>
              </div>
              <div className="font10 general-text">
                Too many passwords?
                <br />
                You can now login with an OTP we will send on your email address
                or verified mobile number. <br />
                <br />
                Access your COMPUTER CLUB account using your email address to add and
                verify your mobile number.
              </div>
            </div>

            <div className={classes.policy}>
              <span className="font8">
                COMPUTER CLUB .in - Cookie Policy and Privacy Policy
                <br />© COMPUTER CLUB  2023
              </span>
            </div>
          </div>
        </div>

        {forgotPassword ? <ForgotComponent setForgotPassword={setForgotPassword} forgotPassword={forgotPassword} forgotEmail={forgotEmail} setForgotEmail={setForgotEmail} proceedForgot={proceedForgot} /> : (
          <div className={classes.login_side}>
            <div className={classes.login_heading}>Login</div>
            <MyInput
              border={true}
              label="Email or Verified Mobile Number"
              placeholder="e.g. +91 70060xxxx"
              onChange={(val) => getInput(val.target.value, "login")}
              value={inputsdata.login}
              type="text"
              error={inputsdata?.loginError}

            />
            <MyInput
              border={true}
              label="Password"
              placeholder="e.g. +91 70060xxxx"
              onChange={(val) => getInput(val.target.value, "password")}
              value={inputsdata.password}
              type="password"
            // onRightIconClick={() => console.log("Hello")}
            />
            <div
              className={classes.option_links}
              onClick={() => setForgotPassword(true)}
            >
              <span className="font10 bold">Forgot your password?</span>
            </div>
            <div className={classes.stay_signed}>
              <KuposCheckbox
                label="Stay signed in until you sign out"
                onChange={() => setStaySigned(!staySigned)}
                checked={staySigned}
              />
            </div>
            <div className={classes.register_btn_wrapper + " font10"}>
              Don't have account ?{" "}
              <span className={classes.register_btn + " bold"} onClick={gotoRegister}>Register</span>
            </div>
            <div className={classes.button_container}>
              <MyButton
                label="Continue"
                onClick={proceedLogin}
                style={{
                  borderRadius: "20px",
                  background: "#F96400"

                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;



const ForgotComponent = ({ setForgotPassword, forgotPassword, setForgotEmail, forgotEmail, proceedForgot }) => {

  return (
    <div className={classes.forgot_wrapper}>
      <div className={classes.forgot_password}>
        <div
          onClick={() => setForgotPassword(!forgotPassword)}
          className={classes.go_back}
        >
          <Image
            src={"/images/general/left_arrow.png"}
            width={40}
            height={40}
            alt=""
          />
        </div>
        <MyInput
          border={true}
          label="Email or Mobile Number"
          onChange={(val) => setForgotEmail(val.target.value)}
          value={forgotEmail}
          type="text"
        />
        <MyButton
          label="Reset password"
          onClick={proceedForgot}
          style={{
            borderRadius: "20px",
            marginTop: "30px",
            background: "#F96400",
          }}
        />
      </div>
    </div>
  )
}