import { loginDataState, metaDataState } from "../../../recoil/atoms/common";

import Image from "next/image";
import KuposSubscribeNewsLetter from "./subscribe-news-letter";
import classes from "./footer.module.less";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import ContentContainer from "../../ui/content-container/content-container";

const KuposFooter = ({ t }) => {
  const router = useRouter();
  const metaData = useRecoilValue(metaDataState);
  const loginData = useRecoilValue(loginDataState);

  const gotoHome = () => {
    router.push("/");
  };

  return (
    <div className={classes.main_wrapper}>
      <div className="kupos-footer-main">
        {
          <div className={classes.inner_wrapper + " kupos-footer"}>
            <ContentContainer>
              <div className="footer-logo" onClick={gotoHome}>
                <Image
                  src="/images/icons/home/airport-icon.svg"
                  alt={"TRANSLATIONS.KUPOS_LOGO2"}
                  width={220}
                  height={56}
                />
              </div>

              <div className="footer-details">
                <div
                  className={
                    classes.footer_details + " individual-footer-details"
                  }
                >
                  <div className="individual-footer-item font10">
                    <span className="bold-footer-item bold-text font14">
                      {"OUR_COMPANY"}
                    </span>
                    <div
                      className="underline"
                      onClick={() => router.push(`/about`)}
                    >
                      {"ABOUT US"}
                    </div>
                    <div
                      className="underline"
                      onClick={() => router.push(`/our-partners`)}
                    >
                      {"OUR PARTNERS"}
                    </div>
                    <div
                      className="underline"
                      onClick={() => router.push(`/contact`)}
                    >
                      {"CONTACT_US"}{" "}
                    </div>
                  </div>

                  <div className="individual-footer-item font10">
                    <span className="bold-footer-item bold-text font14">
                      {"USEFUL DETAILS"}
                    </span>

                    <div
                      className="underline"
                      onClick={() => router.push(`/tnc`)}
                    >
                      {"TNC"}{" "}
                    </div>
                    <div
                      className="underline"
                      onClick={() => router.push(`/privacy-policy`)}
                    >
                      {"PRIVACY POLICY"}{" "}
                    </div>
                    <div
                      className="underline"
                      onClick={() => router.push(`/site-map`)}
                    >
                      {"SITEMAP"}
                    </div>
                  </div>

                  <div
                    className={
                      classes.news_letter +
                      " individual-footer-item subscribe-n-social"
                    }
                  >
                    <KuposSubscribeNewsLetter t={t} />

                    <div className="div-social-media-icons">
                      <div className="social-icons-footer">
                        <div className="footer-social-image">
                          {metaData || true ? (
                            <a href={""} target="_blank">
                              <Image
                                src="/images/icons/home/icon-facebook.png"
                                alt={"TRANSLATIONS.FB"}
                                height={35}
                                width={35}
                              />
                            </a>
                          ) : null}
                        </div>
                        <div className="footer-social-image">
                          {metaData || true ? (
                            <a
                              href={"https://www.instagram.com/abc/"}
                              target="-blank"
                            >
                              <Image
                                src="/images/icons/home/icon-instagram.png"
                                alt={"TRANSLATIONS.INSTA"}
                                height={35}
                                width={35}
                              />
                            </a>
                          ) : null}
                        </div>
                        <div className="footer-social-image">
                          {metaData || true ? (
                            <a
                              // href={metaData.social_media_urls.twitterUrl}
                              href="https://twitter.com/abc/"
                              target="_blank"
                            >
                              <Image
                                src="/images/icons/home/icon-twitter.png"
                                alt={"TRANSLATIONS.TWITTER"}
                                height={35}
                                width={35}
                              />
                            </a>
                          ) : null}
                        </div>
                        <div className="footer-social-image">
                          {metaData ? (
                            <a href={""} target="_blank">
                              <Image
                                src="/images/icons/home/icon-blog.png"
                                alt={"TRANSLATIONS.BLOG"}
                                height={35}
                                width={35}
                              />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ContentContainer>
          </div>
        }

        <div className={classes.last_footer + " last-footer font10"}>
          <span className="copyright-message">
            {
              // "Lorem Ipsum is simply dummy text of the printing and typesetting industry."

              "© Copyright 2023 - All Rights Reserved - 100% ORIGINAL guarantee for all products."
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default KuposFooter;
