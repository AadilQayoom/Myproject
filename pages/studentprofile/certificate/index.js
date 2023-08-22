import React from "react";
import classes from "./generatecertificate.module.less"
import ContentContainer from "../../../components/ui/content-container/content-container";
import MyButton from "../../../components/ui/my-button";
const GenerateCertificate = ()=>{
    return(
        <ContentContainer>
            <div className={classes.certificate_generate_main_container}>
                <div className={classes.certificate_generate_main_heading}>
                    <div className={classes.certificate_generate_logo}><img src="/images/iustimages/universitylogo2.png"></img></div>
                    {/* <div className={classes.certificate_generate_heading}>University Of Science And Technology Awantipora</div> */}
                </div>
                <div className={classes.sub_heading}> CERTIFICATE OF ACHIEVEMENT</div>
                <div className={classes.sub_heading_title}> This certificate is presented to</div>
                <div className={classes.sub_heading_name}>Faizan Nazir</div>
                <div className={classes.certificate_heading_description}>lEvent Management Courses are a vast study of various sets of planning, coordination, and execution required to manage, organize or run a wide variety of events such as Institutional fests, Corporate parties, seminars, Social and c </div>
                <div className={classes. certificate_sign_container}>
                 <div className={classes.certificate_sign1}>
                    <div className={classes.cordinater_sign}><img src="/images/iustimages/signiture.jpg"></img></div>
                    <div className={classes.cordinater_sign_label}>cordinator</div>
                 </div>
                 <div className={classes.certificate_sign1}>
                    <div className={classes.cordinater_sign}><img src="/images/iustimages/signiture.jpg"></img></div>
                    <div className={classes.cordinater_sign_label}>president</div>
                 </div>
                </div>
            </div>
          <div className={classes.download_btn}>  <MyButton label="Download" /></div>
        </ContentContainer>
    )
}
export default GenerateCertificate;