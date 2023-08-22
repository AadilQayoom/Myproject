import ContentContainer from '../content-container/content-container';
import Image from 'next/image';
import React from 'react'
import classes from './not-logged-in.module.less'
import { useRouter } from 'next/router';
const NotLoggedIn = () => {
    const router = useRouter();
    const loginRoute = () => {
        router.push("/login");
      };
  return (
    <ContentContainer>
    {" "}
    <div className={classes.not_logged_in}>
      <div className={classes.inner}>
        <div className={classes.title1 + " font12 bold"}>
          PLEASE LOG IN
        </div>
        <div className={classes.title2 + " font12"}>
          Login to view items in your wishlist.
        </div>
        <Image
          src={"/images/logos/notloggedin.png"}
          width={160}
          height={160}
          alt=""
        />
        <div className={classes.login_btn} onClick={loginRoute}>
          Login
        </div>
      </div>
    </div>
  </ContentContainer>
  )
}

export default NotLoggedIn