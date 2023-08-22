import React, { useEffect, useState } from "react";
import classes from "./studentprofile.module.less";
import MainWrapper from "../../components/ui/wrapper/wrapper";
import ContentContainer from "../../components/ui/content-container/content-container";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import Tabs from "../../components/ui/tabs/tabs";
import { GetEvents, getProfile } from "../../services/apis/apisHome";
import CommonService from "../../services/commonService";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedEventState } from "../../recoil/atoms/home";
import HeldEvents from "../../components/heldevents";
import moment from 'moment'
import { loginDataState } from "../../recoil/atoms/common";
import MyButton from "../../components/ui/my-button";
import { useRouter } from "next/router";
import DateService from "../../services/dateService";
import baseUrls from "../../services/constants/baseUrls";



const StudentProfile = (mediapath) => {


    const router = useRouter();
    const { t } = useTranslation("common");

    //recoil states 
    const [loginData, setLoginData] = useRecoilState(loginDataState);

    console.log({ loginData })

    //state variables
    const [showModal, setShowModal] = useState(false);
    const [isLoggedin, setisLoggedin] = useState(false);
    const [mediaPath, setMediaPath] = useState("");
    const GetEventsFunc = GetEvents();
    const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState);
    const [eventsMenu, setEventsMenu] = useState([
        { id: 0, name: "Upcoming Events", active: true },
        { id: 1, name: "Ongoing Events", active: false },
        { id: 2, name: "Events Held", active: false },
    ])

    const [events, setEvents] = useState([])
    const [fullEvents, setFullEvents] = useState([]);
    const [tab, setTab] = useState(0);
    const [joinedEvents, setJoinedEvents] = useState(null)
    const [tabValue, setTabValue] = useState("Upcoming events")
    const [currentMonth, setCurrentMonth] = useState([])


    const [calenderEvents, setCalenderEvents] = useState([
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "this is the date of first event starting in this universithy"
        }
    ])

    //api calls
    const getProfileData = getProfile();


    console.log({ calenderEvents })




    useEffect(() => {
        let data = {
            "user_id": loginData.id
        }
        getProfileData({
            callback: res => {

                if (res?.data?.id) {
                    setLoginData(res.data)

                }

                if (res?.events) {
                    setJoinedEvents(res.events)
                }

                console.log("response from profile api", res)

            }, data: data
        })

    }, [])

    console.log({ joinedEvents })
    console.log({ tabValue })

    useEffect(() => {


        let currentDate = new Date().toISOString().split('T')[0];


        let localCalenderEvents = [];
        (joinedEvents || []).forEach(event => {
            console.log({ event })
            // if (event.start_registration >= currentDate) {
            localCalenderEvents.push({
                start: event.reg_starts,
                end: event.reg_ends,
                title: event.title
            })
            // }
        })

        setCalenderEvents(localCalenderEvents)

    }, [joinedEvents])

    useEffect(() => {
        const element = document.getElementsByClassName("rbc-event-content");
        console.log("...........", element);
        // const element2= element.slice(0,10);
        // document.getElementById("rbc-event-content").textContent = element2;
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


    const onEventClick = event => {
        setSelectedEvent(event)

        setTimeout(() => {
            router.push(`/event/${event.id}`)
        }, 300)
    }

    const logout = () => {
        localStorage.clear();
        // setisLoggedin(false);
        setLoginData(null)
        setTimeout(() => {
            router.push('/login')
        }, 1000)
    }



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


        let monthArray = []
        for (let item of Array(30).keys()) {
            console.log(item)

            let day = item + 1;



            let event = checkEvents(day)

            console.log("Event is---", event)
            if (event) {
                monthArray.push({ day: day, event: event })

            } else {
                monthArray.push({ day: day })
            }
        }

        setCurrentMonth(monthArray)

    }, [fullEvents])


    const checkEvents = (day) => {


        let myDate = new Date();

        myDate.setDate(day)

        myDate = DateService.changeDateFormat(myDate.toLocaleDateString(), "dd/mm/yyyy", "yyyy-mm-dd")

        let eventFound = [];

        fullEvents.map(event => {

            if (event.reg_starts == myDate) {
                eventFound.push(event);
            }
        })

        return eventFound;
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


                <div className={classes.StudentProfile_main}>
                    <ContentContainer>
                        <div className={classes.StudentProfile_heading}>
                            <div className={classes.line_separator}></div>
                            <div className={classes.StudentProfile_text}>Profile</div>
                            <div className={classes.line_separator}></div>
                        </div>
                        <div className={classes.main_header}>
                            <div className={classes.image}>
                                <img src="/images/iustimages/image1.jpg"></img>
                            </div>


                            <div className={classes.profile_heading_container}>
                                <div className={classes.student}>
                                    Name :<span className={classes.student_details}> {loginData?.name} {loginData?.l_name} </span>
                                </div>

                                <div className={classes.student}>
                                    Registration Number:
                                    <span className={classes.student_details}> {loginData?.reg_number} </span>
                                </div>
                                <div className={classes.student}>
                                    Mobile Number:
                                    <span className={classes.student_details}>{loginData?.mobile} </span>
                                </div>
                                <div className={classes.student}>
                                    Email:
                                    <span className={classes.student_details}>{loginData?.email}</span>
                                </div>

                            </div>
                            <div className={classes.logout_button}>
                                <MyButton onClick={() => logout()} label="Logout" style={{ width: "200px" }} />
                            </div>

                        </div>





                        <Tabs data={["Upcoming events", "joined events"]} setTab={(index) => setTabValue(index)} />

                        {tabValue === "Upcoming events" ?
                            <div className="calender_root">
                                {/* <Calendar
                                    localizer={localizer}
                                    events={calenderEvents}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                /> */}

                                {currentMonth?.map(day => {
                                    return <Day day={day} />
                                })}

                                <div className="calender_wrapper">

                                    {/* {Array(10).keys().map(ele => console.log(ele))} */}

                                </div>
                            </div> : joinedEvents.map((event) => {
                                return (
                                    <HeldEvents title={event.title}
                                        date={DateService.changeDateFormat(event.event_date, "yyyy-mm-dd", "dd/mm/yyyy")}
                                        coordinator={event.coordinator_name}
                                        status={event.status === 1 ? "complete" : "Incomplete"}
                                        image={baseUrls.mediaUrl + mediaPath + "/" + event.event_image}




                                    />

                                )

                            })}


                        {/* {  console.log("path====", baseUrls.mediaUrl+mediaPath+'/' )} */}

                    </ContentContainer>
                </div>
            </div>
        </MainWrapper>
    );
};


function Day({ day }) {
    console.log({day})
    return (
        <div className="day_wrapper">
            <div className="day_number font10 bold-text">{day.day}</div>

            {day?.event?.length ? <div className="day_events">{
                day?.event?.map(event => {
                    return <div className="single_day_event">{event?.title}</div>
                })
            }</div> : null}
        </div>
    )
}

export default StudentProfile;