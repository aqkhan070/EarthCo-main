import React, { useContext, useEffect } from "react";
import EstimateTR from "./Estimates/EstimateTR";
import ServiceRequestTR from "./ServiceRequest/ServiceRequestTR";
import { NavLink } from "react-router-dom";
import { DataContext } from "../context/AppData";
import { RoutingContext } from "../context/RoutesContext";
import $ from "jquery";
import "datatables.net";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import TitleBar from "./TitleBar";
import DashBoardSR from "./DashboardComponents/DashBoardSR";
import DashboardEstm from "./DashboardComponents/DashboardEstm";
import DashBoardCards from "./DashboardComponents/DashBoardCards";
import useFetchDashBoardData from './Hooks/useFetchDashBoardData'


const DashBoard = () => {
  const {dashBoardData, getDashboardData} = useFetchDashBoardData() ;
    useEffect(() => {
        getDashboardData()
    },[])

  const { estimates, setSingleObj, serviceRequests, setSingleSR } = useContext(DataContext);
  const { setEstimateRoute, setSRroute } = useContext(RoutingContext);

  const handleCatClick = (type, id) => {
    setEstimateRoute(type);
    const updatedArr = estimates.filter((object) => {
      if (id === object.estimateID) {
        return object;
      }
      return object;
    });
    setSingleObj(updatedArr);
  };

 

  const icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 18.3333V10H12.5V18.3333"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

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
              <div className="card-header border-0 pb-1">
                <h4 className="heading mb-0">Upcoming Schedules</h4>
              </div>
              <div className="card-body schedules-cal p-2">
                <Calendar style={{ width: "100%" }} />
                <div className="events">
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
                </div>
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
