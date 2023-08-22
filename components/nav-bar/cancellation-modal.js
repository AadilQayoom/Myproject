import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import KuposInput from "../ui/input/kupos-input";
import KuposCheckbox from "../ui/checkbox/kupos-checkbox";
import KuposModal from "../ui/kupos-modal/kupos-modal";
import KuposErrorSuccessModal from "../ui/kupos-error-success-modal/kupos-error-success-modal";
import TermsAndConditions from "../ui/terms-and-conditions/terms-and-conditions";
import SvgHome from "../ui/svg-home/svg-home";
import Tabs from "../ui/tabs/tabs";
import CommonService from "../../services/commonService";
import KuposDatePicker from "../ui/date-picker/kupos-date-picker";
import DateService from "../../services/dateService";
import { TicketDetails, TicketDetailsAT } from "../../services/apis/apisPB";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { metaDataState, ticketDetailsState } from "../../recoil/atoms/common";

const initialState = {
  selectedTab: 1,
  cancelPrintTicketPNR: "",
  cancelPrintTicketPNRError: "",
  cancelPrintTicketDate: "",
  cancelPrintTicketDateError: "",
  cancelPrintTicketEmail: "",
  cancelPrintTicketEmailError: "",
  cancelPrintTicketCheck: false,
  showSuccessModal: false,
  modalSuccess: false,
  modalBodyText: "",
  showReserveNumberModal: false,
  findPnrSelected: false,
  showTNCModal: false,
  loader: false,
  capsuleMenuAcktiveTab: 1,
};

const modalInitialState = {
  showSuccessModal: false,
  modalSuccess: false,
  modalBodyText: "",
};

const CancellationModal = (props) => {
  // local + recoil state
  const metaData = useRecoilValue(metaDataState);
  const setTicketDetails = useSetRecoilState(ticketDetailsState);
  const [state, setState] = useState(initialState);
  const [modalState, setModalState] = useState(modalInitialState);

  // Apis functions

  const getTicketDetailsFunc = TicketDetails();
  const getAtTicketDetailsFunc = TicketDetailsAT();

  // functions

  const onCancelPrintTicketChange = (text, inp) => {
    if (inp == "pnr") {
      setState({
        ...state,
        cancelPrintTicketPNRError: "",
        cancelPrintTicketPNR: text,
      });
    } else if (inp == "email") {
      setState({
        ...state,
        cancelPrintTicketEmailError: "",
        cancelPrintTicketEmail: text,
      });
    }
  };

  const onCancelPrintTicketBlur = (text, inp) => {
    if (!text) {
      if (inp == "email") {
        setState({
          ...state,
          cancelPrintTicketEmailError: "VALIDATIONS.VALID_EMAIL",
        });
      } else if (inp == "pnr") {
        setState({
          ...state,
          cancelPrintTicketPNRError: "VALIDATIONS.VALID_RESERVATION",
        });
      }
    } else if (inp == "email") {
      if (!CommonService.isEMailValid(text)) {
        setState({
          ...state,
          cancelPrintTicketEmailError: "VALIDATIONS.VALID_EMAIL",
        });
      }
    }
  };

  const onCancelPrintTicketSubmitPressed = () => {
    let errorCount = 0;
    if (!state.cancelPrintTicketPNR) {
      setState({
        ...state,
        cancelPrintTicketPNRError: "VALIDATIONS.VALID_RESERVATION",
      });
      errorCount++;
    }
    if (!state.cancelPrintTicketEmail) {
      setState({
        ...state,
        cancelPrintTicketEmailError: "VALIDATIONS.VALID_EMAIL",
      });
      errorCount++;
    } else if (!CommonService.isEMailValid(state.cancelPrintTicketEmail)) {
      setState({
        ...state,
        cancelPrintTicketEmailError: "VALIDATIONS.VALID_EMAIL",
      });
      errorCount++;
    }

    if (!state.cancelPrintTicketDate && state.capsuleMenuAcktiveTab === 1) {
      setState({
        ...state,
        cancelPrintTicketDateError: "VALIDATIONS.VALID_DATE",
      });
      errorCount++;
    }

    if (!state.cancelPrintTicketCheck) {
      setState({ ...state, tncError: true });
      errorCount++;
    }

    if (errorCount > 0) {
      return;
    }

    setState({ ...state, loader: true });
    if (state.selectedTab == 1) {
      let data = {
        pnr_number: state.cancelPrintTicketPNR,
        travel_date: state.cancelPrintTicketDate,
        contact_info: state.cancelPrintTicketEmail,
        email: state.cancelPrintTicketEmail,
        is_mobile_app: true,
        do_cancel: true,
      };

      getTicketDetailsFunc({
        callback: handleTicketDetailsResponse,
        urlParams: data,
      });
    } else {
      let data = {
        email: state.cancelPrintTicketEmail,
        travel_date: DateService.changeDateFormat(
          state.cancelPrintTicketDate,
          "dd-mm-yyyy",
          "yyyy-mm-dd"
        ),
        pnr_number: state.cancelPrintTicketPNR,
        timeNow: DateService.getTimeInSeconds(new Date()),
      };

      getAtTicketDetailsFunc({
        callback: handleAtTicketDetailsResponse,
        urlParams: data,
      });
    }
  };

  const handleTicketDetailsResponse = (res) => {
    try {
      // recoil state
      setTicketDetails(res);
      if (
        (res.body && res.body.pnr_number) ||
        (res.result && res.result.pnr_number)
      ) {
        if (this.state.capsuleMenuAcktiveTab == 0) {
          window.open(res.body.print_pdf_url, "_blank");
        } else {
          if (
            (res.body &&
              res.body.pnr_number &&
              (res.body.status.toLowerCase() == "cancelado" ||
                res.body.status.toLowerCase() == "cancelled")) ||
            (res.result &&
              res.result.pnr_number &&
              (res.result.status.toLowerCase() == "cancelado" ||
                res.result.status.toLowerCase() == "cancelled"))
          ) {
            setModalState({
              showSuccessModal: true,
              modalSuccess: false,
              modalBodyText: props.t("HOME.TICKET_CANCELLED"),
            });
          } else {
            this.props.history.push("/modify-ticket/cancel");
            props.onHide();
          }
        }
      } else {
        CommonService.removeLocal("ticketInfo");

        if (
          res &&
          res.body &&
          res.body.message === "El número de reserva es inválido"
        ) {
          setModalState({
            showSuccessModal: true,
            modalSuccess: false,
            modalBodyText: props.t("CANCEL_TICKET.INVALID_PNR"),
          });
        } else {
          setModalState({
            showSuccessModal: true,
            modalSuccess: false,
            modalBodyText: res.body ? res.body.message : res.error,
          });
        }
      }
    } catch (error) {
    } finally {
      setState({ ...state, loader: false });
    }
  };

  const handleAtTicketDetailsResponse = (res) => {
    try {
      setTicketDetails(res);
      if (res.success && res.data && res.data.can_be_cancelled) {
        localStorage.setItem(
          "ticketInfo",
          JSON.stringify({
            ticketDetails: res.data,
            metaData: metaData ? metaData : null,
          })
        );
        props.history.push("/at-modify-ticket/cancel");
        props.onHide();
      } else {
        localStorage.removeItem("ticketInfo");
        setModalState({
          showSuccessModal: true,
          modalSuccess: false,
          modalBodyText: res.message ? res.message : res.error,
        });
      }
    } catch (error) {
    } finally {
      setState({ ...state, loader: false });
    }
  };

  const onHide = () => {
    props.onHide();
    setState(initialState);
  };

  const onTabChange = (i) => {
    setState({ ...initialState, selectedTab: i });
  };

  const renderCancellationCard = () => {
    return (
      <div className="cancel-container">
        <div className={"kupos-card print-cancel-section-modal cancel-modal"}>
          <div className="bold-text font16 flex-center print-section-cancel-modal-title">
            {props.t("CANCEL_TICKET.CANCEL_TICKET")}
          </div>

          <Tabs
            data={["PasajeBus.com", "Transfer aeropuerto"]}
            onTabChange={onTabChange}
            t={props.t}
            selectedTab={state.selectedTab}
          />

          <div className={"print-cancel-home-inputs font10 cancel"}>
            <div className="display-flex cancel-body-row-1-content">
              <KuposInput
                placeholder={props.t(
                  "CANCEL_TICKET.RESERVATION_NUMBER_PLACEHOLDER"
                )}
                type="text"
                className="kupos-border"
                value={
                  state.cancelPrintTicketPNR ? state.cancelPrintTicketPNR : ""
                }
                onChange={(text) => onCancelPrintTicketChange(text, "pnr")}
                onBlur={(text) => onCancelPrintTicketBlur(text, "pnr")}
                error={state.cancelPrintTicketPNRError ? true : false}
                errorMessage={
                  state.cancelPrintTicketPNRError
                    ? props.t(state.cancelPrintTicketPNRError)
                    : null
                }
                t={props.t}
              />

              <KuposDatePicker
                placeholder={props.t("CANCEL_TICKET.TRAVEL_DATE")}
                // placeholder={props.t('HOME.SELECT_DATE')}
                minDate={DateService.getTodayString()}
                selectedDate={
                  state.cancelPrintTicketDate ? state.cancelPrintTicketDate : ""
                }
                onDateChange={(data) =>
                  setState({
                    ...state,
                    cancelPrintTicketDate: data,
                    cancelPrintTicketDateError: "",
                  })
                }
                error={state.cancelPrintTicketDateError ? true : false}
                errorMessage={
                  state.cancelPrintTicketDateError
                    ? props.t(state.cancelPrintTicketDateError)
                    : null
                }
                // style={{ paddingRight: 0 }}
                t={props.t}
              />
            </div>

            <div className="cancel-body-row-1-content">
              <KuposInput
                placeholder={props.t("CANCEL_TICKET.EMAIL_ID")}
                type="email"
                className="kupos-border"
                value={
                  state.cancelPrintTicketEmail
                    ? state.cancelPrintTicketEmail
                    : ""
                }
                onChange={(text) => onCancelPrintTicketChange(text, "email")}
                onBlur={(text) => onCancelPrintTicketBlur(text, "email")}
                error={state.cancelPrintTicketEmailError ? true : false}
                errorMessage={
                  state.cancelPrintTicketEmailError
                    ? props.t(state.cancelPrintTicketEmailError)
                    : null
                }
                style={{ paddingRight: 0 }}
                t={props.t}
              />
            </div>

            <a
              onClick={() =>
                setState({ ...state, showReserveNumberModal: true })
              }
              className="primary-text less-bold-text font10 primary-text"
            >
              {props.t("PRINT_SCREEN.WHERE_TO_FIND_PNR")}
            </a>

            <div className="font10 cancel-body-checkbox-container">
              <div className="accept-tnc font10">
                <KuposCheckbox
                  checked={state.cancelPrintTicketCheck}
                  onChange={() =>
                    setState({
                      ...state,
                      tncError: false,
                      cancelPrintTicketCheck: !state.cancelPrintTicketCheck,
                    })
                  }
                />
                <a onClick={() => setState({ ...state, showTNCModal: true })}>
                  {props.t("PASSENGER_DETAILS.I_ACCEPT_TNC")}
                </a>
              </div>
              {state.tncError ? (
                <div className="tnc-error secondary-text font10 center-text">
                  {props.t("PASSENGER_DETAILS.PLEASE_ACCEPT_TNC")}
                </div>
              ) : null}
            </div>

            <div style={{ marginTop: 20 }}>
              <button
                className="kupos-button print-cancel-button-modal font11"
                onClick={onCancelPrintTicketSubmitPressed}
              >
                {state.loader ? (
                  <div className="loader-cricle"></div>
                ) : (
                  <span>{props.t("CANCEL_TICKET.CANCEL")}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="common-login-modal">
      <KuposModal
        showModal={props.showModal}
        onHide={onHide}
        size="md"
        ariaLabel="login-modal"
      >
        <div className="login-signup-block">
          <div className="close-button pointer" onClick={onHide}>
            <SvgHome name="close" />
          </div>
          {renderCancellationCard()}
        </div>
      </KuposModal>

      <KuposErrorSuccessModal
        showModal={modalState.showSuccessModal}
        success={modalState.modalSuccess}
        onButtonClick={() => setModalState(modalInitialState)}
        bodyText={modalState.modalBodyText}
        t={props.t}
      />
      <KuposModal
        ariaLabel="tnc-pnr-modal-outer"
        size={state.findPnrSelected ? "lg" : "xl"}
        onHide={() => setState({ ...state, showReserveNumberModal: false })}
        showModal={state.showReserveNumberModal}
      >
        <div className="tnc-pnr-modal">
          <img
            src={
              state.selectedTab == 1
                ? "/images/find-reservation-no.png"
                : "/images/find-reservation-no-at-new.svg"
            }
            alt=""
          />
          <div
            className="close-button pointer"
            onClick={() =>
              setState({ ...state, showReserveNumberModal: false })
            }
          >
            <SvgHome name="close" />
          </div>
        </div>
      </KuposModal>

      <KuposModal
        ariaLabel="tnc-pnr-modal-outer"
        size={"xl"}
        onHide={() => setState({ ...state, showTNCModal: false })}
        showModal={state.showTNCModal}
      >
        <div className="tnc-pnr-modal">
          <TermsAndConditions />
          <div
            className="close-button pointer"
            onClick={() => setState({ ...state, showTNCModal: false })}
          >
            <SvgHome name="close" />
          </div>
        </div>
      </KuposModal>
    </div>
  );
};

export default withTranslation("common")(CancellationModal);
