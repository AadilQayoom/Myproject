import React, { PureComponent } from "react";
import KuposModal from "../../../ui/kupos-modal/kupos-modal";
import SvgHome from "../../../ui/svg-home/svg-home";

const KuposPoolModal = (props) => {
  const renderBody = (image) => {
    return (
      <div className="kupos-pool-popup-image-back">
        <img src={image} />

        <div className="kupos-pool-modal-text-container">
          <span className="download-app-overlay-text-heading bold-text font20 kupos-pool-modal-text-heading">
            {props.t("HOME.KUPOS_POOL_TITLE")}
          </span>
          <div className="kupos-pool-modal-image">
            <img className="pool-image" src="/images/kupos_pool.svg" alt="" />
          </div>

          <span className="kupos-pool-modal-text-sub-heading font12">
            <span className="bold-text">KuposPool</span>&nbsp;
            {props.t("HOME.KUPOS_POOL_AVAILABLE")}
          </span>
          <span className="download-app-overlay-text-heading bold-text kupos-pool-download-app font15">
            {props.t("HOME.KUPOS_APP_DOWNLOAD")}
          </span>

          <div className="download-app-kupos-pay-image kupos-pool-modal-image-stores">
            {props.metaData ? (
              <a
                href={
                  props.metaData.social_media_urls
                    ? props.metaData.social_media_urls.androidUrl
                    : ""
                }
              >
                <img src={props.googlePlay} alt="" />
              </a>
            ) : null}
            {props.metaData ? (
              <a
                href={
                  props.metaData.social_media_urls
                    ? props.metaData.social_media_urls.iosUrl
                    : ""
                }
              >
                <img src={props.appStore} alt="" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="common-login-modal">
      <KuposModal
        // showModal={true}
        showModal={props.showModal}
        onHide={props.onHide}
        size="md"
        ariaLabel="login-modal"
      >
        <div className="kupos-pool-modal-container">
          <div className="close-button pointer" onClick={props.onHide}>
            <SvgHome name="close" />
          </div>
          {renderBody(props.image)}
        </div>
      </KuposModal>
    </div>
  );
};

export default KuposPoolModal;
