import React from "react";
import moment from "moment";
import KuposInput from "../../../../ui/input/kupos-input";
import KuposDateTimePicker from "../../../../ui/date-time-picker/date-time-picker";
import SelectDropdown from "../../../../ui/select-dropdown/select-dropdown";
import { kuposgoDataState } from "../../../../../recoil/atoms/common";
import { useRecoilState } from "recoil";
import DateService from "../../../../../services/dateService";

function KuposGoInputs({
  onKuposGoInputBlur,
  t,
  transferSourceCityError,
  setTransferSourceCityError,
  kuposGoObservations,
  kuposGoObservationsError,
  setKuposGoObservations,
  serviceList,
  //   kuposGoData,
  onKuposGoChangeFun,
  onKuposGoServiceInputChange,
  kuposGoServiceTypeError,
  vehicleList,
  onKuposGoTransportInputChange,
  kuposGoVehicleTypeError,
  kuposGoKuposError,
  setKuposGoOriginAddress,
  kuposGoOriginAddress,
  kuposGoSourceCityError,
  kuposGoTimeError,
  setKuposGoDestinationAddress,
  kuposGoDestinationAddress,
  kuposGoDestinationError,
  kuposGoNameError,
  kuposGoEmailError,
  kuposGoMobileError,
  kuposGoPostTripDetailsPending,
  kuposGoPostTripDetails,
  kuposGoDateReturnError,
  kuposGoTimeReturnError,
}) {
  transferSourceCityError ? setTransferSourceCityError(null) : null;

  const [kuposGoData, setKuposGoData] = useRecoilState(kuposgoDataState);

  const date = new Date();

  let daysOfCurrentMonth = "";
  let daysOfNextMonthOne = "";
  let daysOfNextMonthTwo = "";

  if (
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() !==
    date.getDate()
  ) {
    daysOfCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    daysOfNextMonthOne = new Date(
      date.getFullYear(),
      date.getMonth() + 2,
      0
    ).getDate();
    daysOfNextMonthTwo = new Date(
      date.getFullYear(),
      date.getMonth() + 3,
      0
    ).getDate();
  } else {
    daysOfCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 2,
      0
    ).getDate();
    daysOfNextMonthOne = new Date(
      date.getFullYear(),
      date.getMonth() + 3,
      0
    ).getDate();
    daysOfNextMonthTwo = new Date(
      date.getFullYear(),
      date.getMonth() + 4,
      0
    ).getDate();
  }

  const todaysDate = date.getDate();

  const maxDate =
    daysOfCurrentMonth - todaysDate + (daysOfNextMonthOne + daysOfNextMonthTwo);

  return (
    <div>
      <div className="kupos-go-row-1-new">
        <div className="col-1-new">
          <div className="home-selection-input-box font10">
            <span className="font11 black-text pb-1 d-inline-block">
              {t("HOME.ORIGIN")}
            </span>
            <KuposInput
              type="places"
              onTextChange={(val) => setKuposGoOriginAddress(val)}
              value={kuposGoOriginAddress}
              onChange={(val) => onKuposGoChangeFun(val, "origin")}
              onBlur={() => onKuposGoInputBlur("origin")}
              placeholder={t("HOME.ORIGIN")}
              icon="/images/icons/home/icon_source.png"
              error={kuposGoSourceCityError ? true : false}
              errorMessage={t(kuposGoSourceCityError)}
              height={40}
              fontSize={"font10"}
            />
          </div>
        </div>
        <div className="col-2-new">
          <div className="home-selection-input-box font10">
            <span className="font11 black-text pb-1 d-inline-block">
              {t("HOME.DESTINATION")}
            </span>
            <KuposInput
              type="places"
              onTextChange={(val) => setKuposGoDestinationAddress(val)}
              value={kuposGoDestinationAddress}
              onChange={(val) => onKuposGoChangeFun(val, "destination")}
              onBlur={() => onKuposGoInputBlur("destination")}
              placeholder={t("HOME.DESTINATION")}
              icon="/images/icons/home/icon_source2.png"
              error={kuposGoDestinationError ? true : false}
              errorMessage={t(kuposGoDestinationError)}
              height={40}
              fontSize={"font10"}
            />
          </div>
        </div>
        <div className="col-3-new">
          <span className="font11 black-text pb-1 d-inline-block">
            {t("HOME.ONE_WAY")}
          </span>
          <KuposDateTimePicker
            onDateChange={(val) => onKuposGoChangeFun(val, "date")}
            onTimeChange={(val) => onKuposGoChangeFun(val, "time")}
            showTimeInitially={true}
            selectedDate={kuposGoData.selectedDate}
            selectedTime={kuposGoData.selectedTime}
            startFromNextDate={true}
            maxDate={moment().add(maxDate, "days").format("DD-MM-YYYY")}
            minDate={DateService.getNextDayString()}
            t={t}
            error={kuposGoTimeError ? true : false}
            errorMessage={t(kuposGoTimeError)}
          />
        </div>
        <div className="col-4-new relative">
          <span className="font11 black-text pb-1 d-inline-block">
            {t("HOME.ROUND_TRIP")}
          </span>
          <KuposDateTimePicker
            onDateChange={(val) => {
              onKuposGoChangeFun(val, "date", 2);
            }}
            onTimeChange={(val) => onKuposGoChangeFun(val, "time", 2)}
            selectedDate={kuposGoData.selectedDateReturn}
            selectedTime={kuposGoData.selectedTimeReturn}
            returnDate={true}
            originDate={kuposGoData.selectedDate}
            startFromNextDate={true}
            maxDate={moment().add(maxDate, "days").format("DD-MM-YYYY")}
            minDate={kuposGoData.selectedDate}
            optional={kuposGoData.selectedDateReturn ? false : true}
            t={t}
            error={
              kuposGoDateReturnError
                ? true
                : kuposGoTimeReturnError
                ? true
                : false
            }
            errorMessage={t(kuposGoTimeReturnError)}
            timePickerTitle={t("HOME.SELECT_DATE")}
            canEraseDate={true}
          />
          {kuposGoData.selectedDateReturn && (
            <img
              className="pointer"
              onClick={() => {
                onKuposGoChangeFun("", "date", 2);
                onKuposGoChangeFun("", "time", 2);
              }}
              src={"/images/icons/cross.png"}
              style={{
                width: 12,
                height: 12,
                resizeMode: "contain",
                position: "absolute",
                right: 7,
                top: 38,
              }}
            />
          )}
        </div>
        <div className="col-5-new">
          <span className="font11 black-text pb-1 d-inline-block">
            {t("HOME.PASSENGER_NO")}
          </span>
          <KuposInput
            className="kupos-border"
            type="number"
            placeholder={t("VALIDATIONS.MINIMUM_PASSENGERS")}
            value={kuposGoData.selectedKupos}
            onChange={(val) => {
              onKuposGoChangeFun(val, "kupos");
            }}
            onBlur={() => onKuposGoInputBlur("kupos")}
            error={kuposGoKuposError ? true : false}
            errorMessage={t(kuposGoKuposError)}
            style={{ height: 40 }}
            inputOuterStyle={{ height: 40 }}
          />
        </div>
      </div>
      <div className="kupos-go-row-1-new">
        <div className="col-1-new">
          <div className="home-selection-input-box font10">
            <span className="font11 black-text pb-1 d-inline-block">
              {t("HOME.TYPE_OF_SERVICE")}
            </span>
            <SelectDropdown
              //   ref={instance => {
              //     // select1 = instance;
              //     setSelect1(instance);
              //   }}
              options={serviceList}
              selectedOption={t(kuposGoData.selectedServiceType)}
              onChange={(val) => onKuposGoChangeFun(val, "service_type")}
              onInputChange={onKuposGoServiceInputChange}
              onBlur={() => onKuposGoInputBlur("service_type")}
              placeholder={t("HOME.SELECT_TYPE_OF_SERVICE")}
              error={kuposGoServiceTypeError ? true : false}
              errorMessage={t(kuposGoServiceTypeError)}
              height={40}
              readonly={true}
              hideArrow={true}
              t={t}
            />
          </div>
        </div>
        <div className="col-2-new">
          <div className="home-selection-input-box font10">
            <span className="font11 black-text pb-1 d-inline-block">
              {t("HOME.TYPE_OF_VEHICLE")}
            </span>
            <SelectDropdown
              //   ref={instance => {
              //     // select2 = instance;
              //     setSelect2(instance);
              //   }}
              options={vehicleList}
              selectedOption={t(kuposGoData.selectedVehicleType)}
              onChange={(val) => onKuposGoChangeFun(val, "vehicle_type")}
              onBlur={() => onKuposGoInputBlur("vehicle_type")}
              onInputChange={onKuposGoTransportInputChange}
              placeholder={t("HOME.SELECT_TYPE_OF_VEHICLE")}
              error={kuposGoVehicleTypeError ? true : false}
              errorMessage={t(kuposGoVehicleTypeError)}
              height={40}
              readonly={true}
              hideArrow={true}
              t={t}
            />
          </div>
        </div>
        <div className="col-3-new">
          <span className="font11 black-text pb-1 d-inline-block">
            {t("HOME.NAME")}
          </span>
          <KuposInput
            className="kupos-border"
            type="text"
            placeholder="XXXXXX XXXXX"
            value={kuposGoData.name}
            onChange={(val) => onKuposGoChangeFun(val, "name")}
            onBlur={() => onKuposGoInputBlur("name")}
            error={kuposGoNameError ? true : false}
            errorMessage={t(kuposGoNameError)}
            style={{ height: 40 }}
            inputOuterStyle={{ height: 40 }}
          />
        </div>
        <div className="col-4-new relative">
          <span className="font11 black-text pb-1 d-inline-block">
            {t("HOME.EMAIL_ID")}
          </span>
          <KuposInput
            className="kupos-border"
            type="email"
            placeholder="ejemplo@gmail.com"
            value={kuposGoData.email}
            onChange={(val) => onKuposGoChangeFun(val, "email")}
            onBlur={() => onKuposGoInputBlur("email")}
            error={kuposGoEmailError ? true : false}
            errorMessage={t(kuposGoEmailError)}
            style={{ height: 40 }}
            inputOuterStyle={{ height: 40 }}
          />
        </div>
        <div className="col-5-new">
          <span className="font11 black-text pb-1 d-inline-block">
            {t("HOME.PHONE_NUMBER")}
          </span>
          <KuposInput
            className="kupos-border"
            type="tel"
            placeholder="+569XXXXXXXX"
            value={kuposGoData.mobile}
            onChange={(val) => onKuposGoChangeFun(val, "mobile")}
            onBlur={() => onKuposGoInputBlur("mobile")}
            error={kuposGoMobileError ? true : false}
            errorMessage={t(kuposGoMobileError)}
            style={{ height: 40 }}
            inputOuterStyle={{ height: 40 }}
          />
        </div>
      </div>
      <div className=" kupos-go-row-3-new d-flex flex-column">
        <span className="font11 black-text pb-2 d-inline-block">
          {t("HOME.OBSERVATIONS")}
        </span>
        <textarea
          name=""
          className="kupos-border"
          placeholder={t("HOME.OBSERVATIONS_PLACEHOLDER")}
          value={kuposGoObservations}
          onBlur={() => onKuposGoInputBlur("observations")}
          onChange={({ target }) => {
            setKuposGoObservations(target.value);
            onKuposGoChangeFun(target.value, "observations");
          }}
          id=""
          cols="30"
          rows="10"
        />
        {kuposGoObservationsError && (
          <div
            className="font8 mt-1"
            style={{
              color: "red",
            }}
          >
            {t(kuposGoObservationsError)}
          </div>
        )}
      </div>
      <p className="mt-2 font9 d-flex align-items-center">
        <img
          src="/images/info.svg"
          style={{
            width: 20,
          }}
          alt=""
        />
        <span className="ml-1">{t("HOME.OBSERVATIONS_INFO_TEXT.TEXT_1")}</span>
        &nbsp;
        <span className="bold-text">
          {t("HOME.OBSERVATIONS_INFO_TEXT.TEXT_2")}
        </span>
        &nbsp;
        <span>{t("HOME.OBSERVATIONS_INFO_TEXT.TEXT_3")}</span>
      </p>
      <div className="kupos-go-button-container">
        <button
          className="kupos-button kupos-go-button font11"
          disabled={kuposGoPostTripDetailsPending ? true : false}
          onClick={kuposGoPostTripDetails}
        >
          {kuposGoPostTripDetailsPending ? (
            <div className="loader-cricle"></div>
          ) : (
            <span>{t("HOME.SEND_REQUEST")}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default KuposGoInputs;
