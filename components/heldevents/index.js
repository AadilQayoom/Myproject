import reactDom from "react-dom";
import ContentContainer from "../ui/content-container/content-container";
import classes from "./heldevents.module.less";
import MyButton from "../ui/my-button";
import { useRouter } from "next/router";
const HeldEvents=(props)=>{

    const gotojoineddescription=()=>{
        router.push('/joinedeventdiscription')
      }
      const router= useRouter();
    
    return(
        <ContentContainer>
            <div className={classes.event_held_main_container}>
                <div className={classes.held_event_image}><img src={props.image}></img></div>
                <div className={classes.held_event_body}>
                <div className={classes.held_event_body_details}> Title : 
                <span className={classes.held_event_label}>{props.title}</span>
                </div>
                <div className={classes.held_event_body_details}> Date of commencement :
                    <span className={classes.held_event_label} > {props.date}</span>
                </div>
                <div className={classes.held_event_body_details}> coordinator :
                    <span className={classes.held_event_label} >{props.coordinator}</span>
                </div>
                <div className={classes.held_event_body_details}> Status :
                    <span className={classes.held_event_label} >{props.status}</span>
                </div>
                <div className={classes.my_btn}><MyButton label="See Details"  onClick={() => gotojoineddescription()}
              /></div>
                </div>
            </div>
        </ContentContainer>
    )
    
}
export default HeldEvents;