import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContentContainer from "../../components/ui/content-container/content-container";
import KuposInput from "../../components/ui/input/kupos-input";
import classes from "./contact-us.module.less";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import KuposButton from "../../components/ui/kupos-button";
import  Image  from "next/image";



const ContactForm = () => {
  const { t } = useTranslation("common");

  const [name, setName] = useState({ val: "", error: "" });
  const [email, setEmail] = useState({ val: "", error: "" });
  const [message, setMessage] = useState({ val: "", error: "" });
  const [buttonClicked, setButtonClicked] = useState(false)

  const onChange = (value, type) => {
    if (type === "name") {
      setName({ ...name, val: value, error: null });
    } else if (type === "email") {
      setEmail({ ...email, val: value, error: null });
    } else if (type === "message") {
       setMessage({ ...message, val: value.target.value, error: null });
     }
  };

  const onBlur = (val, type) => {};

  console.log({name, email, message})

  const submitForm = () => {

    setButtonClicked(true)


    if(!name.val){
      setName({...name, error: "Enter Name!"})
      return;
    }
    if(!email.val){
      setEmail({...email, error: "Enter Email!"})
      return;
    }
    if(!message.val){
      setMessage({...message, error: "Enter Message"})
      return;
    }

    let data ={
      name : name.val,
      email: email.val,
      message: message.val
    }


    // apiCall
  };



  return (
    <ContentContainer>

<div className={classes.banner_container}>
          <Image src= '/images/home/home-banner.jpg' alt="" height={300} width={1800} />
        </div>
      <div className={classes.input_container}>
        <KuposInput
          className="kupos-border"
          type="default"
          t={t}
          placeholder={t("Enter Your Name")}
          onChange={(text) => onChange(text, "name")}
          onBlur={(text) => onBlur(text, "password")}
          value={name.val}
          error={name.error ? true : false}
          errorMessage={name.error ? t(name.error) : ""}
        />
      </div>

      <div className={classes.input_container}>
        <KuposInput
          className="kupos-border"
          type="default"
          t={t}
          placeholder={t("Enter your Email")}
          onChange={(text) => onChange(text, "email")}
          onBlur={(text) => onBlur(text, "email")}
          value={email.val}
          error={email.error ? true : false}
          errorMessage={email.error ? t(email.error) : ""}
        />
      </div>

      <div className={classes.input_container}>
        <textarea cols={100} rows={10} className={classes.textarea}
         onChange={(text) => onChange(text, "message")} value={message.val}></textarea>

         {message.error ? <span className={classes.error + " font8"}>{message.error}</span>: null}
         {/* placeholder={t("")} */}
          {/* onBlur={(text) => onBlur(text, "message")}  */}
           {/* value={message.val} */}
          {/* error={message.error ? true : false} */}
          {/* errorMessage={message.error ? t(message.error) : ""} */}
      </div>

      <div className={classes.button_container}>
      <KuposButton
        showLoader={buttonClicked}
        onClick={submitForm}
        className={classes.submit_button}>
        {t("SUBMIT")}
      </KuposButton>
      </div>
    </ContentContainer>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

// export const getStaticPaths = async () => {
//   return {
//       paths: [], //indicates that no page needs be created at build time
//       fallback: "blocking", //indicates the type of fallback
//   };
// };

export default ContactForm;
