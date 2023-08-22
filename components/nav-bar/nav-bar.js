import CancellationModal from "./cancellation-modal";
import CommonService from "../../services/commonService";
import Image from "next/image";
import LanguageSwitch from "./language-switch";
import Link from "next/link";
import LoginModal from "../home/login-modal/login-modal";
import LoginModalWrapper from "../home/login-modal/login-modal";
import classes from "./nav-bar.module.less";
import i18next from "i18next";
import { showLoginModalState } from "../../recoil/atoms/common";
import { useRecoilState } from "recoil";
import { useState } from "react";

const initialState = {
  loginModal: false,
  cancellationModal: false,
};

const  = (props) => {
  const [showLoginModal, setShowLoginModal] = useRecoilState(
    showLoginModalState
  );
  const [showAccDropdown, setShowAccDropdown] = useState(false);
  const [openCancellationModal, setOpenCancellationModal] = useState(false);

  const [state, setState] = useState(initialState);

  const onMyAccountClick = () => {
    setOpenCancellationModal(true);
  };

  const updateSingleState = (type, value) => {
    setState({ ...state, [type]: value });
  };

  const renderMyAccountDropdown = () => {};
  return (
    <div>
      <nav className={classes.main_nav_container}>
        <div className={classes.nav_container + " content-container"}>
          <div className={classes.logo}>
            <Image
              loader={""}
              src="/images/icons/apple-logo.png"
              alt="kupos.com"
              //   fill="contain"
              className="pointer"
              onClick={() => (window.location.href = "/")}
              height={80}
              width={80}
            />
          </div>

          <div className={classes.links_container + " font10"}>
            <ul>
              {/* <li className={classes.cancel_ticket_top_strip + " font9"}>
                <a onClick={() => setOpenCancellationModal(true)}>
                  <div className={classes.cancel_ticket_top_strip_inner}>
                    <img
                      src="/images/icons/nav-cancel-icon.svg"
                      height="20px"
                      width="auto"
                    />
                    <span className="menu-name">Anular pasaje</span>
                  </div>
                </a>
              </li> */}

              <li>
                <div className="my-account-top font10">
                  <Link href={`/${i18next.language}/pages/contact`}>
                    <div
                      className={
                        "menu-profile-icon-stripe circular-icon-stripe profile-circular-icon "
                      }
                    >
                      <img
                        src="/images/icons/nav-contact-icon.svg"
                        alt={props.t("TRANSLATIONS.USER_DOT")}
                        width="42px"
                        height="42px"
                      />
                    </div>
                  </Link>
                </div>
              </li>

              {/* <li>
                <div className="my-account-top font10">
                  <a onClick={() => setShowLoginModal(true)}>
                    <div
                      className={
                        "menu-profile-icon-stripe circular-icon-stripe profile-circular-icon "
                      }
                    >
                      <img
                        src="/images/icons/user_multi_red_dots.svg"
                        //   alt={this.props.t("TRANSLATIONS.USER_DOT")}
                        width="42px"
                        height="42px"
                      />
                    </div>
                  </a>
                  {showAccDropdown ? renderMyAccountDropdown(props.t) : null}
                </div>
              </li> */}
              {/* <li>
                <LanguageSwitch
                  logoType={props.logoType}
                  history={props.history}
                />
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <LoginModal
        showModal={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        t={props.t}
      />

      <CancellationModal
        showModal={openCancellationModal}
        onHide={() => {
          setOpenCancellationModal(false);
        }}
        common={props.common}
        metaData={props.metaData}
        actions={props.actions}
        history={props.history}
        t={props.t}
      />
    </div>
  );
};

export default ;
