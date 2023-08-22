import React from "react";
import classes from "./why-kupos-items.module.less";
import Image from "next/image";

const WhyKuposItems = (props) => {
  return (
    <div className="content-container">
      <div className={classes.y_kupos_items}>
        <WhyKuposItem
          image="/images/svgs/generic/happy_travelers.svg"
          label="Happy travelers"
          sub="+7.3 millions"
          alt="Over 7 million happy customers"
        />

        <WhyKuposItem
          image="/images/svgs/generic/satisfaction_guaranteed.svg"
          label="Satisfaction guaranteed"
          sub="+82k excellent reviews"
          alt="You satisfaction in kupos.cl is assured"
        />

        <WhyKuposItem
          image="/images/svgs/generic/transport.svg"
          label="Buses, transfers, trains and more"
          sub="One app for all ground transportation"
          alt="Buy tickets of bus, train, airport transfer, and more."
        />

        <WhyKuposItem
          image="/images/svgs/generic/made_in_chile.svg"
          label="Made in Chile"
          sub="with love"
          alt="kupos.cl is made in Chile"
        />
      </div>
    </div>
  );
};

const WhyKuposItem = ({ image, alt, label, sub }) => {
  return (
    <div className={classes.y_kupos_item}>
      <div className="y-kupos-icon">
        <div className="y-kupos-icon-stripe circular-icon-stripe /svgs/happy_travelers.svg-circular-icon">
          <Image loader={""} src={image} alt={alt} height={80} width={200} />
        </div>
      </div>
      <div className="y-kupos-label font12">
        <span>{label}</span>
      </div>
      <div className="y-kupos-value bold-text font12 primary-text">
        <span>{sub}</span>
      </div>
    </div>
  );
};

export default WhyKuposItems;
