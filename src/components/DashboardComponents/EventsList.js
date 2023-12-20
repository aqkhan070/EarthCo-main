import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Create, Delete, Update } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TblDateFormat from "../../custom/TblDateFormat";

const EventsList = ({ eventsList, onDeleteEvent }) => {
  return (
    <>
      <div className="events">
        <h6>events</h6>
        <div className="dz-scroll event-scroll">
          <div className="scrollable-events">
            {eventsList.map((event, index) => {
              // Parse the event's start.dateTime
              const eventDate = new Date(event.start.dateTime);

              // Define an array of day names
              const dayNames = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ];

              // Get the day name, date, and time
              const dayName = dayNames[eventDate.getDay()];
              const date = eventDate.getDate();
              const hours = eventDate.getHours();
              const minutes = eventDate.getMinutes();

              // Format the time as "HH:mm AM/PM"
              const formattedTime = `${hours % 12}:${
                minutes < 10 ? "0" : ""
              }${minutes} ${hours >= 12 ? "PM" : "AM"}`;

              return (
                <div key={index} className="event-media">
                  <div className="d-flex align-items-center">
                    <div className="event-box">
                      <h5 className="mb-0">{date}</h5>
                      <span>{dayName}</span>
                    </div>
                    <div className="event-data ms-2">
                      <h5 className="mb-0">
                        <NavLink to="https://calendar.google.com/calendar">
                          {event.summary}
                        </NavLink>
                      </h5>
                      <span>{event.description}</span>
                    </div>
                  </div>
                  <span className="text-secondary">{formattedTime}</span>
                  
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => onDeleteEvent(event.id)}
                  >
                    <Delete color="error" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsList;
