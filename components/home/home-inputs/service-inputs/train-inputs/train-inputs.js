import React from "react";
import SelectDropdown from "../../../../ui/select-dropdown/select-dropdown";
import KuposDatePicker from "../../../../ui/date-picker/kupos-date-picker";
import DateService from "../../../../../services/dateService";
import classes from "./train-inputs.module.less";

const TrainInputs = ({
  t,
  transferSourceCityError,
  setTransferSourceCityError,
  selectedSearchApp,
  selectOptionsTrain,
  selectSourceCity,
  onSourceChange,
  onInputChange,
  sourcePlaceholder,
  sourceCityError,
  select1,
  select2,
  setSelect1,
  setSelect2,
  selectOptions2Train,
  getOriginSelectedFilteredDestinations,
  selectDestinationCity,
  onDestinationChange,
  onInputChange2,
  destinationPlaceholder,
  destinationCityError,
  onwardDate,
  onwardDateChange,
  dateError,
  returnDate,
  returnDateChange,
  searchTrenCentral,
  destinationRef,
}) => {
  transferSourceCityError ? setTransferSourceCityError(null) : null;

  return (
    <div className={classes.home_selection_input_boxes} key={selectedSearchApp}>
      <div className={classes.home_selection_input_box + " font10"}>
        <span className="label font11">{t("HOME.ORIGIN")}</span>
        <SelectDropdown
          reactSelect
          appType="train"
          selectType="origin"
          //   ref={(instance) => {
          //     // select1 = instance;
          //     setSelect1(instance);
          //   }}
          options={selectOptionsTrain}
          selectedOption={selectSourceCity}
          onChange={onSourceChange}
          onInputChange={(val) => onInputChange(val, "train")}
          icon="/images/icons/home/icon_source.png"
          hideArrow={true}
          error={sourceCityError ? true : false}
          errorMessage={t(sourceCityError)}
          placeholder={t("HOME.ORIGIN")}
          height={40}
          t={t}
        />
      </div>

      <div className={classes.home_selection_input_box + " font10"}>
        <span className="label font11">{t("HOME.DESTINATION")}</span>
        <SelectDropdown
          reactSelect
          selectRef={destinationRef}
          appType="train"
          selectType="destination"
          //   ref={(instance) => {
          //     select2 = instance;
          //     setSelect2(instance);
          //   }}
          //   options={selectOptions2Train}
          options={
            selectSourceCity
              ? getOriginSelectedFilteredDestinations(
                  selectOptions2Train,
                  selectSourceCity
                )
              : []
          }
          selectedOption={selectDestinationCity}
          onChange={onDestinationChange}
          onInputChange={(val) => onInputChange2(val, "train")}
          icon="/images/icons/home/icon_source2.png"
          hideArrow={true}
          error={destinationCityError ? true : false}
          errorMessage={t(destinationCityError)}
          placeholder={t("HOME.DESTINATION")}
          height={40}
          t={t}
        />
      </div>

      <div
        className={
          classes.home_selection_input_box + " " + classes.datebox + " font10"
        }
      >
        <span className="label font11">{t("HOME.ONE_WAY")}</span>
        <KuposDatePicker
          selectedDate={onwardDate}
          onDateChange={(date) => onwardDateChange(date)}
          minDate={DateService.getTodayString()}
          error={dateError ? true : false}
          errorMessage={dateError}
          placeholder={t("HOME.SELECT_DATE")}
        />
      </div>
      <div
        className={
          classes.home_selection_input_box + " " + classes.datebox + " font10"
        }
      >
        <span className="label font11 home-selection-input-box">
          {t("HOME.ROUND_TRIP")}
        </span>
        <KuposDatePicker
          selectedDate={returnDate}
          onDateChange={(date) => returnDateChange(date)}
          minDate={onwardDate}
          placeholder={t("HOME.OPTIONAL_DATE")}
          canEraseDate={true}
        />
        {returnDate && (
          <img
            className="pointer"
            onClick={() => returnDateChange("")}
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

      <div
        className={
          classes.home_selection_input_box + " " + classes.datebox + " font12"
        }
      >
        <button
          className="kupos-button home-selection-input-button "
          onClick={() => {
            searchTrenCentral();
          }}
        >
          <span>{t("HOME.SEARCH")}</span>
        </button>
      </div>
    </div>
  );
};

export default TrainInputs;
