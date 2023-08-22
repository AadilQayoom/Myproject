import React from "react";
import classes from './JoinMessage.module.less'
const PopupMessage=()=>{
    return(
        <div className={classes.popup_main}>
            <div className={classes.popup_message}>You have sucessfully joined</div>
        </div>

    )
}
export default PopupMessage;