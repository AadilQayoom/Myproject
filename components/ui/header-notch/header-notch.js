import Link from 'next/link'
import React from 'react'
import classes from './header-notch.module.less'
const HeaderNotch = () => {
  return (
    <div className={classes.notch_wraper}>
        <div>
            <div><Link className={classes.notch_link} href='#'>All Products</Link></div>
            <div><Link className={classes.notch_link} href='#'>Manufacturers</Link></div>
            <div><Link className={classes.notch_link} href='#'>Resources</Link></div>
            <div><Link className={classes.notch_link} href='#'>Communities</Link></div>
        </div>
        <div>
            <div><Link className={classes.notch_link} href='#'>Favourites</Link></div>
            <div><Link className={classes.notch_link} href='#'>Buying Tools</Link></div>
        </div>
    </div>
  )
}

export default HeaderNotch