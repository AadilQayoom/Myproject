import React from "react";
import KuposInput from "../../../../ui/input/kupos-input";
import SelectDropdown from "../../../../ui/select-dropdown/select-dropdown";
import classes from "./bip-inputs.module.less";

const BipInputs = ({
  t,
  transferSourceCityError,
  setTransferSourceCityError,
  selectedSearchApp,
  setBipInfoModalShow,
  bipCardNumber,
  onBipDetailsChange,
  onBipDetailsBlur,
  bipCardNumberError,
  bipRutNumber,
  bipRutNumberError,
  bipCardAmount,
  bipCardAmountError,
  bipCardEmail,
  bipCardEmailError,
  bipCardConfirmEmail,
  bipCardConfirmEmailError,
  searchBip,
  selectedBipMethod,
  selectedBipMethodError,
}) => {
  // transferSourceCityError ? setState({ transferSourceCityError: null }) : null;
  transferSourceCityError ? setTransferSourceCityError(null) : null;
  console.log({ t });

  const methods = [
    { id: 0, name: "N° de Rut", label: "N° de Rut", value: "RUT_NUMBER" },
    {
      id: 1,
      name: "N° de tarjeta",
      label: "N° de tarjeta",
      value: "CARD_NUMBER",
    },
  ];

  return (
    <div
      className={classes.home_selected_bip_container}
      key={selectedSearchApp}
    >
      {/* <div className="home-selection-input-box font10">
        <span className="font11 home-selection-input-box">{t('HOME.BIP_CARD_NUMBER')}</span>
        <KuposInput
          placeholder="xxxxxxxx"
          type="text"
          fontSize={'font10'}
          className="bip-input-height kupos-border "
          iconRight="/images/info.svg"
          iconRightClick={() => setBipInfoModalShow(true)}
          onSideClick={() => setBipInfoModalShow(false)}
          value={bipCardNumber}
          onChange={text => onBipDetailsChange(text, 'card_number')}
          onBlur={text => onBipDetailsBlur(text, 'card_number')}
          error={bipCardNumberError ? true : false}
          errorMessage={bipCardNumberError ? t(bipCardNumberError.message) : null}
        />
      </div> */}

      <div className={classes.home_selection_input_box + " font10"}>
        <span className="font11 home-selection-input-box">
          {t("HOME.BIP_RECHARGE_TYPE")}
        </span>
        <SelectDropdown
          options={methods}
          selectedOption={selectedBipMethod ? selectedBipMethod : methods[0]}
          onChange={(val) => onBipDetailsChange(val, "selected_method")}
          height={43}
          showAll={true}
          readonly={true}
          hideArrow={true}
          t={t}
          marginTop={0.1}
          key={selectedBipMethod && selectedBipMethod.value}
          error={selectedBipMethodError ? true : false}
          errorMessage={
            selectedBipMethodError ? selectedBipMethodError.message : null
          }
        />
      </div>

      {!selectedBipMethod ||
      (selectedBipMethod && selectedBipMethod.value === "RUT_NUMBER") ? (
        <div className={classes.home_selection_input_box + " font10"}>
          <span className="font11 home-selection-input-box">
            {t("HOME.RUT")}
          </span>
          <KuposInput
            placeholder="xx.xx.xxx-x"
            type="text"
            fontSize={"font10"}
            className="bip-input-height kupos-border "
            // iconRight="/images/info.svg"
            // iconRightClick={() => setBipInfoModalShow(true)}
            // onSideClick={() => setBipInfoModalShow(false)}
            value={bipRutNumber}
            onChange={(text) => onBipDetailsChange(text, "rut_number")}
            onBlur={(text) => onBipDetailsBlur(text, "rut_number")}
            error={bipRutNumberError ? true : false}
            errorMessage={
              bipRutNumberError ? t(bipRutNumberError.message) : null
            }
          />
        </div>
      ) : (
        <div className={classes.home_selection_input_box + " font10"}>
          <span className="font11 home-selection-input-box">
            {t("HOME.BIP_CARD_NUMBER")}
          </span>
          <KuposInput
            placeholder="xxx xxx xx"
            type="text"
            fontSize={"font10"}
            className="bip-input-height kupos-border "
            iconRight="/images/info.svg"
            iconRightClick={() => setBipInfoModalShow(true)}
            onSideClick={() => setBipInfoModalShow(false)}
            value={bipCardNumber}
            onChange={(text) => onBipDetailsChange(text, "card_number")}
            onBlur={(text) => onBipDetailsBlur(text, "card_number")}
            error={bipCardNumberError ? true : false}
            errorMessage={
              bipCardNumberError ? t(bipCardNumberError.message) : null
            }
          />
        </div>
      )}

      {/* <div className={classes.home_selection_input_box + " font10"}>
        <span className="font11">{t('HOME.BIP_RECHARGE_AMOUNT')}</span>
        <KuposInput
          placeholder="CLP $xxxxx"
          type="text"
          className="bip-input-height kupos-border"
          fontSize={'font10'}
          value={bipCardAmount}
          onChange={(text) => onBipDetailsChange(text, 'card_amount')}
          onBlur={(text) => onBipDetailsBlur(text, 'card_amount')}
          error={bipCardAmountError ? true : false}
          errorMessage={bipCardAmountError ? t(bipCardAmountError.message) : null}
        />
      </div> */}

      <div className={classes.home_selection_input_box + " font10"}>
        <span className="font11">{t("HOME.BIP_RECHARGE_AMOUNT")}</span>
        <KuposInput
          placeholder="CLP $xxxxx"
          type="text"
          className="bip-input-height kupos-border"
          fontSize={"font10"}
          value={bipCardAmount}
          onChange={(text) => onBipDetailsChange(text, "card_amount")}
          onBlur={(text) => onBipDetailsBlur(text, "card_amount")}
          error={bipCardAmountError ? true : false}
          errorMessage={
            bipCardAmountError ? t(bipCardAmountError.message) : null
          }
        />
      </div>

      <div className={classes.home_selection_input_box + " font10"}>
        <span className="font11 h">{t("HOME.BIP_EMAIL_ID")}</span>
        <KuposInput
          placeholder="tucoreo@personal.com"
          type="email"
          fontSize={"font10"}
          className="bip-input-height kupos-border"
          // onChange={text => onBipEmailChange(text)}
          value={bipCardEmail}
          onChange={(text) => onBipDetailsChange(text, "email")}
          onBlur={(text) => onBipDetailsBlur(text, "email")}
          error={bipCardEmailError ? true : false}
          errorMessage={bipCardEmailError ? t(bipCardEmailError.message) : null}
        />
      </div>

      {/* <div className="home-selection-input-box font10">
        <span className="font11 ">{t('HOME.BIP_CONFIRM_EMAIL_ID')}</span>
        <KuposInput
          placeholder="tucoreo@personal.com"
          type="email"
          fontSize={'font10'}
          className="bip-input-height kupos-border"
          value={bipCardConfirmEmail}
          onChange={(text) => onBipDetailsChange(text, 'confirm_email')}
          onBlur={(text) => onBipDetailsBlur(text, 'confirm_email')}
          error={bipCardConfirmEmailError ? true : false}
          errorMessage={bipCardConfirmEmailError ? t(bipCardConfirmEmailError.message) : null}
        />
      </div> */}

      <div
        className={
          classes.home_selection_input_box + " " + classes.datebox + " font10"
        }
      >
        <button
          className="kupos-button home-selection-input-button "
          onClick={searchBip}
        >
          <span>{t("HOME.RECHARGE")}</span>
        </button>
      </div>
    </div>
  );
};

export default BipInputs;
