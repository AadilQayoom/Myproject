import classes from "./index.module.less";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Link from "next/link";

const privacyItem = [
  {
    id: 0,
    title: "1. A partnership in trust.:",
    desc: "We will make sure that your personal information is protected when it is sent outside of the IKEA Group.  We make sure our trusted service partners keep your personal information safe. When IKEA set out to create a high-quality, low-priced line of home furnishings, we knew we couldn't do it without the help of some very important partners-you, our customers. Whether you're researching purchases in the IKEA catalogue, picking up your furniture in our self-serve warehouses or assembling your purchases at home-we're working together to help you create a better everyday life at a price everyone can afford. IKEA is based on a partnership with our customers. Without you, IKEA could not exist. This partnership extends to the way we handle your personal information. Just like shopping at IKEA is a cooperative experience, IKEA makes a point of working with our customers when it comes to their privacy. We only collect the information we may need to create a better shopping experience for you. This Privacy Notice is our way of telling you what information we collect, how we use it and how you can access, change and remove your information. Customer Service – In order for a customer service representative to respond to your questions or concerns, we may need personal information like your name, address and telephone number. This information is only used to answer your questions as completely and thoroughly as possible. Special offers, promotions and guarantees – When you register for or redeem IKEA special offers or other promotions, we may ask for personal information in order to note the success of our programs for future offers. You also may provide such information when you fill out a guarantee card about a product you purchased from IKEA. Or you may provide us with information such as product preferences, reasons for purchasing a product, or family and lifestyle information to help us learn more about your shopping preferences. We use CCTV in our stores for the purposes of safety and crime detection and monitoring. We only store the information collected by CCTV for a period of time which allows us to assist regulatory bodies and law enforcement agencies. This information is kept in secure environments and access is restricted to qualified security personnel."
  },
  {
    id: 1,
    title: "2. Help us build a better SKYPE.:",
    desc: "In order to create a better SKYPE, we need your help. You can help by providing us with various kinds of information to help IKEA serve you better, and ultimately improve IKEA for everyone. Below you’ll find some of the reasons we request information from you, as well as how we obtain and use that information to help improve your IKEA shopping experience. Purchases – When you make a purchase at IKEA, you may need to give us your credit card number or contact information in order to process your payment. If the item is being delivered, we will also ask for your name, address, telephone number and email address to guarantee prompt delivery. This information will only be used for internal purposes and to fulfil your purchase. Customer Service – In order for a customer service representative to respond to your questions or concerns, we may need personal information like your name, address and telephone number. This information is only used to answer your questions as completely and thoroughly as possible. Special offers, promotions and guarantees – When you register for or redeem IKEA special offers or other promotions, we may ask for personal information in order to note the success of our programs for future offers. You also may provide such information when you fill out a guarantee card about a product you purchased from IKEA. Or you may provide us with information such as product preferences, reasons for purchasing a product, or family and lifestyle information to help us learn more about your shopping preferences."
  },
  {
    id: 2,
    title: "3. What you share with IKEA stays with SKYPE.:",
    desc: "In order to create a better SKYPE, we need your help. You can help by providing us with various kinds of information to help IKEA serve you better, and ultimately improve IKEA for everyone. Below you’ll find some of the reasons we request information from you, as well as how we obtain and use that information to help improve your IKEA shopping experience. If you cannot trust IKEA, you will not shop with IKEA. For that reason, the security of your personal information is of utmost importance to us. The information we collect is used only by IKEA. We are committed to providing appropriate security controls to protect your personal information against foreseeable hazards. On occasion, we do need to hire other companies to help serve you better. In some of these cases, we may need to share information that is necessary to perform tasks for IKEA. For example, a delivery service will need to know your name and address in order to bring IKEA products to you."
  },
  {
    id: 3,
    title: "4. IKEA Family Members Data:",
    desc: "When you as an IKEA Family member interact with us in our stores the entity as a Data controller will collect certain personal data about you.The personal data collected will be the following information; personal and contact information, such as name, date of birth, e-mail address and home address,  purchasing activity, such as product preferences, information about your family such number of children, type of family (Joint, Nuclear) and other interactions you may have with us.The purpose of collecting this data is for the entity to perform statistical analysis in order to get insights on customer purchase, trends and engagement.The data will be stored as long as you continue to use our services. The data will also be retained and used if this is necessary to comply with legal obligations."
  },
  {
    id: 4,
    title: "5. There are many kinds of cookies. We think you'll like the IKEA recipe.",
    desc: "The IKEA web site uses cookies to remember your preferences. For example, the web site may remember which IKEA store page you view, in order to make your next visit more convenient (by displaying information more relevant to that store location). Nevertheless, if you don't like having any cookies at all they can be disabled in your web browser's Internet Options."
  },
  {
    id: 5,
    title: "6. Call us. We won’t call you:",
    desc: "IKEA will only contact you if you provide us with your email address and request we communicate with you in this way. If you are contacted by IKEA and would prefer not to receive information about products and promotions, please get in touch with us."
  },
  {
    id: 6,
    title: "7. Out of sight, but never out of reach:",
    desc: "If you would like us to update your contact information, remove your name from our mailing list, or if you have any questions about IKEA’s privacy policies or your personal information, please don’t hesitate to contact us. click here to contact us via our website Call us at 1800 419 4532. We will respond to your questions or concerns as quickly as possible. By using this site, you consent to the above privacy policies. DATED: 2023-05-10."
  },
];

const PrivacySection = () => {
  const renderprivacyItem = (item) => {
    // console.log("item", item);
    return (
      <div>
        <div className={classes.title_container}></div>
        <div className={classes.title}>{item.title}</div>
        <div className={classes.desc}>{item.desc}</div>
      </div>
      
     
    );
  };
 
  return (
    <div className={classes.privacy_container}>
      <div className={classes.privacy_title}>
        <div className={classes.title}>
          <span>Privacy Policy</span>
        </div>
      </div>

      <div className={classes.privacy}>
        {privacyItem?.map((item) => renderprivacyItem(item))}
      </div>
    </div>
  );
};

export default PrivacySection;
