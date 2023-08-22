import React, { useState } from 'react';
import classes from './event-item.module.less'
import { useRecoilState } from 'recoil';

import { kuposModalErrorSuccessState } from '../../../recoil/atoms/common';
import baseUrls from '../../../services/constants/baseUrls';
import DateService from '../../../services/dateService';




const EventItem = ({ event, index, onEventClick, mediaPath }) => {

    const [modalErrorSuccess, setModalErrorSuccess] = useRecoilState(kuposModalErrorSuccessState)

    // const onEventClick = id => {
    //     onClick
    //    router.push(`/event/${id}`)
    // }



    // state variables
let [joined, setJoined] = useState(false);


    const join = (status) => {
        setModalErrorSuccess({ showModal: true, success: status, modalTitle: "You have successfully joined the event!", })
    }
    return (
        <>
            <div className={classes.event_single_item}>
                <div className={classes.event_single_item_image}>{<img src={baseUrls.mediaUrl +mediaPath+"/" +event.event_image }/>}</div>
                <div className={classes.event_card_container}>
                <div className={classes.title}>
                    <span className={classes.title_topicname}>Title : </span>
                    <span className={classes.title_value}>{event.title}</span>
                </div>
                {/* <div className={classes.desc}>{event.body}</div> */}
                <div className={classes.date_container}>

                    <div className={classes.date}>
                        <span>Start Registration :   </span>
                        <span className={classes.title_value}>{DateService.changeDateFormat(event.reg_starts, "yyyy-mm-dd", "dd/mm/yyyy")}</span>
                    </div>
                    <div className={classes.date}>
                        <span>End Registration : </span>
                        <span className={classes.title_value}>{DateService.changeDateFormat(event.reg_ends, "yyyy-mm-dd", "dd/mm/yyyy")}</span>
                    </div>
                </div>
                <div className={classes.date_action_container}>
                    <div className={classes.date}>
                        <span> Date : </span>
                        <span className={classes.title_value}>{DateService.changeDateFormat(event.event_date, "yyyy-mm-dd", "dd/mm/yyyy")}</span>
                    </div>
                    {/* <div ><img className={classes.action_button}  key={index} onClick={() => onEventClick(event)} src='/images/icons/chevron-right.png' /></div> */}
                </div>
             </div>
             {/* {joined ? <span> Already Joined</span> : <div className={classes.event_button} onClick={() => join(true)}>join</div>} */}
                <div className={classes.join_button}  key = {index} onClick={() => onEventClick(event)}> See Details</div>
        </div >


        {/* {showModal ? (
       
                <EventDescription item={selectedEvent} setShowModal={() => setShowModal(!showModal)} />
              ):null} */}
        </>





    )
}

export default EventItem;