import classes from "./index.module.less";
import Image from "next/image";
import { useState } from "react";
import ContentContainer from "../../ui/content-container/content-container";
import { Button } from "react-bootstrap";
import Link from "next/link";
// import Images from "../../../public/images/home/services";

const faqService = [
  {
    id: 0,
    image: "/images/icons/faq/img6.jpg",
    title: "Track Your Order",
    link: "https://www.ikea.com/in/en/customer-service/returns-claims/return-policy/",
  },
  {
    id: 1,
    image: "/images/icons/faq/img6.jpg",
    title: "Services",
    link: "https://www.ikea.com/in/en/customer-service/services/click-and-collect-shopping-at-ikea-stores-pubada7dae3",
  },
  {
    id: 2,
    image: "/images/icons/faq/img6.jpg",
    title: "How To Shop",
    link: "https://www.ikea.com/in/en/customer-service/order-fittings-and-spare-parts-pub7ceb8b88",
  },
  {
    id: 3,
    image: "/images/icons/faq/img6.jpg",
    title: "FAQ",
    link: "https://www.ikea.com/in/en/customer-service/stock-availability-pubb8863aa0",
  },
  {
    id: 4,
    image: "/images/icons/faq/img6.jpg",
    title: "We can help you shop",
    link: "https://www.ikea.com/in/en/customer-service/warranty-pub487904db",
  },
  {
    id: 5,
    image: "/images/icons/faq/img6.jpg",
    title: "Product information",
    link: "https://www.ikea.com/in/en/customer-service/terms-condition-and-privacy-notice-pub7bbe3afb",
  },
  {
    id: 6,
    image: "/images/icons/faq/img6.jpg",
    title: "Payment",
    link: "https://www.ikea.com/in/en/customer-service/terms-condition-and-privacy-notice-pub7bbe3afb",
  },
  // {
  //   id: 6,
  //   image: "/images/icons/faq/img6.jpg",
  //   title: "Contact us",
  //   link: "https://www.ikea.com/in/en/customer-service/terms-condition-and-privacy-notice-pub7bbe3afb",
  // },
];
const FaqService = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const renderserviceItem = (item) => {
    return (
      <div className={classes.faq_item}>
        <div
          className={classes.service_caret}
          
        ></div>

        <div className={classes.image}>
          <Image alt="" height={84} width={1200} src={item.image} />
        </div>
        <div className={classes.title + " font9 black-text"} onClick={() =>
            setActiveTab(item.link == activeTab ? null : item.link)
          }>{item.title}</div>
      </div>
    );
  };

  return (
    <ContentContainer>
      <div className={classes.faq_container}>
        <div className={classes.title}>
          <span>Customer Support </span>
        </div>

        <div className={classes.faq_service}>
          {faqService?.map((item) => renderserviceItem(item))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default FaqService;
