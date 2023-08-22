import { useState } from "react";
import ContentContainer from "../../ui/content-container/content-container";
import classes from "./index.module.less";
import Image from "next/image";

const faqQns = [
  {
    id: 0,
    title:
      "I have an issue with my existing order and wish to return few articles. How is it possible?",
    desc: `IKEA to the rescue! If and when you receive your order, and have observed there is a damage/issue, you can raise a complaint by contacting our team. Please add the relevant pictures/videos by filling a form in this link below and our team shall contact you in 48-72 hrs.`,
    // link: "https://www.ikea.com/in/en/customer-service/returns-pubb98c97b0",
  },
  {
    id: 1,
    title:
      "I'm interested in availing Planning services with IKEA, but virtually. How can I get in touch with someone for more help on this?",
    desc: "We can give expert advice and inspiration to help plan your interior by our IKEA Planners remotely. Here's how you can connect with our virtual Interior Design Services and get professional 1-on-1 advice at an affordable price: Interior Design Service - IKEA",
    // link: "https://www.ikea.com/in/en/customer-service/services/click-and-collect-shopping-at-ikea-stores-pubada7dae3",
  },
  {
    id: 2,
    title:
      "I am trying to place an order but there's an error stating 'this article cannot be delivered'. What does this mean?",
    desc: "This can happen as few articles such as live plants, fragile articles, cut fabrics, and objects with sharp edges (knives) that may not be delivered due to safety reasons.However, they be purchased at our store, or you can avail our Click & Collect services. For more help, please contact our Customer support centre: Contact us - IKEA",
    // link: "https://www.ikea.com/in/en/customer-service/order-fittings-and-spare-parts-pub7ceb8b88",
  },
  {
    id: 3,
    title:
      "I am unable to log in to my IKEA account and there is no OTP being received.",
    desc: "OTP is triggered if the email address or mobile number is linked and verified with the source account. Please try clearing the cache and cookies of the web browser or re-install the app.If the issue persists, you connect with our co-worker using this link: Contact us - IKEA ",
    // link: "https://www.ikea.com/in/en/customer-service/stock-availability-pubb8863aa0",
  },
  {
    id: 4,
    title: "How can I cancel the order placed online?",
    desc: "At the moment, we do not have a direct option on our website to cancel the order. However, our customer service team with this request.Please note that a full refund is applicable for the product(s) and services if you cancel the order before the goods are dispatched from our warehouse.  If the articles have been dispatched from the central warehouse a full refund is applicable only on the product (s). Unfortunately, the delivery charges can't be refunded at this stage.You can connect with our Customer support centre on: Contact us - IKEA ",
    // link: "https://www.ikea.com/in/en/customer-service/warranty-pub487904db",
  },
  {
    id: 5,
    title:
      "I'm unable to visit the store and collect the Click and Collect order, what are the options available?",
    desc: "Are you looking for innovative solutions in furnishing your home? Together with our interior designers you can create your dream interior. Our specialists are ready to help you with advice, online or in-store​.",
    // link: "https://www.ikea.com/in/en/customer-service/terms-condition-and-privacy-notice-pub7bbe3afb",
  },
];

const FaqQns = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // console.log({ hoveredItem });
  const renderQns = (item) => {
    return (
      <div className={classes.faq_item}>
        <div
          className={classes.title_caret}
          onClick={() => setActiveTab(item.id == activeTab ? null : item.id)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div
            className={classes.title}
            style={
              item.id === hoveredItem
                ? { textDecoration: "underline" }
                : { textDecoration: "none" }
            }
          >
            {item.title}
          </div>
          <div>
            {activeTab == item.id ? (
              <Image
                src="/images/icons/home/caret-up.png"
                alt="caret down"
                height={20}
                width={20}
              />
            ) : (
              <Image
                src="/images/icons/home/caret-down.png"
                alt="caret down"
                height={20}
                width={20}
              />
            )}
          </div>
        </div>
        {activeTab == item.id && (
          <div className={classes.desc}>{item.desc}</div>
        )}
        <hr
          style={{
            background: "white",
            color: "#7f7f7f",
            width: "75vw",
            margin: "48px 0px",
          }}
        />
      </div>
    );
  };

  return (
    <ContentContainer>
      <div className={classes.faq_container}>
        <div className={classes.faq_items}>
          {faqQns?.map((item) => renderQns(item))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default FaqQns;
