import classes from "./index.module.less";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Link from "next/link";

const tncItem = [
  {
    id: 0,
    title: "1. User Account, Password, and Security:",
    desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  },
  {
    id: 1,
    title: "2. Services Offered:",
    desc: "Myntra provides a number of Internet-based services through the Platform. One such Service enables Users to purchase original merchandise such as clothing, footwear and accessories from various fashion and lifestyle brands (collectively, Products). The Products can be purchased through the Platform through various methods of payments offered. The sale/purchase of Products shall be additionally governed by specific policies of sale, like cancellation policy, exchange policy, return policy, etc. (which are found on the FAQ tab on the Platform and all of which are incorporated here by reference). It is clarified that at the time of creating a return request, users are required to confirm (via a check box click) that the product being returned is unused and has the original tags intact. If the product returned by the user is used, damaged or if the original tags are missing, the user’s return request shall be declined, and the said product shall be re-shipped back to the customer. In the event that the return request is declined, the user shall not be eligible for a refund, and Myntra assumes no liability in this regard. Further, in the event that the user fails to accept the receipt of the said re-shipped product, the user shall continue to be not eligible for a refund, and Myntra assumes no liability with respect to the return or refund for the said re-shipped product. In addition, these Terms of Use may be further supplemented by Product specific conditions, which may be displayed with that Product."
  },
  {
    id: 2,
    title: "3. Platform for Transaction and Communication:",
    desc: "All commercial/contractual terms are offered by and agreed to between Buyers and Sellers alone. The commercial/contractual terms include without limitation price, shipping costs, payment methods, payment terms, date, period and mode of delivery, warranties related to products and services and after sales services related to products and services. Myntra does not have any control or does not determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between the Buyers and Sellers."
  },
  {
    id: 3,
    title: "4. User Conduct and Rules on the Platform:",
    desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  },
  // {
  //   id: 4,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 5,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 6,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 7,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If Yu use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 8,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 9,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 10,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 11,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 12,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
  // {
  //   id: 13,
  //   title: "1. User Account, Password, and Security:",
  //   desc: "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform. You agree to immediately notify Myntra of any unauthorized use / breach of your password or account and ensure that you exit from your account at the end of each session."
  // },
];

const TncSection = () => {
  const rendertncItem = (item) => {
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
    <div className={classes.tnc_container}>
      <div className={classes.tnc_title}>
        <div className={classes.title}>
          <span>Skype: Terms Of Use</span>
        </div>
      </div>

      <div className={classes.tnc}>
        {tncItem?.map((item) => rendertncItem(item))}
      </div>
    </div>
  );
};

export default TncSection;
