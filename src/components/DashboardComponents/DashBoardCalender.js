import React from "react";
import Calendar from "react-calendar";
import { NavLink } from "react-router-dom";


const DashBoardCalender = () => {
 

  return (
    <>
      

      <Calendar style={{ width: "100%" }} /> 
      {/* <div className="events">
        <h6>events</h6>
        <div className="dz-scroll event-scroll">
          <div className="event-media">
            <div className="d-flex align-items-center">
              <div className="event-box">
                <h5 className="mb-0">20</h5>
                <span>Mon</span>
              </div>
              <div className="event-data ms-2">
                <h5 className="mb-0">
                  <NavLink>Development planning</NavLink>
                </h5>
                <span>w3it Technologies</span>
              </div>
            </div>
            <span className="text-secondary">12:05 PM</span>
          </div>
          <div className="event-media">
            <div className="d-flex align-items-center">
              <div className="event-box">
                <h5 className="mb-0">20</h5>
                <span>Mon</span>
              </div>
              <div className="event-data ms-2">
                <h5 className="mb-0">
                  <NavLink>Development planning</NavLink>
                </h5>
                <span>w3it Technologies</span>
              </div>
            </div>
            <span className="text-secondary">12:05 PM</span>
          </div>
          <div className="event-media">
            <div className="d-flex align-items-center">
              <div className="event-box">
                <h5 className="mb-0">20</h5>
                <span>Mon</span>
              </div>
              <div className="event-data ms-2">
                <h5 className="mb-0">
                  <NavLink>Development planning</NavLink>
                </h5>
                <span>w3it Technologies</span>
              </div>
            </div>
            <span className="text-secondary">12:05 PM</span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DashBoardCalender;
