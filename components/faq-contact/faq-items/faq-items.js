import classes from "./index.module.less";
import Image from "next/image";
import ContentContainer from "../../ui/content-container/content-container";

const faqItems = [
  {
    id: 0,
    icon: "/images/icons/faq/heart.png",
    title: "Return or exchange products",
    desc: "Find out all about how to exchange or return your products.",
    link: "https://www.ikea.com/in/en/customer-service/returns-claims/return-policy/",
  },
  {
    id: 1,
    icon: "/images/icons/faq/right-click.png",
    title: "Click & Collect",
    desc: "Order your favorite products online and collect it later",
    link: "https://www.ikea.com/in/en/customer-service/services/click-and-collect-shopping-at-ikea-stores-pubada7dae3",
  },
  {
    id: 2,
    icon: "/images/icons/faq/join.png",
    title: "Missing a part",
    desc: "Order fittings and spare parts",
    link: "https://www.ikea.com/in/en/customer-service/order-fittings-and-spare-parts-pub7ceb8b88",
  },
  {
    id: 3,
    icon: "/images/icons/faq/tick.png",
    title: "Stock availability",
    desc: "Plan your shopping before buying",
    link: "https://www.ikea.com/in/en/customer-service/stock-availability-pubb8863aa0",
  },
  {
    id: 4,
    icon: "/images/icons/faq/tick.png",
    title: "Warranty",
    desc: "IKEA products comes with warranty",
    link: "https://www.ikea.com/in/en/customer-service/warranty-pub487904db",
  },
  {
    id: 5,
    icon: "/images/icons/faq/terms.png",
    title: "Terms and conditions",
    desc: "Check all t&c's here",
    link: "https://www.ikea.com/in/en/customer-service/terms-condition-and-privacy-notice-pub7bbe3afb",
  },
];
const FaqItems = () => {
  const renderItem = (item) => {
    return (
      <div className={classes.faq_item}>
        <div className={classes.icon}>
          <Image alt="" height={40} width={40} src={item.icon} />
        </div>
        <div className={classes.title + " font11 bold-text black-text"}>{item.title}</div>
        <div className={classes.desc +" font9 black-text"}>{item.desc}</div>
        <div className={classes.read_more}>
          <a href={item.link}>Read More</a>
        </div>
      </div>
    );
  };

  return (
    <ContentContainer>
      <div className={classes.faq_container}>
        <div className={classes.title}>
          <span>Helping you help yourself </span>
        </div>

        <div className={classes.sub_title}>
          <span>
            Looking to check the status of your order? Want to return a product
            or order a spare part? We have convenient self
            <br /> service options which will let you do just that!
          </span>
        </div>

        <div className={classes.faq_items}>
          {faqItems?.map((item) => renderItem(item))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default FaqItems;
