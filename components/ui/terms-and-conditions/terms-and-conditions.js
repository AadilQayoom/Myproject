import React, { Component } from "react";
import classes from "./terms-and-conditions.module.less";
import i18next from "i18next";
import { Helmet } from "react-helmet";

export default class TermsAndConditions extends Component {
  static propTypes = {};

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div
        className={
          classes.cancel_done_section +
          " " +
          classes.pages_terms_and_conditions +
          " " +
          "font10"
        }
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`kupos.cl | Terms and Conditions`}</title>
          <meta
            name="description"
            content={`kupos.cl | Terms and Conditions `}
          />
          <link
            rel="canonical"
            href={`https://kupos.cl/${i18next.language}/pages/tnc`}
          />
        </Helmet>
        <div className="cancel-ticket-done font20 page-title">
          Terms<span className="bold-text">&nbsp; and conditions</span>
        </div>
      </div>
    );
  }
}
