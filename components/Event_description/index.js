import React, { useState } from "react";
import classes from './event-description.module.less'
const EventDescription = ({item, setShowModal}) => {
     console.log("***item",item)
     console.log("***item setshowmodal",item)

    return (
             <div className={classes.event_description_main}>
                <div onClick={() =>setShowModal()}><img className={classes.cancel_button} src='/images/icons/cross.png' /></div>
                <div className= {classes.event_details}>Topic: {item?.title}</div>
                <div className={classes.event_details}> Capacity {item?.body}</div>
                <div className={classes.event_details}>
                    <span>start time : {item?.starttime}</span>
                    <span>end time : {item?.endtime}</span>
                </div>
                <div className={classes.event_details}> Venue : {item?.venue}</div>
                <div className={classes.event_details}> Motivation : {item?.motivation}</div>
                <div className={classes.event_details}> Cordinator : {item?.cordinator}</div>
                <div className={classes.event_details}> Awards : {item?.awards}</div>
                <div className={classes.event_details}> Speakers : {item?.speaker}</div>
                <div className={classes.event_join_button}> Join</div>
            </div>
        
    )
}
export default EventDescription ;