import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/AppData";

const DashBoardCards = ({ dashBoardData }) => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(DataContext);

  return (
    <div className="col-xl-12 wid-100">
      <div className="row">
        <div className="col-xl-3  col-lg-6 col-sm-6">
          <div className="card bg-warning">
            <div
              className="card-body"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/service-requests`);
              }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <h4 style={{ color: "white" }}>
                    {dashBoardData.OpenServiceRequestCount}
                  </h4>
                  <h5 style={{ color: "white" }}>Open Service Requests</h5>
                </div>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.64111 13.5497L9.38482 9.9837L12.5145 12.4421L15.1995 8.97684"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <ellipse
                      cx="18.3291"
                      cy="3.85021"
                      rx="1.76201"
                      ry="1.76201"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></ellipse>
                    <path
                      d="M13.6808 2.86012H7.01867C4.25818 2.86012 2.54651 4.81512 2.54651 7.57561V14.9845C2.54651 17.7449 4.22462 19.6915 7.01867 19.6915H14.9058C17.6663 19.6915 19.3779 17.7449 19.3779 14.9845V8.53213"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3  col-lg-6 col-sm-6">
          <div className="card bg-info">
            <div
              className="card-body"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/estimates`);
              }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <h4 style={{ color: "white" }}>
                    {dashBoardData.OpenEstimateCount}
                  </h4>
                  <h5 style={{ color: "white" }}>Open Estimates</h5>
                </div>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.8381 12.7317C16.4566 12.7317 16.9757 13.2422 16.8811 13.853C16.3263 17.4463 13.2502 20.1143 9.54009 20.1143C5.43536 20.1143 2.10834 16.7873 2.10834 12.6835C2.10834 9.30245 4.67693 6.15297 7.56878 5.44087C8.19018 5.28745 8.82702 5.72455 8.82702 6.36429C8.82702 10.6987 8.97272 11.8199 9.79579 12.4297C10.6189 13.0396 11.5867 12.7317 15.8381 12.7317Z"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.8848 9.1223C19.934 6.33756 16.5134 1.84879 12.345 1.92599C12.0208 1.93178 11.7612 2.20195 11.7468 2.5252C11.6416 4.81493 11.7834 7.78204 11.8626 9.12713C11.8867 9.5459 12.2157 9.87493 12.6335 9.89906C14.0162 9.97818 17.0914 10.0862 19.3483 9.74467C19.6552 9.69835 19.88 9.43204 19.8848 9.1223Z"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3  col-lg-6 col-sm-6">
          <div className="card bg-success">
            <div
              className="card-body"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/estimates`);
              }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <h4 style={{ color: "white" }}>
                    {dashBoardData.ApprovedEstimateCount}
                  </h4>
                  <h5 style={{ color: "white" }}>Approved Estimates</h5>
                </div>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.8381 12.7317C16.4566 12.7317 16.9757 13.2422 16.8811 13.853C16.3263 17.4463 13.2502 20.1143 9.54009 20.1143C5.43536 20.1143 2.10834 16.7873 2.10834 12.6835C2.10834 9.30245 4.67693 6.15297 7.56878 5.44087C8.19018 5.28745 8.82702 5.72455 8.82702 6.36429C8.82702 10.6987 8.97272 11.8199 9.79579 12.4297C10.6189 13.0396 11.5867 12.7317 15.8381 12.7317Z"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.8848 9.1223C19.934 6.33756 16.5134 1.84879 12.345 1.92599C12.0208 1.93178 11.7612 2.20195 11.7468 2.5252C11.6416 4.81493 11.7834 7.78204 11.8626 9.12713C11.8867 9.5459 12.2157 9.87493 12.6335 9.89906C14.0162 9.97818 17.0914 10.0862 19.3483 9.74467C19.6552 9.69835 19.88 9.43204 19.8848 9.1223Z"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loggedInUser.userRole == "1" && (
          <>
            <div className="col-xl-3  col-lg-6 col-sm-6">
              <div className="card bg-secondary">
                <div
                  className="card-body"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/invoices`);
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <h4 style={{ color: "white" }}>
                        {dashBoardData.BilledInvoiceCount}
                      </h4>
                      <h5 style={{ color: "white" }}>Total Billed Invoices</h5>
                    </div>
                    <div>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.64111 13.5497L9.38482 9.9837L12.5145 12.4421L15.1995 8.97684"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <ellipse
                          cx="18.3291"
                          cy="3.85021"
                          rx="1.76201"
                          ry="1.76201"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></ellipse>
                        <path
                          d="M13.6808 2.86012H7.01867C4.25818 2.86012 2.54651 4.81512 2.54651 7.57561V14.9845C2.54651 17.7449 4.22462 19.6915 7.01867 19.6915H14.9058C17.6663 19.6915 19.3779 17.7449 19.3779 14.9845V8.53213"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-lg-6 col-sm-6">
              <div className="card bg-primary">
                <div
                  className="card-body"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/bills`);
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <h4 style={{ color: "white" }}>
                        {dashBoardData.ClosedBillCount}
                      </h4>
                      <h5 style={{ color: "white" }}>Closed Billed </h5>
                    </div>
                    <div>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.64111 13.5497L9.38482 9.9837L12.5145 12.4421L15.1995 8.97684"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <ellipse
                          cx="18.3291"
                          cy="3.85021"
                          rx="1.76201"
                          ry="1.76201"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></ellipse>
                        <path
                          d="M13.6808 2.86012H7.01867C4.25818 2.86012 2.54651 4.81512 2.54651 7.57561V14.9845C2.54651 17.7449 4.22462 19.6915 7.01867 19.6915H14.9058C17.6663 19.6915 19.3779 17.7449 19.3779 14.9845V8.53213"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="col-xl-3  col-lg-6 col-sm-6">
          <div className="card bg-danger">
            <div
              className="card-body"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/punchlist`);
              }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <h4 style={{ color: "white" }}>
                    {dashBoardData.OpenPunchlistCount}
                  </h4>
                  <h5 style={{ color: "white" }}>Open Punchlist</h5>
                </div>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.634 13.4211C18.634 16.7009 16.7007 18.6342 13.4209 18.6342H6.28738C2.99929 18.6342 1.06238 16.7009 1.06238 13.4211V6.27109C1.06238 2.99584 2.26688 1.06259 5.54763 1.06259H7.38096C8.03913 1.06351 8.65879 1.37242 9.05296 1.89951L9.88988 3.01234C10.2859 3.53851 10.9055 3.84834 11.5637 3.84926H14.1579C17.446 3.84926 18.6596 5.52309 18.6596 8.86984L18.634 13.4211Z"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M5.85754 12.2577H13.8646"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCards;
