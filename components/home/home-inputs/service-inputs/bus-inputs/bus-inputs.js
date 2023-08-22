// import { KuposDatePicker, KuposSelectBox } from '../../../common';
import KuposDatePicker from "../../../../ui/date-picker/kupos-date-picker";
import DateService from "../../../../../services/dateService";
import React, { useState } from "react";
import SelectDropdown from "../../../../ui/select-dropdown/select-dropdown";
import classes from "./bus-inputs.module.less";
import { uniqueBusCitiesState } from "../../../../../recoil/atoms/common";
import { useRecoilState, useRecoilValue } from "recoil";
import CommonService from "../../../../../services/commonService";
import { useRouter } from "next/router";
import { cityDestinationState, cityOriginState, dateOnwardState, dateReturnState } from "../../../../../recoil/atoms/pasajebus";

const BusInputs = ({
  t,
  selectedSearchApp,
  originCityError,
  destinationCityError,
  dateError,
  dateErrorReturn,
  onSearchClick
}) => {
  const router = useRouter();
  const uniqueBusCities = useRecoilValue(uniqueBusCitiesState);

  const [originCity, setSourceCity] = useRecoilState(cityOriginState)
  const [destinationCity, setDestinationCity] = useRecoilState(cityDestinationState)
  const [onwardDate, setOnwardDate] = useRecoilState(dateOnwardState)
  const [returnDate, setReturnDate] = useRecoilState(dateReturnState)

  const searchServices = () => {
    console.log({originCity, destinationCity, onwardDate, returnDate})
    let newRoute = `/pasajes-bus/${CommonService.encodeCity(originCity?.label)}/${CommonService.encodeCity(destinationCity?.label)}?date_onward=${onwardDate}${returnDate ? '&date_return='+returnDate : ''}`
    if(onSearchClick) onSearchClick(newRoute)
    router.push(newRoute);
  };

  return (
    <form>
      <div
        className={classes.home_selection_input_boxes}
        key={selectedSearchApp}
        // onClick={() => {
        //   setShowAtCounter(false);
        // }}
      >
        <div className={classes.home_selection_input_box + " font10"}>
          <span className="label font11">{t("HOME.ORIGIN")}</span>
          <SelectDropdown
            reactSelect
            selectType="origin"
            // ref={(instance) => {
            //   // select1 = instance;
            //   setSelect1(instance);
            // }}
            options={uniqueBusCities}
            // selectedOption={selectSourceCity}
            selectedOption={originCity}
            // onChange={onSourceChange}
            onChange={(city) => setSourceCity(city)}
            // onInputChange={onInputChange}
            icon="/images/icons/home/icon_source.png"
            hideArrow={true}
            error={originCityError ? true : false}
            errorMessage={t(originCityError)}
            placeholder={t("HOME.ORIGIN")}
            height={40}
            t={t}
          />
        </div>

        <div className={classes.home_selection_input_box + " font10"}>
          <span className="label font11">{t("HOME.DESTINATION")}</span>
          {/* <span className={classes.label + " font11"}>{"DESTINATION"}</span> */}
          <SelectDropdown
            reactSelect
            // selectRef={destinationRef}
            selectType="destination"
            // ref={(instance) => {
            //   // select2 = instance;
            //   setSelect2(instance);
            // }}
            options={
              originCity
                ? CommonService.getOriginSelectedFilteredDestinations(
                    uniqueBusCities,
                    originCity
                  )
                : null
            }
            selectedOption={destinationCity}
            onChange={(city) => setDestinationCity(city)}
            icon="/images/icons/home/icon_source2.png"
            hideArrow={true}
            error={destinationCityError ? true : false}
            errorMessage={t(destinationCityError)}
            placeholder={t("HOME.DESTINATION")}
            height={40}
            t={t}
          />
        </div>

        <div className={classes.home_selection_input_box + " font10 datebox"}>
          <span className="label font11">{t("HOME.ONE_WAY")}</span>
          <KuposDatePicker
            selectedDate={onwardDate}
            onDateChange={(date) => setOnwardDate(date)}
            minDate={DateService.getTodayString()}
            error={dateError ? true : false}
            errorMessage={dateError}
            // placeholder={t("HOME.SELECT_DATE")}
            placeholder={DateService.getTodayString()}
            t={t}
          />
        </div>
        <div className={classes.home_selection_input_box + " font10 datebox"}>
          <span className="label font11">{t("HOME.ROUND_TRIP")}</span>
          <KuposDatePicker
            selectedDate={returnDate}
            onDateChange={(date) => setReturnDate(date)}
            minDate={onwardDate}
            placeholder={t("HOME.OPTIONAL_DATE")}
            error={dateErrorReturn ? true : false}
            errorMessage={dateErrorReturn}
            canEraseDate={true}
            t={t}
          />
          {returnDate && (
            <img
              className="pointer"
              onClick={() => setReturnDate("")}
              src={"/images/icons/cross.png"}
              style={{
                width: 12,
                height: 12,
                resizeMode: "contain",
                position: "absolute",
                right: 7,
                bottom: 18,
              }}
            />
          )}
        </div>

        <div className={classes.home_selection_input_box + " font12 datebox"}>
          <span
            className="kupos-button home-selection-input-button "
            onClick={() => searchServices()}
            type="onSubmit"
          >
            <span>{t("HOME.SEARCH")}</span>
          </span>
        </div>
      </div>
    </form>
  );
};

export default BusInputs;
