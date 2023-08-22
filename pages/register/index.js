import React, { use, useState } from "react";

import ContentContainer from "../../components/ui/content-container/content-container";
import Image from "next/image";
import KuposCheckbox from "../../components/ui/checkbox/kupos-checkbox";
import MyButton from "../../components/ui/my-button";
import MyInput from "../../components/ui/my-input";
import classes from "./register.module.less";
import { useRouter } from "next/router";
import { RegisterUser } from "../../services/apis/apisAuth";
import CommonService from "../../services/commonService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSetRecoilState } from "recoil";
import { loginDataState } from "../../recoil/atoms/common";

const Register = () => {
  let router = useRouter();

  //recoil states
  const setLoginData = useSetRecoilState(loginDataState)

  const RegisterFunc = RegisterUser();
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [input, setInput] = useState({
    first_name: "",
    surname: "",
    Registrationnumber:"",
    birthdate: "",
    gender: "",
    post_code: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    policy: acceptPolicy,
  });
  const images = [
    "wall1.jpeg",
    "wall2.jpg",
    // "wall3.jpeg",
    // "wall4.jpeg",
    // "wall5.jpg",
    // "wall6.jpeg",
    // "wall1.jpeg",
    // "wall2.jpg",
    "wall3.jpeg",
    "wall4.jpeg",
    "wall5.jpg",
    "wall6.jpeg",
  ];
  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const inputChange = (val, type) => {
    let error = `${type}Error`; 
    setInput({ ...input, [type]: val, [error]: null });
  };
  const registerUser = () => {
    // if (window !== "undefined") {
    //   localStorage.setItem("registered_users", JSON.stringify(input));
    // }

    let errors = 0;
    
    let localInputState = CommonService.copyObject(input);

    if(input.first_name === ""){
       toast("Please enter your valid first name!");

      localInputState["nameError"] = "Please enter your first name!";
      errors++;
    }

    if(input.surname === ""){
      localInputState["surnameError"] = "Please enter your last name!";
      errors++;
    }
    if(input.registrationNumber === ""){
      localInputState["registrationNumberError"] = "Please enter your reg no!";
      errors++;
     }else{
      if(input.registrationNumber?.length !== 14){
     localInputState["registrationNumberError"] = "Please enter your valid reg no!";
    errors++;
      }}
    
    
    if(input.mobile === ""){
      localInputState["mobileError"] = "Please enter your mobile number!";
      errors++;
    }else{
      if(input.mobile?.length !== 10){
        localInputState["mobileError"] = "Please enter your valid mobile number!";
      errors++;
      }
    }

    if(input.email === ""){
      localInputState["emailError"] = "Please enter your email address!";
      errors++;

    }else{
      if(!CommonService.isEMailValid(input.email)){
        localInputState["emailError"] = "Please enter your valid email address!";
      errors++;
      }
    }
    
    if(input.password === ""){
      localInputState["passwordError"] = "Please enter your password!";
      errors++;
      
    }else{
      if(input.password?.length !== 8 ){
        localInputState["passwordError"] = "Please enter your valid password!";
        errors++; 
      }
    } 

    if(input.confirmPassword === ""){
      localInputState["confirmPasswordError"] = "Please enter your password!";
      errors++;
      
    }else {
      if(input.confirmPassword !== input.password){
        localInputState["confirmPasswordError"] = "Please enter your valid confirm password!";
        errors++; 
      }
    }
    

    setInput({...input, ...localInputState})


    if(errors > 0 ){
      return
    }

    let data = {
      name: input.first_name,
      l_name: input.surname,
      reg_number: input.registrationNumber,
      mobile: input.mobile,
      email: input.email,
      password: input.password,
    };
    console.log({ data });


    // return;

    RegisterFunc({
      callback: (res) => {
        console.log("Register func res", res);

        if(res?.data?.id){

          setLoginData(res.data)

          setTimeout(() => {
            router.push("/")
          }, 300)

        }
      },
      data: data,
    });
  };
  return (
    <div className={classes.main_container}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F96400"
          fill-opacity="1"
          d="M0,320L30,314.7C60,309,120,299,180,266.7C240,235,300,181,360,170.7C420,160,480,192,540,208C600,224,660,224,720,208C780,192,840,160,900,128C960,96,1020,64,1080,58.7C1140,53,1200,75,1260,96C1320,117,1380,139,1410,149.3L1440,160L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
        <ContentContainer>
          <div className={classes.top_heading}>
            <div className={classes.arrow} onClick={() => router.back()}>
              <Image
                src="/images/icons/home/left-arrow-white.png"
                alt=""
                height={20}
                width={30}
              />
            </div>
            <div className="font20 bold general-text white-text">
              Create a <span className="primary-text">COMPUTER CLUB</span> Profile
            </div>
            <div className="font10 white-text" style={{ marginTop: 12 }}>
              Already have an account? Login
            </div>
          </div>
          <div className={classes.main_wrapper}>
            <div className={classes.gallery_side}>
              <div className={classes.gallery_images}>
                {images.map((img) => {
                  return (
                    <>
                      <Image
                        className={classes.image}
                        src={`/images/home/wallpaper/${img}`}
                        height={200}
                        width={300}
                        alt=""
                      />
                    </>
                  );
                })}
              </div>
            </div>
            <div className={classes.register_side}>

      
              <div className={classes.inner_wrapper}>
                <div className={classes.register_heading}>Register Here</div>
                <MyInput
                  label="First Name"
                  placeholder="E.g Tanveer"
                  onChange={(val) =>
                    inputChange(val.target.value, "first_name")
                  }
                  value={input.first_name}
                  type="text"
                  error={input?.first_nameError}
                />
                <MyInput
                  label="Surname"
                  placeholder="E.g Ahmad"
                  onChange={(val) => inputChange(val.target.value, "surname")}
                  value={input.surname}
                  type="text"
                  error={input?.surnameError}
                />
                  <MyInput
                  label="Registration number/Employee id Number"
                  placeholder="E.g 1234567890"
                  onChange={(val) => inputChange(val.target.value, "registrationNumber")}
                  value={input.registrationNumber}
                  type="text"
                  error={input?.registrationNumberError}
                />
                <MyInput
                  label="Mobile"
                  placeholder="E.g 1234567890"
                  onChange={(val) => inputChange(val.target.value, "mobile")}
                  value={input.mobile}
                  type="text"
                  error={input?.mobileError}
                />
                <MyInput
                  label="Email"
                  placeholder="E.g someone@mail.com"
                  onChange={(val) => inputChange(val.target.value, "email")}
                  value={input.email}
                  type="text"
                  error={input?.emailError}
                />
                <MyInput
                  label="Password"
                  placeholder="E.g a227UK@9_b"
                  onChange={(val) => inputChange(val.target.value, "password")}
                  value={input.password}
                  type="password"
                  error={input?.passwordError}
                />
                <MyInput
                  label="Confirm Password"
                  placeholder="E.g a227UK@9_b "
                  onChange={(val) =>
                    inputChange(val.target.value, "confirmPassword")
                  }
                  value={input.confirmPassword}
                  type="password"
                  error={input?.confirmPasswordError}
                />
                <KuposCheckbox
                  label="I have read and understood the Terms & Conditions and Privacy Policy."
                  onChange={() => setAcceptPolicy(!acceptPolicy)}
                  checked={acceptPolicy}
                  
                />
                <MyButton
                  style={{
                    // width: "400px",
                    borderRadius: "20px",
                    // marginLeft: "20px",
                    marginTop: "20px",
                  }}
                  label="Register"
                  onClick={registerUser}
                />
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
