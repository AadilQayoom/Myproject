import React, { useState } from "react";

import Image from "next/image";
import KuposModal from "../../../components/ui/kupos-modal/kupos-modal";
import KuposRadio from "../kupos-radio";
import MyButton from "../my-button";
import MyDropdown from "../my-dropdown";
import MyInput from "../my-input";
import classes from "./payment-selection.module.less";
import {
  choosenPaymentTypeState,
  paymentTypesState,
} from "../../../recoil/atoms/cart";
import { useRecoilState, useRecoilValue } from "recoil";

const PaymentSelection = () => {
  const [upiId, setUpiId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentTypes, setPaymentTypes] = useRecoilState(paymentTypesState);

  //recoil states
  const [choosenPaymentType, setChoosenPaymentType] = useRecoilState(
    choosenPaymentTypeState
  );
  const banks = [
    { value: "J&K Bank", label: "J&K Bank" },
    { value: "State Bank of India", label: "State Bank of India" },
    { value: "HDFC Bank", label: "HDFC Bank" },
    { value: "ICICI Bank", label: "ICICI Bank" },
    { value: "Punjab National Bank", label: "Punjab National Bank" },
    { value: "Bank of Baroda", label: "Bank of Baroda" },
    { value: "Axis Bank", label: "Axis Bank" },
    { value: "Kotak Mahindra Bank", label: "Kotak Mahindra Bank" },
    { value: "IndusInd Bank", label: "IndusInd Bank" },
    { value: "Yes Bank", label: "Yes Bank" },
    { value: "Bank of India", label: "Bank of India" },
  ];
  const upiNumber = (upi) => {
    setUpiId(upi);
  };
  const verifyUpi = () => {};
  const proceedPaymentMethod = () => {};
  const displayModal = () => {
    setShowModal(true);
  };

  const selectPaymentOption = (id) => {
    let selectedPG = paymentTypes.find((paymentType) => paymentType.id === id);
    setChoosenPaymentType(selectedPG);

    let paymentOptionsLocal = [];

    paymentTypes?.map((paymentType) => {
      if (paymentType.id === id) {
        paymentOptionsLocal.push({ ...paymentType, selected: true });
      } else {
        paymentOptionsLocal.push({ ...paymentType, selected: false });
      }
    });

    setPaymentTypes(paymentOptionsLocal);
  };

  const displayPaymentType = (paymentOption, index) => {
    return (
      <div className={classes.single_payment_option} key={index}>
        <KuposRadio
          checked={paymentOption.selected}
          label={paymentOption.name}
          onChange={() => selectPaymentOption(paymentOption.id)}
        />
      </div>
    );
  };
  return (
    <div className={classes.payment_container}>
      {/* <div
        className={check.atm ? classes.payment_type_wraper : classes.unselected}
      >
        <KuposRadio
          checked={check.atm}
          label="Pay with Debit/Credit/ATM Cards"
          onChange={() => paymentSelection("atm")}
        />
        {check.atm ? (
          <div className={classes.atm}>
            <span>
              You can save your cards as per new RBI guidelines.{" "}
              <span className={classes.payment_highlights}>
                &rarr; Learn More
              </span>
            </span>
            <div className={classes.payment_image}>
              <Image
                src={"/images/logos/payment.png"}
                width={600}
                height={20}
                alt=""
              />
            </div>
            <span>
              {" "}
              <span
                onClick={displayModal}
                className={classes.payment_highlights}
              >
                + &rarr; Enter card details.
              </span>
              Amazon accepts all major credit & cards
            </span>
          </div>
        ) : (
          ""
        )}
        {showModal ? <KuposModal showModal={false} /> : ""}
      </div> */}
      {/* <div
        className={
          check.bank ? classes.payment_type_wraper : classes.unselected
        }
      >
        <KuposRadio
          checked={check.bank}
          label="Net Banking"
          onChange={() => paymentSelection("bank")}
        />
        {check.bank ? (
          <div className={classes.bank}>
            <MyDropdown options={banks} />
            <span>For faster payment and instant refund, please use UPI</span>
          </div>
        ) : (
          ""
        )}
      </div> */}
      {/* <div
        className={check.upi ? classes.payment_type_wraper : classes.unselected}
      >
        <KuposRadio
          checked={check.upi}
          label="Other UPI Apps"
          onChange={() => paymentSelection("upi")}
        />
        {check.upi ? (
          <div className={classes.upi}>
            <span>Please enter your UPI ID</span>
            <div className={classes.flex}>
              <MyInput
                placeholder="Ex: MobileNumber@upi"
                value={upiId}
                onChange={(val) => upiNumber(val.target.value)}
              />
              <div className={classes.upi_button}>
                <MyButton label="Verify" onClick={verifyUpi} />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div> */}
      {/* <div
        className={check.cod ? classes.payment_type_wraper : classes.unselected}
      >
        <KuposRadio
          checked={check.cod}
          label="Cash On Delivery/Pay On Delivery"
          onChange={() => paymentSelection("cod")}
        />
        {check.cod ? (
          <div className={classes.cod}>
            <span>
              Scan & Pay using Amazon app. Cash, UPI ,Cards also accepted.
            </span>
          </div>
        ) : (
          ""
        )}
      </div> */}

      {paymentTypes?.map((paymentType, i) => {
        return displayPaymentType(paymentType, i);
      })}

      {/* <MyButton
        label="Use this payment method"
        onClick={proceedPaymentMethod}
      /> */}
    </div>
  );
};

export default PaymentSelection;
