import I18n from "i18next";
import { useState } from "react";
import classes from "./language-switch.module.less";

const LanguageSwitch = (props) => {
  const [language, setLanguage] = useState(typeof window !== 'undefined' ? localStorage.getItem("selectedLanguage") : 'es' )
  //   const changeLanguage = (lang) => {
  //     i18next.changeLanguage(lang);
  //     localStorage.setItem("selectedLanguage", lang);
  //     if (window.location.pathname.indexOf(`/${lang}/`) <= -1) {
  //       let path = window.location.pathname;
  //       if (lang === "en") {
  //         path = path
  //           .replace("/es/", `/${lang}/`)
  //           .replace("/pasajes-bus", "/bus-tickets")
  //           .replace("/pasajes-tren", "/train-tickets")
  //           .replace("/traslados", "/transfer")
  //           .replace("/carga-bip", "/bip-recharge")
  //           .replace("/viajes-especiales", "/private-transport");
  //         if (window.location.pathname.length < 4) {
  //           path = path.replace("/es", `/${lang}`);
  //         }
  //         this.props.history.push(path);
  //       } else {
  //         path = path
  //           .replace("/en/", `/${lang}/`)
  //           .replace("/bus-tickets", "/pasajes-bus")
  //           .replace("/train-tickets", "/pasajes-tren")
  //           .replace("/transfer", "/traslados")
  //           .replace("/bip-recharge", "/carga-bip")
  //           .replace("/private-transport", "/viajes-especiales");
  //         if (window.location.pathname.length < 4) {
  //           path = path.replace("/en", `/${lang}`);
  //         }
  //         this.props.history.push(path);
  //       }
  //     }
  //   };

  const changeLanguage = (lang) => {
    I18n.changeLanguage(lang);
    if (typeof window !== 'undefined')
      localStorage.setItem("selectedLanguage", lang);
    console.log(I18n)
    setLanguage(lang)
  };

  return (
    <div
      className={
        classes.language_changer_switch +
        " font10" +
        (props.logoType == 1 ? "" : "border")
      }
      key={language}
    >
      <div
        onClick={() => changeLanguage("es")}
        className={
          classes.language_item +
          " " +
          (language == "es" ? classes.active : "") //todo
        }
      >
        ES
      </div>
      <div
        onClick={() => changeLanguage("en")}
        className={
          classes.language_item + " " +
          (language == "en" ? classes.active : "")
        }
      >
        EN
      </div>
    </div>
  );
};

export default LanguageSwitch;
