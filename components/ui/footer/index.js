import React, { useState } from "react";
import Image from "next/image";
import classes from "./footer.module.less";

const Footer = () => {
  const images = [
    { img: "facebook.png", link: "https://www.facebook.com/iustjk" },
    { img: "pintrest.png", link: "https://www.facebook.com/" },
    { img: "twitter.png", link: "https://twitter.com/iustjk" },
    { img: "youtube.png", link: "https://www.youtube.com/c/IUSTJK" },
    { img: "wechat.png", link: "https://www.wechat.com/" },
    { img: "whatsapp.png", link: "https://www.whatsapp.com/" },
    { img: "reddit.png", link: "https://www.reddit.com/" },
    { img: "linkedin.png", link: "https://www.linkedin.com/school/iustjk" },
    { img: "instagram.png", link: "https://www.instagram.com/" },
  ];
  const footerLinks = [
    {
      title: "About Us",
      content: [

        { title: "Group" },
        { title: "Careers" },
        { title: " Education project" },
        // "Tech Master Event platform",
        // "Contact",
      ],
    },
    {
      title: "Contact Us",
      content: [
        { title: "1-University Avenue, Awantipora, Pulwama," },
        { title: "Pin: 192122, Jammu and Kashmir" },
        { title: "GPO (Srinagar) Post Box No. 89" },
        { title: "Phone: +91 (01933) 247954 / 247955" },
        { title: "Email: ditss@iust.ac.in" },

      ],
    },
    {
      title: "Quick Links",
      content: [
        { title: "Phone Directory", link: "https://iust.ac.in/directory.aspx" },
        { title: "counselling", link: "https://iust.ac.in/centre-default?deptcode=ISV2vX3Mozp/8I7u7juyVg==" },
        { title: "Alumni", link: "https://alumni.iust.ac.in/" },
        { title: "It Policy", link: "https://iust.ac.in/Downloads/md/itpolicy.pdf" }

      ],
    },
  ];
  const routeToLink = (item) => {
    console.log(item);
  };
  return (
    <>
      <div className={classes.footer_wrapper}>
        <div className={classes.logo_social}>
          <div className={classes.logo}>
            <Image
              src={"/images/iustimages/image7.png"}
              width={200}
              height={100}
              alt=""

            />
          </div>
          <div className={classes.social}>
            <div className="font12 bold">Join Us</div>
            <div className={classes.icons}>
              {images.map((item, index) => {
                return (
                  <Image
                    key={index}
                    src={`/images/icons/socialmedia/${item.img}`}
                    width={40}
                    height={40}
                    alt=""
                    onClick={() => window.open(item.link, "_blank")}

                  />
                );
              })}
            </div>
          </div>
        </div>
        {footerLinks.map((link, index) => {
          return (
            <div className={classes.links_wrapper} key={index}>
              <div className="bold">{link.title}</div>
              <div className={classes.about_item}>
                {link.content.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={classes.link + " font9"}
                      onClick={() => window.open(item.link, "_blank")}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Footer;
