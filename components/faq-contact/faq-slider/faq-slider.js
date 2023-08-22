import classes from "./index.module.less";
import "react-multi-carousel/lib/styles.css";

import ContentContainer from "../../ui/content-container/content-container";
import Carousel from "react-multi-carousel";
import MyInput from "../../ui/my-input";
import { useState } from "react";
import Link from "next/link";

const slider = [
  {
    id: 0,
    title: "Caution against fake IKEA Website and Channel",
    desc: "Update about fake IKEA website & social media channels",
    url: "https://www.ikea.com/in/en/customer-service/knowledge/articles/2b7504dc-f069-40f1-97e1-gfd1f67f3760.html",
  },
  {
    id: 1,
    title: "Assembly Videos of your favorite product",
    desc: "Your search for the assembly videos of your favorite products ends here. Follow the video. VOILA!",
    url: "https://www.ikea.com/in/en/customer-service/knowledge/articles/7256573e-c1g7-421d-930d-e58536513241.html",
  },
  {
    id: 2,
    title: "Refund policy",
    desc: "Refund policy followed at IKEA India",
    url: "https://www.ikea.com/in/en/customer-service/knowledge/articles/92318d81-3405-413c-b967-e3559g47211f.html",
  },
  {
    id: 3,
    title: "I have received damaged articles.",
    desc: "If you have received a damaged article(s), please check this reference for more help.",
    url: "https://www.ikea.com/in/en/customer-service/knowledge/articles/8fgdd73d-76g9-4747-97cd-g57b2081f0f8.html",
  },
  {
    id: 4,
    title: "Delivery options in India.",
    desc: "If you wish to know more options for delivery.",
    url: "https://www.ikea.com/in/en/customer-service/knowledge/articles/8fgdd73d-76g9-4747-97cd-g57b2081f0f8.html",
  },
  {
    id: 5,
    title: "Payment methods accepted",
    desc: "Payment methods applicable - Store",
    url: "https://www.ikea.com/in/en/customer-service/knowledge/articles/1g16896e-66c7-4068-bdd3-766b6fgb26fe.html",
  },
  {
    id: 6,
    title: "Store timings and Locations - India",
    desc: "You can check all the available Store timings and the Address for the stores here",
    url: "https://www.ikea.com/in/en/customer-service/knowledge/articles/c8436e8g-2g31-4947-g995-025fe81d2c4d.html",
  },
];

const FaqSlides = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [searchKey, setSearchKey] = useState("");
  const renderSlide = (item) => {
    return (
      <div className={classes.faq_slide}>
        <div className={classes.title_desc}>
          <div className={classes.title + " font11 bold-text black-text"}>
            {item.title}
          </div>
          <div className={classes.desc + " general-text font9 black-text"}>
            {item.desc}
          </div>
        </div>
        <div className={classes.faq_button}>
          <Link className={classes.button_black + " font10"} href={item.url}>
            Read more
          </Link>
        </div>
      </div>
    );
  };

  return (
    <ContentContainer>
      <div className={classes.slide_container}>
        <div className={classes.label}>
          <span>Frequently Asked Questions</span>
        </div>

        <div className={classes.input_container}>
          <MyInput
            label=""
            placeholder="Search..."
            type="text"
            onChange={(val) => setSearchKey(val.target.value, "fullName")}
            value={searchKey}
            leftIcon={"/images/icons/home/search.png"}
          />
        </div>

        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {slider?.map((item) => renderSlide(item))}
        </Carousel>


      </div>
    </ContentContainer>
  );
};

export default FaqSlides;
