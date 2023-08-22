import React from "react";
import classes from './gallery-events.module.less'
const EventsGallery=(props)=>{
    const gallery=[
        {id:0,  image:<img src="/images/iustimages/image1.jpg"/>,desc:"COMPUTER CLUB"},
        {id:1,  image:<img src="/images/iustimages/image2.jpg"/>,desc:"COMPUTER CLUB"},
        {id:2, image:<img src="/images/iustimages/image3.jpg"/>,desc:"COMPUTER CLUB"},
        {id:3, image:<img src="/images/iustimages/image9.jpg"/>,desc:"COMPUTER CLUB"},
        {id:4, image:<img src="/images/iustimages/image5.jpg"/>,desc:"COMPUTER CLUB"},
        {id:5, image:<img src="/images/iustimages/image10.jpg"/>,desc:"COMPUTER CLUB"},
        
 
    ]

    return(
        gallery?.map((item)=>{
        return<div >
            <div className={classes.event_section}>
        <div className={classes.event_image}>{item.image}</div>
        <div className={classes.event_desc}>{item.desc}</div>
        </div>
      </div>
        })
    );
}
export default EventsGallery;