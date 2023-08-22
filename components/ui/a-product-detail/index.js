import React, { useState } from "react";

import KuposCheckbox from "../checkbox/kupos-checkbox";
import classes from "./a-product-detail.module.less";

const ProductDetail = (props) => {
  const [showKnow, setShowKnow] = useState(false);
  const [showCare, setShowCare] = useState(false);
  const data = [
    { label: "Manufacturer", prop: "Manufacturer" },
    { label: "Type of protection", prop: "TypeOfProtection" },
    { label: "Kind of circuit breaker", prop: "KindOfCircuitBreaker" },
    { label: "Current rating", prop: "CurrentRating" },
    { label: "Residual Current", prop: "ResidualCurrent" },
    { label: "Number of poles", prop: "NumberOfPoles" },
    { label: "Rated Voltage", prop: "RatedVoltage" },
    { label: "Mounting", prop: "Mounting" },
    { label: "IP Rating", prop: "IPRating" },
    { label: "Cross Section", prop: "CrossSection" },
    { label: "Operating Temperature", prop: "OperatingTemperature" },
    { label: "Mechanical Durability", prop: "MechanicalDurability" },
    { label: "Electrical Life", prop: "ElectricalLife" },
    { label: "Manufacturer Series", prop: "ManufacturerSeries" },
    { label: "Conform to Norm", prop: "ConformToNorm" },
    { label: "Trade Name", prop: "TradeName" },
  ];
  const [check, setCheck] = useState({
    Manufacturer: false,
    TypeOfProtection: false,
    KindOfCircuitBreaker: false,
    CurrentRating: false,
    ResidualCurrent: false,
    NumberOfPoles: false,
    RatedVoltage: false,
    Mounting: false,
    IPRating: false,
    CrossSection: false,
    OperatingTemperature: false,
    MechanicalDurability: false,
    ElectricalLife: false,
    ManufacturerSeries: false,
    ConformToNorm: false,
    TradeName: false,
  });
  const checkboxToggle = (type) => {
    setCheck({ ...check, [type]: !check.type });
  };
  return (
    <>
      <div className={classes.modal_children}>
        <div className="font14 bold">Specification</div>
        {data.map((item) => {
          return (
            <div className={classes.list_wrapper}>
              <div className="font10 bold">{item.label}</div>
              <div className="font10">{props[item.prop]}</div>
              {/* <KuposCheckbox
                checked={check[item.prop]}
                onChange={() => checkboxToggle(item.prop)}
              /> */}
            </div>
          );
        })}
       
        {/* <div><span className='font10'>{props.desc}</span></div>
            <div><span className='bold font12'>Designer</span></div>
            <div><span  className='font10'>{props.designer}</span></div>
            <div><span  className='bold font12'>Country of Origin</span></div>
            <div><span  className='font10'>{props.country}</span></div>
            <div><span  className='bold font10'>Article number</span></div>
            <div className={classes.article_number}><span className='font10'>{props.art_no}</span></div>
            <div className={classes.additional}>
            <hr></hr>
            <div className={classes.know_more} onClick={() => setShowKnow(!showKnow)}><span className='bold'>Good to know &#8964;</span></div>
            {showKnow ? <div className='font10'>{props.know}</div> : null}
            <hr></hr>
            <div className={classes.know_more} onClick={() => setShowCare(!showCare)}><span className='bold'>Material & Care &#8964;</span></div>
            {showCare ? 
            <div>
                    <div><span className='font12 bold'>Body</span></div>
                    <div><span className='font10'>{props.body}</span></div>
                    <div><span className='font12 bold'>Lid</span></div>
                    <div><span className='font10'>{props.lid}</span></div>
                    <div><span className='font12 bold'>Seal</span></div>
                    <div><span className='font10'>{props.seal}</span></div>
                    <div><span className='font12 bold'>Handle</span></div>
                    <div><span className='font10'>{props.handle}</span></div>
                    <div><span className='font12 bold'>Rivet</span></div>
                    <div><span className='font10'>{props.rivet}</span></div>
                    <div><span className='font10'>{props.care}</span></div>

            </div> : null}
            <hr></hr>
            </div> */}
      </div>
    </>
  );
};

export default ProductDetail;
