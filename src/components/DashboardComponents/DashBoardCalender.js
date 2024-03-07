import React, { useState, useEffect, useRef, useContext } from "react";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { Add, Delete, Edit, Create } from "@mui/icons-material";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import TblDateFormat from "../../custom/TblDateFormat";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Popover from "@mui/material/Popover";
import axios from "axios";
import EventPopups from "../Reusable/EventPopups";
import EventsList from "./EventsList";
import DateEventList from "./DateEventList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import SyncIcon from "@mui/icons-material/Sync";

import useSaveGoogleToken from "../Hooks/useSaveGoogleToken";
import { DataContext } from "../../context/AppData";
import CustomizedTooltips from "../Reusable/CustomizedTooltips";
import Cookies from "js-cookie";
const DashBoardCalender = ({ dashBoardData, getDashboardData }) => {
  const requestAbortController = useRef(null);
  const [loading, setLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const [eventsList, setEventsList] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const session = useSession();
  const supabase = useSupabaseClient();
  const { loggedInUser, setLoggedInUser } = useContext(DataContext);

  const { isLoading } = useSessionContext();
  const { sendToken, deleteToken } = useSaveGoogleToken();
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [1, 2, 3].map(() =>
          getRandomNumber(1, daysInMonth)
        );

        resolve({ daysToHighlight });
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }

  const editEvent = async (eventId, summary, description, date, start, end) => {
    if (!end || !start) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Enter start and End time");
      return; // Exit the function early if end time is before start time
    }
    if (dayjs(end).isBefore(dayjs(start))) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("End time cannot be before start time");
      return; // Exit the function early if end time is before start time
    }
    const formattedStart = dayjs(date)
      .hour(dayjs(start).hour())
      .minute(dayjs(start).minute())
      .toISOString();
    const formattedEnd = dayjs(date)
      .hour(dayjs(end).hour())
      .minute(dayjs(end).minute())
      .toISOString();

    const updatedEvent = {
      summary: summary,
      description: description,
      start: {
        dateTime: formattedStart,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: formattedEnd,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    try {
      const response = await axios.put(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        updatedEvent,
        {
          headers: {
            Authorization: "Bearer " + loggedInUser.ProviderToken,
          },
        }
      );
      console.log("Event updated", response.data);
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText("Event updated successfully");
      fetchGoogleEvents();
    } catch (error) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Error updating event");
      console.error("Error updating event:", error);
    }
  };

  const initialValue = dayjs();

  function ServerDay(props) {
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [clickedDate, setClickedDate] = useState(null);
    const [title, settitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showAdd, setShowAdd] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [eventId, setEventId] = useState("");

    const logEventsForDate = (date) => {
      const eventsOnDate = eventsList.filter((event) => {
        const eventStartDate = dayjs(event.start.dateTime).format("YYYY-MM-DD");
        return eventStartDate === date;
      });
      if (eventsOnDate.length === 0) {
        setShowAdd(true);
      } else {
        setShowAdd(false);
      }
      setSelectedDateEvents(eventsOnDate);
      console.log("Events on " + date + ":", eventsOnDate);
    };

    const isStartDateInEvents = eventsList.some((event) => {
      const eventStartDate = dayjs(event.start.dateTime).format("YYYY-MM-DD");
      return day.format("YYYY-MM-DD") === eventStartDate;
    });

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      const selectedDate = day.format("YYYY-MM-DD");
      setClickedDate(day.format("YYYY-MM-DD"));
      logEventsForDate(selectedDate);
      // Set the event title if a special day is found
    };

    const handleEventEdit = (event) => {
      // Extract and format start and end times
      const eventStartTime = dayjs(event.start.dateTime);
      const eventEndTime = dayjs(event.end.dateTime);
      setShowAdd(true);
      setIsEdit(true);
      setEventId(event.id);
      settitle(event.summary);
      setEventDescription(event.description);

      setStartTime(eventStartTime);
      setEndTime(eventEndTime);

      console.log("Selected event is", event);
    };

    return (
      <>
        <Badge
          key={props.day.toString()}
          overlap="circular"
          onClick={handleClick}
          badgeContent={
            isStartDateInEvents ? <div className="event-dot"></div> : null
          }
        >
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
          />
        </Badge>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
            setEventId(null);
            settitle("");
            setEventDescription("");

            setStartTime(null);
            setEndTime(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div style={{ padding: "2em", width: "40em" }}>
            <div className="row">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsEdit(false);
                  setShowAdd(false);
                  settitle("");
                  setEventDescription("");
                  setStartTime(null);
                  setEndTime(null);
                }}
                className="col-md-1"
              >
                <ArrowBackIcon />
              </div>
              <div className="col-md-5">
                <h4>Schedule Event</h4>
              </div>
              <div className="col-md-6 text-end">
                {" "}
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsEdit(false);
                    setShowAdd(true);
                    setEventId(null);
                    settitle("");
                    setEventDescription("");

                    setStartTime(null);
                    setEndTime(null);
                  }}
                />
              </div>
            </div>

            <p>{TblDateFormat(clickedDate)}</p>
            {showAdd ? (
              <div className="row">
                <div className="col-md-12">
                  {" "}
                  <TextField
                    className="mb-2"
                    label="Event Title"
                    variant="standard"
                    size="small"
                    value={title}
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    className="mb-2"
                    label="Event Decsription"
                    variant="standard"
                    fullWidth
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mt-2">
                  <TimePicker
                    label="Start Time"
                    value={startTime}
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(newTime) => {
                      setStartTime(newTime);
                      console.log("startTime is", newTime);
                    }}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  {" "}
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(newTime) => setEndTime(newTime)}
                  />
                </div>
                <div className="col-md-12 text-end">
                  {isEdit ? (
                    <button
                      className="btn btn-sm btn-primary mt-2"
                      onClick={() =>
                        editEvent(
                          eventId,
                          title,
                          eventDescription,
                          clickedDate,
                          startTime,
                          endTime
                        )
                      }
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary mt-2"
                      onClick={() =>
                        createCalendarEvent(
                          title,
                          eventDescription,
                          clickedDate,
                          startTime,
                          endTime
                        )
                      }
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <DateEventList
                  eventsOnDate={selectedDateEvents}
                  onDeleteEvent={deleteCalendarEvent}
                  handleEventEdit={handleEventEdit}
                />
              </>
            )}
          </div>
        </Popover>
      </>
    );
  }

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("session is ", session);
    console.log("counter is ", counter);
    if (
      session &&
      session.provider_token &&
      Object.keys(session).length !== 0 &&
      counter <= 1
    ) {
      setCounter(counter + 1);
      sendToken(
        {
          AccessToken: session.access_token,
          ProviderToken: session.provider_token,
          RefreshToken: session.refresh_token,
          TokenType: session.token_type,
          UserId: Number(loggedInUser.userId),
          UserEmail: session.user.email,
        }
      
      );
      Cookies.set("ProviderToken", session.provider_token, { expires: 7 });
      console.log("asdfg");
    }
  }, [session]);
  const fetchGoogleEvents = async (click = false) => {
    try {
      // Calculate the start and end date for the time frame (current day to one month from now)
      const currentDate = new Date();
      const endDate = new Date();
      endDate.setMonth(currentDate.getMonth() + 1);

      const response = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: "Bearer " + loggedInUser.ProviderToken, // Use OAuth token
          },
          params: {
            timeMin: currentDate.toISOString(),
            timeMax: endDate.toISOString(),
          },
        }
      );
      console.log("session is ", session);
      console.log("Events:", response.data.items);
      setEventsList(response.data.items);
      if (
        session &&
        session.provider_token &&
        Object.keys(session).length !== 0
      ) {
        sendToken(
          {
            AccessToken: session.access_token,
            ProviderToken: session.provider_token,
            RefreshToken: session.refresh_token,
            TokenType: session.token_type,
            UserId: Number(loggedInUser.userId),
            UserEmail: session.user.email,
          },
          getDashboardData()
        );
        console.log("asdfg");
      }
    } catch (error) {
      if (click) {
        setOpenSnackBar(true);
        setSnackBarColor("error");
        setSnackBarText("Error Fetching event");
      }

      console.error("Error fetching events: error.response.status", error);
    }
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    fetchGoogleEvents();
    console.log("logged in user data is in calender", loggedInUser);
    setLoggedInUser({
      ...loggedInUser,
      userName: Cookies.get("userName"),
      userEmail: Cookies.get("userEmail"),
      userRole: Cookies.get("userRole"),
      userId: Cookies.get("userId"),
      CompanyName: Cookies.get("CompanyName"),
      CompanyId: Cookies.get("CompanyId"),
      RefreshToken: Cookies.get("RefreshToken"),
      ProviderToken:
        Cookies.get("ProviderToken") == "null"
          ? null
          : Cookies.get("ProviderToken"),
      UserEmailGoogle: Cookies.get("UserEmailGoogle"),
    });
    
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  if (isLoading) {
    return <></>;
  }

  const googleSignIn = async () => {
    const { error, user } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: [
          "https://www.googleapis.com/auth/calendar",
          "https://mail.google.com/",
        ],

        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      // If there is an error, log the error and don't proceed further
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    } else if (user) {
      // Call fetchGoogleEvents only if the login was successful (i.e., user is not null)
      fetchGoogleEvents();
      sendToken(
        {
          AccessToken: session.access_token,
          ProviderToken: session.provider_token,
          RefreshToken: session.refresh_token,
          TokenType: session.token_type,
          UserId: Number(loggedInUser.userId),
          UserEmail: session.user.email,
        },
        getDashboardData
      );
      getDashboardData();
      Cookies.set("ProviderToken", session.provider_token, { expires: 7 });
      Cookies.set("UserEmailGoogle", session.user.email, { expires: 7 });
      setLoggedInUser({
        ...loggedInUser,
        ProviderToken: session.provider_token,
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("signed out");
      // Call your success function here
      deleteToken(Number(loggedInUser.userId), getDashboardData);
      Cookies.set("ProviderToken", "", { expires: 7 });
      Cookies.set("UserEmailGoogle", "", { expires: 7 });
      setLoggedInUser({
        ...loggedInUser,
        ProviderToken: null,
        UserEmailGoogle: "",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle the error or call an error handling function if needed
    }
  };

  // Define your success function to be called when sign-out is successful
  const yourSuccessFunction = () => {
    // Your code to execute when sign-out is successful
  };

  const createCalendarEvent = async (
    summary,
    description,
    date,
    start,
    end
  ) => {
    console.log("Creating calendar event");

    if (!end || !start) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Enter start and End time");
      return; // Exit the function early if end time is before start time
    }
    if (dayjs(end).isBefore(dayjs(start))) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("End time cannot be before start time");
      return; // Exit the function early if end time is before start time
    }

    // Format the start and end date-times
    const formattedStart = dayjs(date)
      .hour(dayjs(start).hour())
      .minute(dayjs(start).minute())
      .toISOString();
    const formattedEnd = dayjs(date)
      .hour(dayjs(end).hour())
      .minute(dayjs(end).minute())
      .toISOString();

    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: formattedStart,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: formattedEnd,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    try {
      const response = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        event,
        {
          headers: {
            Authorization: "Bearer " + loggedInUser.ProviderToken, // Access token for Google
          },
        }
      );

      console.log(response.data);
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText("Event added successfully");
      fetchGoogleEvents();
    } catch (error) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Error adding event");
      console.error("Error creating event:", error);
    }
  };

  const deleteCalendarEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          headers: {
            Authorization: "Bearer " + loggedInUser.ProviderToken,
          },
        }
      );
      console.log("Event deleted", response.data);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Event deleted successfully");
      fetchGoogleEvents(); // Refresh the list after deletion
    } catch (error) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Error deleting event");
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="card">
        <div className="calendertitleBar">
          <div className="row">
            <div className="col-sm-8">
              <span>
                <h5
                  style={{
                    color: "white",
                  }}
                >
                  Upcomming Events
                </h5>
              </span>
            </div>
            {loggedInUser.ProviderToken && (
              <>
                <CustomizedTooltips title="Refresh Calender" placement="top">
                  <div className="col-sm-2">
                    <SyncIcon
                      style={{ cursor: "pointer", color: "white" }}
                      onClick={() => fetchGoogleEvents(true)}
                    />
                  </div>
                </CustomizedTooltips>
                <CustomizedTooltips
                  title="Signout from google."
                  placement="top-start"
                >
                  <div className="col-sm-2">
                    <LogoutIcon
                      style={{ cursor: "pointer", color: "white" }}
                      onClick={() => signOut()}
                    />
                  </div>
                </CustomizedTooltips>
              </>
            )}
          </div>
        </div>
        <div className="card-body schedules-cal p-2">
          <div style={{ width: "100%" }}>
            <div className="p-0 " style={{ color: "black" }}>
              {loggedInUser.UserEmailGoogle &&
              loggedInUser.UserEmailGoogle !== "null"
                ? loggedInUser.UserEmailGoogle
                : ""}
            </div>
            {loggedInUser.ProviderToken ? (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    style={{ width: "20em" }}
                    defaultValue={initialValue || null}
                    loading={loading}
                    onMonthChange={handleMonthChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                      day: ServerDay,
                    }}
                    slotProps={{
                      day: {
                        highlightedDays,
                      },
                    }}
                  />
                </LocalizationProvider>
                <EventsList
                  eventsList={eventsList}
                  onDeleteEvent={deleteCalendarEvent}
                />
              </>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-primary mb-2"
                  onClick={() => googleSignIn()}
                >
                  Sign In With Google
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardCalender;
