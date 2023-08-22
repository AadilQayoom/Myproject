import i18next from "i18next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { showLoginModalState } from "../../recoil/atoms/common";
import LoginModal from "../home/login-modal/login-modal";
import ContentContainer from "../ui/content-container/content-container";
import CancellationModal from "./cancellation-modal";
import LanguageSwitch from "./language-switch";
import classes from "./nav-bar-2.module.less";

const initialState = {
  loginModal: false,
  cancellationModal: false,
};

const NavBar2Component = (props) => {
  const [showLoginModal, setShowLoginModal] = useRecoilState(showLoginModalState)
  const [showAccDropdown, setShowAccDropdown] = useState(false);
  const [openCancellationModal, setOpenCancellationModal] = useState(false);

  const [state, setState] = useState(initialState);

  const onMyAccountClick = () => {
    setOpenCancellationModal(true);
  };

  const updateSingleState = (type, value) => {
    setState({ ...state, [type]: value });
  };

  const renderMyAccountDropdown = () => { };
  return (
    <>
      <nav className={classes.main_nav_container}>
        <div className={classes.nav_container + " content-container"}>
          <div className={classes.logo}>
            <Image
              loader={""}
              src="/images/svgs/kupos-logo2.svg"
              alt="kupos.com"
              //   fill="contain"
              height={80}
              width={200}
              className="pointer"
              onClick={() => window.location.href = '/'}
            />
          </div>

          <div className={classes.links_container + " font10"}>
            <ul>
              <li className={classes.cancel_ticket_top_strip + " font9"}>
                <a onClick={() => setOpenCancellationModal(true)}>
                  <div className={classes.cancel_ticket_top_strip_inner}>
                    <img
                      src="/images/icons/nav-cancel-icon.svg"
                      //   alt={this.props.t("TRANSLATIONS.MY_TRIPS")}
                      height="20px"
                      width="auto"
                    />
                    {/* <span className="menu-name">{props.t("HOME.MY_JOURNEYS")}</span> */}
                    <span className="menu-name">Anular pasaje</span>
                  </div>
                </a>
              </li>

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

              <li>
                <div className="my-account-top font10">
                  <a onClick={() => setShowLoginModal(true)}>
                    {/* {CommonService.isLoggedIn(props.common.loginData) &&
            this.props.common.loginData.image_link ? (
              <div className="dp-image-top">
                <img
                  src={props.common.loginData.image_link}
                    alt={props.t("TRANSLATIONS.USER_DOT")}
                  width="42px"
                  height="42px"
                />
              </div>
            ) : ( */}
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
                    {/* )
                      } */}
                  </a>
                  {showAccDropdown ? renderMyAccountDropdown(props.t) : null}
                </div>
              </li>
              <li>
                <LanguageSwitch
                  logoType={props.logoType}
                  history={props.history}
                />
              </li>
            </ul>
          </div>
        </div>
        <ContentContainer>
          {props.children}
        </ContentContainer>
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
    </>
  );
};

export default NavBar2Component;
