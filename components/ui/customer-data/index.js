import React, { useState } from "react";

import CommonService from "../../../services/commonService";
import KuposCheckbox from "../checkbox/kupos-checkbox";
import MyButton from "../my-button";
import MyDropdown from "../my-dropdown";
import MyInput from "../my-input";
import classes from "./customer-data.module.less";
import { deliveryAddressState } from "../../../recoil/atoms/cart";
import { useRecoilState } from "recoil";

const CustomerData = () => {
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [customerData, setCustomerData] = useRecoilState(deliveryAddressState);
  const inputOnChange = (val, type) => {
    setCustomerData({ ...customerData, [type]: val });
    console.log("customer data.....", customerData);
  };
  const options = [
    { label: "J&K", value: "j&k" },
    { label: "Haryana", value: "haryana" },
    { label: "Punjab", value: "punjab" },
  ];
  const makeDefaultAddress = () => {
    setDefaultAddress(!defaultAddress);
  };
  const addNewAddress = () => {
    let address = [];

    let localAdd = localStorage.getItem("address");

    if (localAdd) {
      localAdd = JSON.parse(localAdd);
      address = CommonService.copyObject(localAdd);
    }
    address.push(customerData);
    localStorage.setItem("address", JSON.stringify(address));
  };
  return (
    <>
      <span>Add a new address</span>
      <div className={classes.parent_wraper}>
        <MyInput
          label="Full Name"
          placeholder="full name"
          type="text"
          onChange={(val) => inputOnChange(val.target.value, "fullName")}
          value={customerData.fullName}
          required
        />
        <MyInput
          label="Phone Number"
          placeholder="phone number"
          type="number"
          onChange={(val) => inputOnChange(val.target.value, "phoneNo")}
          value={customerData.phoneNo}
        />
        <MyInput
          label="Flat, House no., Building, Company, Apartment"
          placeholder="E.g. Hanjikhelloo House No. 16"
          type="text"
          onChange={(val) => inputOnChange(val.target.value, "address1")}
          value={customerData.address1}
        />
        <MyInput
          label="Area, Street, Sector, Village"
          placeholder="E.g. Gangoo"
          type="text"
          onChange={(val) => inputOnChange(val.target.value, "address2")}
          value={customerData.address2}
        />
        <MyInput
          label="Landmark"
          placeholder="E.g. near old primary school"
          type="text"
          onChange={(val) => inputOnChange(val.target.value, "landmark")}
          value={customerData.landmark}
        />
        <MyInput
          label="City/Town"
          placeholder="E.g. New colony"
          type="text"
          onChange={(val) => inputOnChange(val.target.value, "town")}
          value={customerData.town}
        />
        <MyInput
          label="Pincode"
          placeholder="E.g. 192301"
          type="number"
          onChange={(val) => inputOnChange(val.target.value, "pincode")}
          value={customerData.pincode}
        />
        <MyDropdown
          options={options}
          label="State"
          onChange={(option) => inputOnChange(option, "state")}
        />
        <KuposCheckbox
          label="Make this my default address"
          checked={!defaultAddress}
          onChange={makeDefaultAddress}
        />
        <MyButton label="Use this address" onClick={addNewAddress} />
      </div>
    </>
  );
};

export default CustomerData;
