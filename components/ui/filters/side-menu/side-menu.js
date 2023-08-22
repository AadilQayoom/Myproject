import React, { useState } from "react";

import classes from "./all-filters.module.less";
import { drop } from "lodash";
import Image from "next/image";
import KuposRadio from "../../kupos-radio";

const SideMenu = (props) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.label} onClick={() => setDropdown(!dropdown)}>
          <span className="font11 bold">{props.label}</span>
          <Image
            src="/images/icons/home/caret-down.png"
            alt="caret down"
            height={20}
            width={20}
          />
        </div>
        <div className={classes.filters}>
          {dropdown ? (
            <div>
              {props.options.map((filter, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className={classes.each_filter}
                      onClick={() =>
                        props.onClick({ label: filter, value: filter })
                      }
                    >
                      <span className="font12">{filter}</span>
                      <KuposRadio
                        checked={index === props.selected}
                        style={{ marginRight: 0 }}
                        // label="Pay with Debit/Credit/ATM Cards"
                        onChange={() => props.onChange(index)}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className={classes.line}></div>
      </div>
    </>
  );
};

export default SideMenu;
