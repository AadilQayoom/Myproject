import React, { useState } from "react";
import { KuposDateTimePicker } from "../../../../ui/date-time-picker/date-time-picker";
import KuposHybridInput from "../../../../ui/hybrid-input/kupos-hybrid-input";
import {
  transferDataState,
  originState,
  destinationState,
  goingDateState,
  returnDateState,
} from "../../../../../recoil/atoms/airport";
import { useRecoilState } from "recoil";
import classes from "./transfer-inputs.module.less";
import DateService from "../../../../../services/dateService";
import CommonService from "../../../../../services/commonService";
import { useRouter } from "next/router";
import Image from "next/image";

const TransferInputs = ({
  selectedSearchApp,
  t,
  // atTerminals,
  destinationRef,
  atBlockTime = [{ value: 0 }],
}) => {
  const router = useRouter();
  const [transferData, setTransferData] = useRecoilState(transferDataState);
  const [
    showOriginTerminalSuggestions,
    setShowOriginTerminalSuggestions,
  ] = useState(false);
  const [
    showDestinationTerminalSuggestions,
    setShowDestinationTerminalSuggestions,
  ] = useState(false);
  const [originType, setOriginType] = useState(false);
  const [destinationType, setDestinationType] = useState(false);
  const [typeOfTerminal, setTypeOfTerminal] = useState("origin");
  const [pickupTerminal, setPickupTerminal] = useState(null);
  const [destinationTerminal, setDestinationTerminal] = useState(null);
  const [airportChoosen, setAirportChoosen] = useState(false);
  const [originError, setOriginError] = useState(null);
  const [destinationError, setDestinationError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [dateTimeError, setDateTimeError] = useState(null);
  const [returnDateTimeError, setReturnDateTimeError] = useState(null);
  const [atTerminals, setAtTerminals] = useState([
    {
      airport_loc_id: 174,
      airport_name:
        "ANF, Antofagasta, Chile -  Aeropuerto Andrés Sabella Gálvez",
      airport_address: "Camino a mejillones s/numero, Antofagasta",
      latitude: -23.4487583,
      longitude: -70.4430268,
    },
    {
      airport_loc_id: 182,
      airport_name: "ARI, Arica, Chile -  Aeropuerto Chacalluta",
      airport_address: "Ruta 12 3150, Arica, Arica y Parinacota, Chile",
      latitude: 0,
      longitude: 0,
    },
    {
      airport_loc_id: 176,
      airport_name: "CCP, Concepción, Chile -  Aeropuerto Carriel Sur",
      airport_address:
        "Av. Pdte. Jorge Alessandri Rodriguez 5001, Talcahuano, Bío Bío, Chile",
      latitude: -36.7772493,
      longitude: -73.0599903,
    },
    {
      airport_loc_id: 377,
      airport_name: "CPO, Caldera, Chile, Aeropuerto Desierto de Atacama",
      airport_address:
        "Aeropuerto Desierto de Atacama (CPO), Caldera, Atacama.",
      latitude: 0,
      longitude: 0,
    },
    {
      airport_loc_id: 178,
      airport_name: "IQQ, Iquique, Chile -  Aeropuerto Diego Aracena",
      airport_address: "Carretera 1, Iquique, I Región de Tarapacá, Chile",
      latitude: 0,
      longitude: 0,
    },
    {
      airport_loc_id: 180,
      airport_name: "LSC, La Serena, Chile -  Aeropuerto La Florida",
      airport_address: "41, La Serena, Región de Coquimbo, Chile",
      latitude: 0,
      longitude: 0,
    },
    {
      airport_loc_id: 177,
      airport_name: "PMC, Puerto Montt, Chile -  Aeropuerto El Tepua",
      airport_address:
        "Edificio Terminal de pasajeros Aeropuerto El Tepual, Puerto Montt, Los Lagos, Chile",
      latitude: -41.4337407,
      longitude: -73.09850349999999,
    },
    {
      airport_loc_id: 507,
      airport_name: "PNT Aeropuerto Teniente Julio Gallardo",
      airport_address: "Aeropuerto Puerto Natales",
      latitude: 0,
      longitude: 0,
    },
    {
      airport_loc_id: 179,
      airport_name:
        "PUQ, Punta Arenas, Chile -  Aeropuerto Presidente Carlos Ibáñez del Campo",
      airport_address:
        "KM 20.5, RN9 Norte, Punta Arenas, Magallanes y la Antártica Chilena, Chile",
      latitude: 0,
      longitude: 0,
    },
    {
      airport_loc_id: 173,
      airport_name: "SCL, Santiago, Chile - Aeropuerto Arturo Merino Benítez",
      airport_address:
        "Aviador David Fuentes, Pudahuel, Región Metropolitana, Chile",
      latitude: -33.397226,
      longitude: -70.794402,
    },
    {
      airport_loc_id: 866,
      airport_name: "ZAL, Valdivia, Chile - Aeropuerto Pichoy",
      airport_address: "Valdivia",
      latitude: 0,
      longitude: 0,
    },
    {
      airport_loc_id: 181,
      airport_name: "ZCO, Araucanía, Chile, Aeropuerto de la Araucania",
      airport_address: "Longitudinal Sur km 692, Freire, Chile",
      latitude: 0,
      longitude: 0,
    },
  ]);

  const [originText, setOriginText] = useRecoilState(originState);
  const [destinationText, setDestinationText] = useRecoilState(
    destinationState
  );
  const [goingDate, setGoingDate] = useRecoilState(goingDateState);
  const [returnDate, setReturnDate] = useRecoilState(returnDateState);
  // const [inputsData, setInputsData] = useState(transferData);

  console.log({ originText });
  console.log({ destinationText });

  function eraseSelectedInput() {}

  const onFocus = (type, event) => {
    if (type === "origin") {
      setShowOriginTerminalSuggestions(true);
      setOriginType(typeOfTerminal === "origin" ? "text" : "places");
    } else if (type === "destination") {
      setShowDestinationTerminalSuggestions(true);
      setDestinationType(typeOfTerminal === "destination" ? "text" : "places");
    }
  };

  const onBlur = (val, type) => {
    setTimeout(() => {
      if (type === "origin") {
        setShowOriginTerminalSuggestions(false);
      } else if (type === "destination") {
        setShowDestinationTerminalSuggestions(false);
      }
    }, 300);
  };

  const onChange = (val, type) => {
    switch (type) {
      case "origin":
        setOriginError(null);
        setTransferData({ ...transferData, selectedOrigin: val });
        setOriginText(val);
        break;
      case "destination":
        setDestinationError(null);
        setTransferData({ ...transferData, selectedDestination: val });
        setDestinationText(val);
        break;
      case "going_date":
        setDateError(null);
        setDateTimeError(null);
        setTransferData({ ...transferData, selectedGoingDate: val });
        break;
      case "going_time":
        setDateTimeError(null);
        setTransferData({ ...transferData, selectedGoingTime: val });
        break;
      case "return_date":
        setReturnDateTimeError(null);
        setTransferData({ ...transferData, selectedReturnDate: val });
        break;
      case "return_time":
        setReturnDateTimeError(null);
        setTransferData({ ...transferData, selectedReturnTime: val });
        break;
      default:
        break;
    }
  };

  console.log({ transferData });

  const onSelect = (val, type) => {
    if (type == "origin") {
      setShowOriginTerminalSuggestions(false);
      setPickupTerminal(val);
      setOriginText(val.airport_name);
      setOriginType("text");
      setAirportChoosen(true);
      setTransferData({ ...transferData, selectedOrigin: val });
    } else {
      setShowDestinationTerminalSuggestions(false);
      setDestinationTerminal(val);
      setDestinationText(val.airport_name);
      setDestinationType("text");
      setAirportChoosen(true);
      setTransferData({ ...transferData, selectedDestination: val });
    }
  };

  const renderATTerminals = (val, key, type) => {
    return (
      <div onClick={() => onSelect(val, type)}>
        <a key={key} className="at-terminal-item">
          {/* <img src="/images/icons/home/airport-icon.png" /> */}
          {val.airport_name}
        </a>
      </div>
    );
  };

  const clearDateTime = () => {
    setTransferData({
      ...transferData,
      selectedReturnDate: null,
      selectedReturnTime: null,
    });
  };

  const validateAndSearch = () => {
    let errorCount = 0;

    sessionStorage.removeItem("atGoingServiceToBook");
    sessionStorage.removeItem("atReturnServiceToBook");

    if (!transferData.selectedOrigin) {
      setOriginError("VALIDATIONS.VALID_ORIGIN_CITY");

      errorCount++;
    }

    if (!transferData.selectedDestination) {
      setDestinationError("VALIDATIONS.VALID_DESTINATION_CITY");
      errorCount++;
    }

    if (
      transferData.selectedOrigin &&
      transferData.selectedDestination &&
      transferData.selectedOrigin.address &&
      transferData.selectedDestination.address &&
      transferData.selectedOrigin.address ===
        transferData.selectedDestination.address
    ) {
      setDestinationError("VALIDATIONS.VALID_DESTINATION_CITY");

      errorCount++;
    }

    if (!transferData.selectedGoingDate || !transferData.selectedGoingTime) {
      setDateTimeError("VALIDATIONS.VALID_DATE");

      errorCount++;
    }

    var currentDate = new Date();

    let selectedDate = new Date(
      DateService.changeDateFormat(
        transferData.selectedGoingDate,
        "dd-mm-yyyy",
        "yyyy-mm-dd"
      ) +
        "T" +
        transferData.selectedGoingTime
    );

    if (
      selectedDate.getTime() <
      // currentDate.getTime() + 1000 * Number(atBlockTime && atBlockTime[0].value)
      currentDate.getTime() + 1000
    ) {
      setDateTimeError(
        router.locale === "en"
          ? "Anticipación mínima de" +
              Number(atBlockTime && atBlockTime[0].value) / 3600 +
              " horas"
          : "Anticipación mínima de" +
              Number(atBlockTime && atBlockTime[0].value) / 3600 +
              " horas"
      );

      errorCount++;
    }

    if (selectedDate && transferData.selectedReturnDate) {
      let returnDate = new Date(
        DateService.changeDateFormat(
          transferData.selectedReturnDate,
          "dd-mm-yyyy",
          "yyyy-mm-dd"
        ) +
          "T" +
          transferData.selectedReturnTime
      );

      if (returnDate.getTime() < selectedDate.getTime() + 1000 * 60 * 60 * 2) {
        setReturnDateTimeError("VALIDATIONS.VALID_LESS_TIME");

        errorCount++;
      }
    }

    if (errorCount <= 0) {
      sessionStorage.removeItem("airportTransferSelectedServiceToBook");
      sessionStorage.removeItem("airportTransferReturnServiceToBook");

      onSearchTransfer();
    }
  };

  const onSearchTransfer = () => {
    let origin = "";
    let destination = "";

    if (transferData.selectedOrigin && transferData.selectedOrigin.address) {
      origin = CommonService.encodeUrlAddress(
        CommonService.getAddressWithoutAccent(
          transferData.selectedOrigin.address
        )
      );
    } else {
      origin = CommonService.encodeUrlAddress(
        transferData.selectedOrigin.airport_name
      );
    }

    if (
      transferData.selectedDestination &&
      transferData.selectedDestination.address
    ) {
      destination = CommonService.encodeUrlAddress(
        CommonService.getAddressWithoutAccent(
          transferData.selectedDestination.address
        )
      );
    } else {
      destination = CommonService.encodeUrlAddress(
        transferData.selectedDestination.airport_name
      );
    }

    // sessionStorage.setItem("initTransferData", JSON.stringify(transferData));
    sessionStorage.setItem("transferData", JSON.stringify(transferData));

    transferData.selectedReturnDate
      ? router.push(
          // `/${i18next.language}/${
          `/${
            router.locale === "es" ? "traslados" : "transfer"
          }/${origin}/${destination}?going_date=${
            transferData.selectedGoingDate
          }&going_time=${transferData.selectedGoingTime}&return_date=${
            transferData.selectedReturnDate
          }&return_time=${
            !transferData.selectedReturnTime
              ? "00:00"
              : transferData.selectedReturnTime
          }&step=1`
        )
      : router.push(
          // `/${i18next.language}/${
          `/${
            router.locale === "es" ? "traslados" : "transfer"
          }/${origin}/${destination}?going_date=${
            transferData.selectedGoingDate
          }&going_time=${transferData.selectedGoingTime}`
        );
  };

  return (
    <div className={classes.home_selection_input_boxes} key={selectedSearchApp}>
      <div
        className={
          classes.home_selection_input_box +
          " " +
          classes.simple_input_box +
          " font10"
        }
      >
        <span className="label font11">{t("HOME.ORIGIN")}</span>
        <KuposHybridInput
          type={originType}
          value={originText}
          onTextChange={(val) => {
            setShowOriginTerminalSuggestions(val ? false : true);
            setOriginText(val);
          }}
          onChange={(val) => onChange(val, "origin")}
          placeholder={t("HOME.ORIGIN")}
          icon={
            setPickupTerminal
              ? "/images/icons/home/airport-icon.png"
              : "/images/icons/home/icon_source.png"
          }
          error={originError ? true : false}
          errorMessage={t(originError)}
          height={40}
          fontSize="font11"
          erasable={true}
          onFocus={(event) => onFocus("origin", event)}
          onBlur={(val) => onBlur(val, "origin")}
          eraseSelectedInput={() => eraseSelectedInput("origin")}
          t={t}
          // ref={'atOriginRef'}
        />

        {atTerminals && showOriginTerminalSuggestions && !airportChoosen && (
          <div className="at-termninal-suggestions auto-suggestions font10 scroll-style">
            {atTerminals &&
              atTerminals
                .sort((a, b) => b.airport_name.localeCompare(a.airport_name))
                .map((val, key) => {
                  return renderATTerminals(val, key, "origin");
                })}
          </div>
        )}
      </div>

      <div
        className={
          classes.home_selection_input_box +
          " " +
          classes.simple_input_box +
          " font10"
        }
        style={{ position: "relative" }}
      >
        <span className="label font11">{t("HOME.DESTINATION")}</span>

        <KuposHybridInput
          type={destinationType}
          selectRef={destinationRef}
          value={destinationText}
          onTextChange={(val) => {
            setShowDestinationTerminalSuggestions(val ? false : true);
            setDestinationText(val);
          }}
          onChange={(val) => onChange(val, "destination")}
          placeholder={t("HOME.DESTINATION")}
          icon={
            setDestinationTerminal
              ? "/images/icons/home/airport-icon.png"
              : "/images/icons/home/icon_source2.png"
          }
          error={destinationError ? true : false}
          errorMessage={t(destinationError)}
          height={40}
          // fontSize="font11"
          erasable={true}
          onFocus={(event) => onFocus("destination", event)}
          onBlur={(val) => onBlur(val, "destination")}
          eraseSelectedInput={() => eraseSelectedInput("destination")}
          t={t}
          // readOnly={destinationReadonly}
        />

        {atTerminals && showDestinationTerminalSuggestions && !airportChoosen && (
          <div className="at-termninal-suggestions auto-suggestions font10 scroll-style">
            {atTerminals &&
              atTerminals
                .sort((a, b) => b.airport_name.localeCompare(a.airport_name))
                .map((val, key) => {
                  return renderATTerminals(val, key, "destination");
                })}
          </div>
        )}
      </div>

      <div
        className={
          classes.home_selection_input_box +
          " " +
          classes.date_time_box +
          " " +
          classes.datebox +
          " font10"
        }
      >
        <span className="label font11">{t("HOME.ONE_WAY")}</span>

        <KuposDateTimePicker
          onDateChange={(val) => onChange(val, "going_date")}
          onTimeChange={(val) => onChange(val, "going_time")}
          selectedDate={transferData.selectedGoingDate}
          selectedTime={transferData.selectedGoingTime}
          t={t}
          transferData={transferData}
          error={dateTimeError ? true : false}
          errorMessage={t(dateTimeError)}
          timePickerTitle="Hora de recogida"
          showTimeInitially={transferData.selectedGoingTime ? true : false}
        />
      </div>
      <div
        className={
          classes.home_selection_input_box +
          " " +
          classes.date_time_box +
          " " +
          classes.datebox +
          " font10"
        }
        id="at-optional-datebox"
      >
        <span className="label font11">{t("HOME.ROUND_TRIP")}</span>

        <KuposDateTimePicker
          onDateChange={(val) => onChange(val, "return_date")}
          onTimeChange={(val) => onChange(val, "return_time")}
          selectedDate={transferData.selectedReturnDate}
          selectedTime={transferData.selectedReturnTime}
          minDate={transferData.selectedGoingDate}
          optional={transferData.selectedReturnDate ? false : true}
          clearDateTime={() => clearDateTime()}
          disabled={false}
          optionalDatePicker={true}
          transferData={transferData}
          t={t}
          error={returnDateTimeError ? true : false}
          errorMessage={t(returnDateTimeError)}
          timePickerTitle="Hora de recogida"
          showTimeInitially={transferData.selectedReturnTime ? true : false}
        />
      </div>

      <div className="home-selection-input-box font12 datebox search-button-box search-button-box-at">
        <button
          className="kupos-button home-selection-input-button "
          onClick={validateAndSearch}
        >
          <Image
            className="icon-size"
            style={{ marginRight: 0 }}
            src="/images/icons/home/next-arrow.png"
            alt={t("TRANSLATIONS.ICON_SEARCH_WHITE")}
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default TransferInputs;
