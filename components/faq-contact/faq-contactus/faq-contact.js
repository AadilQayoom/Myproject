import classes from "./index.module.less";
import Image from "next/image";
import ContentContainer from "../../ui/content-container/content-container";
import { Button } from "react-bootstrap";
import Link from "next/link";

const FaqContactItems = () => {
  return (
    <ContentContainer>
      <div className={classes.contact_container}>
        <div className={classes.title_one}>
          <span>Do you still have questions?</span>
        </div>

        <div className={classes.sub_title + " font9 general-text mb-50"}>
          <span>
            To help you the best way possible, you can now look for a solution
            in a more targeted way. If you can't find the answer, <br></br> we
            will offer you the best way to get in contact with us.
          </span>
        </div>

        <div className={classes.contact_button}>
          <Link
            className={classes.button_black}
            href="https://www.ikea.com/in/en/customer-service/contact-us/"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </ContentContainer>
  );
};

export default FaqContactItems;
