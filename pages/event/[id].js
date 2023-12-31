
import ContentContainer from "../../components/ui/content-container/content-container";

import { useState } from "react";
import classes from './event_descriptionid.module.less'
import React from "react";
import MainWrapper from "../../components/ui/wrapper/wrapper";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useEffect } from "react";
import { AddEvent, GetEvents, GetSingleEvents, JoinEvent } from "../../services/apis/apisHome";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedEventState } from "../../recoil/atoms/home";
import PopupMessage from "../../components/JoinMessage";
import { kuposModalErrorSuccessState, loginDataState } from "../../recoil/atoms/common";
import DateService from "../../services/dateService";
import baseUrls from "../../services/constants/baseUrls";





const EventDetails = () => {

    const router = useRouter();

    const { t } = useTranslation("common");
    const [popupMessage, setpopupMessage] = useState(false);


    //recoil states
    const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState);
    const [modalErrorSuccess, setModalErrorSuccess] = useRecoilState(kuposModalErrorSuccessState)
    const loginData = useRecoilValue(loginDataState)

    //state vars
    let [joined, setJoined] = useState(false);
    const [mediaPath, setMediaPath] = useState("");
    const GetEventsFunc = GetEvents();
    const [events, setEvents] = useState([])
    const [fullEvents, setFullEvents] = useState([]);


    console.log({ selectedEvent })
    console.log({ loginData })

    //api call
    const getMyEventDetails = GetSingleEvents();
    const joinEvent = JoinEvent()

    let allEvents = [];
   


    useEffect(() => {


        let data = {
            "event_id": router.query.id
        }


        getMyEventDetails({
            callback: res => {

                if (res?.data?.[0]) {
                    setSelectedEvent(res.data[0])
                }

            }, data: data
        })


    }, [])

    useEffect(() => {
        let alreadyJoinedEvents = loginData?.joined_events? loginData?.joined_events : [] ;
        for(let eve of alreadyJoinedEvents){
            allEvents.push(eve)
            if(eve == router.query.id){
                setJoined(true)
            }
        }
    },[loginData])

    console.log({joined})


    const join = (status) => {
        


        let alreadyJoinedEvents = loginData.joined_events? loginData.joined_events : [] ;
        let allEvents = [];


        for(let eve of alreadyJoinedEvents){
            allEvents.push(eve)
        }

        allEvents.push(router.query.id)

        console.log(allEvents)

        // return

        let data = {
            "user_id": loginData.id,
            "joined_events": JSON.stringify(allEvents)
        }

        joinEvent({ callback: res =>{
            if(res && res.data && res.status === "200" && res.success){
                setModalErrorSuccess({ showModal: true, success: status, modalTitle: "You have successfully joined the event!", })


                setTimeout(() => {
                    router.push("/")
                }, 600)

            }
        }, data: data })


    }


    /////try
    useEffect(() => {
        GetEventsFunc({
          callback: res => {
    
            console.log("Response from evenets api", res)
            if (res?.data?.length) {
             
              setFullEvents(res?.data)
              setEvents(res?.data)
    
              setMediaPath(res.mediaPath)
            }
          }
        })
      }, []);


    return (
        <MainWrapper t={t}>
            <div className={classes.container}>
                <Head>
                    <title>cumputer-club</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossOrigin="anonymous"
                    />
                </Head>
                <ContentContainer>


                    <div className={classes.event_description_main}>
                        <div></div>
                        <div className={classes.main_heading}>
                            <span className={classes.event_line}></span>
                            <span className={classes.event_heading}>Event Details</span>
                            <span className={classes.event_line}></span>
                        </div>
                        <div className={classes.event_description_banner}>{<img src={baseUrls.mediaUrl +mediaPath+"/" +selectedEvent.event_banner }/>}</div>

                        <div className={classes.event_description_heading}>
                            <div className={classes.event_description_content}>
                                <div className={classes.event_content1}>
                                    <span className={classes.event_name}>Title : </span>
                                    <span className={classes.event_name_con}> {selectedEvent.title} </span></div>

                                <div className={classes.event_content}>
                                    <div className={classes.event_details}>
                                        <span className={classes.clock_icons}><img src="/images/iustimages/clock.jpg" /></span>
                                        <span>Start time : </span>
                                        <span className={classes.start_clock}> {DateService.ampm(selectedEvent.start_time)}</span>
                                    </div>
                                    <div className={classes.event_details}>
                                        <span className={classes.clock_icons}><img src="/images/iustimages/clock.jpg" /></span>
                                        <span>End time : {selectedEvent.end}</span>
                                        <span className={classes.start_clock}> {DateService.ampm(selectedEvent.end_time)}</span>
                                    </div>
                                </div>


                            </div>
                            <div className={classes.event_description_contentsecond}>
                                <div className={classes.event_description_motivation_image}>{<img src={baseUrls.mediaUrl +mediaPath+"/" +selectedEvent.event_image }/>}</div>
                                <div className={classes.event_registration}>
                                    <div className={classes.event_content}>
                                        <div className={classes.start_registration}>
                                            Start registration :
                                            <span className={classes.start_time}>{DateService.changeDateFormat(selectedEvent.reg_starts, "yyyy-mm-dd", "dd/mm/yyyy")}</span>
                                        </div>
                                        <div className={classes.start_registration}>End registration :
                                            <span className={classes.start_time}>{DateService.changeDateFormat(selectedEvent.reg_ends, "yyyy-mm-dd", "dd/mm/yyyy")}</span></div>
                                    </div>
                                    <div className={classes.event_content_cordinator}>Date of commencement :

                                        <span className={classes.start_time}> {DateService.changeDateFormat(selectedEvent.event_date, "yyyy-mm-dd", "dd/mm/yyyy")}</span>
                                    </div>
                                    <div className={classes.event_content_cordinator}>Seats available :

                                        <span className={classes.start_time}> {selectedEvent.capacity } </span>
                                    </div>

                                    <div className={classes.event_content_cordinator}>Cordinator :
                                        <span className={classes.start_time}>{selectedEvent.coordinator_name }</span>
                                    </div>
                                    <div className={classes.event_content_cordinator}>Awards :
                                        <span className={classes.start_time}>{selectedEvent.awards}</span>
                                    </div>
                                    <div className={classes.event_content_cordinator}>Venue :

                                        <span className={classes.start_time}> {selectedEvent.venue }</span>
                                    </div>
                                    <div className={classes.event_content_cordinator}>Entry Fee :

                                        <span className={classes.start_time}>{selectedEvent.entry_fee }</span>
                                    </div>
                                    <div className={classes.event_content_cordinator}>Status :

                                        <span className={classes.start_time}> {selectedEvent.status === 1 ? "Active" : "Inactive"} </span>
                                    </div>
                                    <div className={classes.event_content_cordinator}>Mode:

                                        <span className={classes.start_time}>{selectedEvent.mode } </span>
                                    </div>

                                    <div className={classes.event_content_cordinator}> Event Description : <span className={classes.start_time}>{selectedEvent.description}</span> </div>


                                   <div>{joined ? <span className={classes.event_joined_confirmation}> Already Joined...!!!</span> : <div className={classes.event_button} onClick={() => join(true)}>join</div>}</div> 

                                    {/* <PopupMessage /> */}
                                    {popupMessage ? (
                                        <div className={classes.popup_main}>
                                            <div className={classes.popup_message}>You have sucessfully joined</div>
                                        </div>
                                    ) : null}

                                </div>
                            </div>
                        </div>

                    </div>


                </ContentContainer>
            </div>
        </MainWrapper>
    );
};

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? "es", ["common"])),
//   },
// });

// export const getStaticPaths = async () => {
//   return {
//       paths: [], //indicates that no page needs be created at build time
//       fallback: "blocking", //indicates the type of fallback
//   };
// };

export default EventDetails;
