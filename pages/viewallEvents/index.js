
import ContentContainer from "../../components/ui/content-container/content-container";

import { useState } from "react";
import classes from './viewallEvents.module.less'
import React from "react";
import MainWrapper from "../../components/ui/wrapper/wrapper";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useEffect } from "react";
import { AddEvent, GetEvents, GetSingleEvents } from "../../services/apis/apisHome";
import { useRouter } from "next/router";
import EventHeading from "../../components/eventsheadings";
import MyButton from "../../components/ui/my-button";
import EventItem from "../../components/home/event-item";
import { useRecoilState } from "recoil";
import { selectedEventState } from "../../recoil/atoms/home";
import CommonService from "../../services/commonService";
import Tabs from "../../components/ui/tabs/tabs";
import DateService from "../../services/dateService";






const ViewAllEvents = () => {
    const { t } = useTranslation("common");
    const router = useRouter()
    const currentDate = new Date().toLocaleDateString();

   //state variables
   const [showModal, setShowModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState);
   const [eventsMenu, setEventsMenu] = useState([
       { id: 0, name: "Upcoming Events", active: true },
       { id: 1, name: "Ongoing Events", active: false },
       { id: 2, name: "Events Held", active: false },
   ])
   const [events, setEvents] = useState([])
   const [fullEvents, setFullEvents] = useState([]);
   const [mediapath, setMediaPath] = useState("");
   
   const [tab, setTab] = useState(0);


   //api calls
   const GetEventsFunc = GetEvents();







   ///////////////////try
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






   useEffect(() => {

       let currentDate = new Date().toISOString().split('T')[0];

       let localEvents = CommonService.copyObject(fullEvents);

       let fi = [];

       localEvents.forEach(item => {

           if (item.date > currentDate) {
               fi.push(item)
           }
       });

       setEvents(fi)

   }, [fullEvents])





   ///////try
   useEffect(() => {

    let localEvents = CommonService.copyObject(fullEvents);

    let fi = [];

    localEvents.forEach(item => {

      let myDate = DateService.changeDateFormat(item.date, "yyyy-mm-dd", "dd/mm/yyyy")

      if (myDate > currentDate) {
        fi.push(item)
      }
    });

    setEvents(fi)

  }, [fullEvents])

   const getEvents = (menu) => {
    //menu update
    // let localMenuItems = [];

    // eventsMenu?.map((localMenu, localIndex) => {
    //   if (localIndex === index) {
    //     localMenuItems.push({ ...localMenu, active: true })
    //   } else {
    //     localMenuItems.push({ ...localMenu, active: false })
    //   }
    // })
    // setEventsMenu(localMenuItems);
    let localEvents = CommonService.copyObject(fullEvents);

    let fi = [];
    if (menu === "Upcoming events") {
      localEvents.forEach(item => {
        let myDate = DateService.changeDateFormat(item.event_date, "yyyy-mm-dd", "dd/mm/yyyy")

        if (myDate > currentDate) {
          fi.push(item)
        }
      });

    } else if (menu === "Ongoing events") {
      localEvents.forEach(item => {
        let myDate = DateService.changeDateFormat(item.event_date, "yyyy-mm-dd", "dd/mm/yyyy")

        if (myDate == currentDate) {
          fi.push(item)
        }
      });

    } else {
      localEvents.map(item => {
        let myDate = DateService.changeDateFormat(item.event_date, "yyyy-mm-dd", "dd/mm/yyyy")

        if (myDate < currentDate) {
          fi.push(item)
        }
      });

    }
    setEvents(fi)
  }

  const onEventClick = event => {
    setSelectedEvent(event)

    setTimeout(() => {
      router.push(`/event/${event.id}`)
    }, 300)
  }



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

                    <EventHeading label="EVENTS,WORKSHOPS AND SEMINARS" />
                    <div className={classes.type_events}>
                    <Tabs data={["Upcoming events", "Ongoing events", "Held events"]} setTab={(index) => getEvents(index)} />


                    </div>
                    
                    <div className={classes.events_card_container}>
                        <div className={classes.events_container}>

                            {events?.map((event, index) => {
                                return <EventItem event={event} index={index} onEventClick={(event) => onEventClick(event)} mediaPath={mediapath}  />
                            })}

                        </div>
                    </div>

                </ContentContainer>
            </div>




        </MainWrapper>
    );
};




export default ViewAllEvents;