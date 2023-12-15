npm install react-google-calendar

import React from "react";
import { GoogleCalendar } from "react-google-calendar"; // Import the Google Calendar component

const DashBoard = () => {
  // ... Your existing code ...

  return (
    <>
      <TitleBar icon={icon} title="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <div className="">
              <DashBoardSR dashBoardData={dashBoardData} />
            </div>
            <div className="">
              <DashboardEstm dashBoardData={dashBoardData} />
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-header border-0 pb-1 bg-primary">
                <h4 className="heading " style={{ color: "white" }}>Upcoming Schedules</h4>
              </div>
              <div className="card-body schedules-cal p-2">
                <GoogleCalendar
                  apiKey="AIzaSyCjzYaqHLTRqKfYdgOEdstckqV1TlpdwLU"
                  // Add any necessary props and configuration here
                />
              </div>
            </div>
          </div>

          <DashBoardCards dashBoardData={dashBoardData} />
        </div>
      </div>
    </>
  );
};

export default DashBoard;

