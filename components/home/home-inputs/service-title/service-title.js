import classes from "./service-title.module.less";
import Image from "next/image";

const ServiceTitle = ({ t, selectedSearchApp, bipCashbackOffer }) => {
  switch (selectedSearchApp) {
    case 0:
      return (
        <div className={classes.selection_heading}>
          {t("HOME.INTERCITY_BUSSES.NORMAL")}
          <span className="bold-text">{t("HOME.INTERCITY_BUSSES.BOLD")}</span>
        </div>
      );
      break;
    case 2:
      return (
        <div className={classes.selection_heading}>
          {t("HOME.AIRPORT_TRANSFER.NORMAL")}{" "}
          <span className="bold-text">{t("HOME.AIRPORT_TRANSFER.BOLD")}</span>
        </div>
      );
      break;

    case 1:
      return (
        <div className={classes.selection_heading}>
          {t("HOME.TREN_CENTRAL.NORMAL")}
          <span className="bold-text">{t("HOME.TREN_CENTRAL.BOLD")}</span>
        </div>
      );
      break;

    case 3:
      return (
        <div className={classes.selection_heading}>
          <div className="display-flex-align-center">
            <div className="bip-nain-head">
              {t("HOME.BIP_RECHARGE.NORMAL")}{" "}
              <span className="bold-text">{t("HOME.BIP_RECHARGE.BOLD")}</span>
            </div>

            <div className="bip-offer-notice display-flex-align-center">
              <Image
                src="/images/general/bip_bell.svg"
                width={50}
                height={50}
              />
              <span className="bold-text secondary-text font10 bip-offer-title">
                {t("HOME.BIP_DISCOUNT")}
                {/* {bipCashbackOffer} */}
              </span>
            </div>
          </div>
        </div>
      );
      break;

    case 4:
      return (
        <div className={classes.selection_heading + " pt-3"}>
          {t("HOME.SPECIAL_SERVICES.NORMAL")}
          <span className="bold-text pb-1">
            {t("HOME.SPECIAL_SERVICES.BOLD")}
          </span>
          <div className="black-text font10 pb-4 pt-3 d-block">
            {t("HOME.SPECIAL_SERVICES_TWO")}
          </div>
        </div>
      );
      break;
    default:
      return (
        <div className={classes.selection_heading}>
          {t("HOME.INTERCITY_BUSSES.NORMAL")}{" "}
          <span className="bold-text">{t("HOME.INTERCITY_BUSSES.BOLD")}</span>
        </div>
      );
      break;
  }
};

export default ServiceTitle;
