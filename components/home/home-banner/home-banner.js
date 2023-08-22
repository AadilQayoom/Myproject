import classes from "./home-banner.module.less";
import Image from "next/image";

const HomeBanner = ({ image, t }) => {
  return (
    <div className={classes.home_banner}>
      <Image src={image} alt={"hero-image"} fill="cover" />
      {/* <img src={image} alt={t('TRANSLATIONS.BANNER_IMG')} width="100%" /> */}
    </div>
  );
};

export default HomeBanner;
