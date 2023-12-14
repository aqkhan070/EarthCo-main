import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/earthco_logo_small.png";
import avatar1 from "../../assets/images/avatar/1.jpg";
import profilePic from "../../assets/images/profile/profile.png";
import { DataContext } from "../../context/AppData";
import $ from "jquery";
import { StyleContext } from "../../context/StyleData";
import { useNavigate } from "react-router-dom";

const HeaderExp = () => {
  const [loggedUser, setLoggenUser] = useState(
    sessionStorage.getItem("userEmail")
  );
  const navigate = useNavigate();
  const { mainControl, setMainControl, setShowSM, eliminate } =
    useContext(StyleContext);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth <= 1024 && screenWidth >= 450) {
      setMainControl("tab");
    } else if (screenWidth <= 450) {
      setMainControl("mobileH");
    } else {
      setMainControl("desktop");
    }
  }, [screenWidth]);

  const toggleSideBar = () => {
    if (screenWidth > 450) {
      if (mainControl === "desktop") {
        setMainControl("tab");
      } else {
        setMainControl("desktop");
      }
    } else {
      if (
        mainControl === "desktop" ||
        mainControl === "tab" ||
        mainControl === "mobileH"
      ) {
        setMainControl("mobileS");
      } else {
        setMainControl("mobileH");
      }
    }
  };

  const collapseSideBar = () => {
    $(".navLabel").addClass("dispNone");
    $("#sideBarDez").addClass("toShort");
    $("#contentBody").addClass("bodyChanges");
    $(".header-left").addClass("bodyChanges");
    $(".nav-header").addClass("toShort");
    setShowSM(false);
  };

  const hideSideBar = () => {
    $(".navLabel").removeClass("dispNone");
    $("#sideBarDez").removeClass("toShort");
    $("#sideBarDez").removeClass("transRight");
    $("#contentBody").removeClass("bodyChanges");
    $(".nav-header").addClass("toShort");
  };

  const showSideBar = () => {
    $("#sideBarDez").addClass("transRight");
  };

  const expandSideBar = () => {
    $(".navLabel").removeClass("dispNone");
    $("#sideBarDez").removeClass("toShort");
    $("#contentBody").removeClass("bodyChanges");
    $(".header-left").removeClass("bodyChanges");
    $(".nav-header").removeClass("toShort");
    setShowSM(false);
  };

  useEffect(() => {
    if (mainControl === "desktop") {
      expandSideBar();
    } else if (mainControl === "tab") {
      collapseSideBar();
    } else if (mainControl === "mobileH") {
      hideSideBar();
    } else {
      showSideBar();
    }
  }, [mainControl]);

  return (
    <>
      <div className="nav-header">
        <NavLink className="brand-logo" style={{ background: "#181818" }}>
          <img style={{ width: "55%", marginLeft: "20%" }} src={logo} alt="" />
        </NavLink>
        <div className="nav-control" onClick={toggleSideBar} ref={eliminate}>
          <div className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>
      <div>
        <div className="header">
          <div className="header-content" style={{ background: "#000" }}>
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left">
                  {/* <div className="input-group search-area">
                    <span className="input-group-text">
                      <NavLink>
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="8.78605"
                            cy="8.78605"
                            r="8.23951"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.5168 14.9447L17.7471 18.1667"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </NavLink>
                    </span>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search"
                    />
                  </div> */}
                </div>
                <ul className="navbar-nav header-right">
                  {/* <li className="nav-item dropdown notification_dropdown">
                    <NavLink
                      className="nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </NavLink>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div
                        id="DZ_W_Notification1"
                        className="widget-media dz-scroll p-3"
                        style={{ height: "380px" }}
                      >
                        <ul className="timeline">
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img alt="lazy" width="50" src={avatar1} />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-info">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-success">
                                <i className="fa fa-home"></i>
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img alt="lazy" width="50" src={avatar1} />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-danger">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-primary">
                                <i className="fa fa-home"></i>
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img alt="lazy" width="50" src={avatar1} />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-info">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-success">
                                <i className="fa fa-home"></i>
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img alt="lazy" width="50" src={avatar1} />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-danger">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-primary">
                                <i className="fa fa-home"></i>
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <NavLink className="all-notification">
                        See all notifications <i className="ti-arrow-end"></i>
                      </NavLink>
                    </div>
                  </li> */}

                  <li className="nav-item align-items-center header-border">
                    <NavLink to="/" style={{ display: "contents" }}>
                      <button href="/" className="btn btn-primary btn-sm">
                        Logout
                      </button>
                    </NavLink>
                  </li>
                  <li className="nav-item ps-3">
                    <div className="dropdown header-profile2">
                      <NavLink
                        className="nav-link"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="header-info2 d-flex align-items-center">
                          <div className="header-media">
                            <img src={profilePic} alt="" />
                          </div>
                          <div className="header-info">
                            <h6 className="admin-header">
                              {sessionStorage.getItem("userName")}
                            </h6>
                            <p className="admin-header">{loggedUser}</p>
                          </div>
                        </div>
                      </NavLink>
                      <div className="dropdown-menu dropdown-menu-end">
                        <div className="card border-0 mb-0">
                          <div className="card-header py-2">
                            <div className="products">
                              <img
                                src={profilePic}
                                className="avatar avatar-md"
                                alt=""
                              />
                              <div>
                                <h6> {sessionStorage.getItem("userName")}</h6>
                                <span>
                                  {sessionStorage.getItem("userRole") == 1
                                    ? " Admin"
                                    : "Staff"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="card-body px-0 py-0">
                            <ul>
                              {/* <li className="dropdown-item ai-icon">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.9848 15.3462C8.11714 15.3462 4.81429 15.931 4.81429 18.2729C4.81429 20.6148 8.09619 21.2205 11.9848 21.2205C15.8524 21.2205 19.1543 20.6348 19.1543 18.2938C19.1543 15.9529 15.8733 15.3462 11.9848 15.3462Z"
                                    stroke="var(--primary)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.9848 12.0059C14.5229 12.0059 16.58 9.94779 16.58 7.40969C16.58 4.8716 14.5229 2.81445 11.9848 2.81445C9.44667 2.81445 7.38857 4.8716 7.38857 7.40969C7.38 9.93922 9.42381 11.9973 11.9524 12.0059H11.9848Z"
                                    stroke="var(--primary)"
                                    strokeWidth="1.42857"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <span className="ms-2">Profile </span>
                              </li> */}

                              {/* <li className="dropdown-item ai-icon ">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                                    stroke="var(--primary)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14.3888 20.8572C13.0247 22.372 10.8967 22.3899 9.51947 20.8572"
                                    stroke="var(--primary)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <span className="ms-2">Notification </span>
                              </li> */}
                            </ul>
                          </div>
                          <div className="card-footer px-0 py-2">
                            <ul>
                              <li
                                style={{ cursor: "pointer" }}
                                className="dropdown-item ai-icon "
                                onClick={() => {
                                  navigate(
                                    `/staff/add-staff?id=${sessionStorage.getItem(
                                      "userId"
                                    )}`
                                  );
                                }}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M20.8066 7.62355L20.1842 6.54346C19.6576 5.62954 18.4907 5.31426 17.5755 5.83866V5.83866C17.1399 6.09528 16.6201 6.16809 16.1307 6.04103C15.6413 5.91396 15.2226 5.59746 14.9668 5.16131C14.8023 4.88409 14.7139 4.56833 14.7105 4.24598V4.24598C14.7254 3.72916 14.5304 3.22834 14.17 2.85761C13.8096 2.48688 13.3145 2.2778 12.7975 2.27802H11.5435C11.0369 2.27801 10.5513 2.47985 10.194 2.83888C9.83666 3.19791 9.63714 3.68453 9.63958 4.19106V4.19106C9.62457 5.23686 8.77245 6.07675 7.72654 6.07664C7.40418 6.07329 7.08843 5.98488 6.8112 5.82035V5.82035C5.89603 5.29595 4.72908 5.61123 4.20251 6.52516L3.53432 7.62355C3.00838 8.53633 3.31937 9.70255 4.22997 10.2322V10.2322C4.82187 10.574 5.1865 11.2055 5.1865 11.889C5.1865 12.5725 4.82187 13.204 4.22997 13.5457V13.5457C3.32053 14.0719 3.0092 15.2353 3.53432 16.1453V16.1453L4.16589 17.2345C4.41262 17.6797 4.82657 18.0082 5.31616 18.1474C5.80575 18.2865 6.33061 18.2248 6.77459 17.976V17.976C7.21105 17.7213 7.73116 17.6515 8.21931 17.7821C8.70746 17.9128 9.12321 18.233 9.37413 18.6716C9.53867 18.9488 9.62708 19.2646 9.63043 19.5869V19.5869C9.63043 20.6435 10.4869 21.5 11.5435 21.5H12.7975C13.8505 21.5 14.7055 20.6491 14.7105 19.5961V19.5961C14.7081 19.088 14.9088 18.6 15.2681 18.2407C15.6274 17.8814 16.1154 17.6806 16.6236 17.6831C16.9451 17.6917 17.2596 17.7797 17.5389 17.9393V17.9393C18.4517 18.4653 19.6179 18.1543 20.1476 17.2437V17.2437L20.8066 16.1453C21.0617 15.7074 21.1317 15.1859 21.0012 14.6963C20.8706 14.2067 20.5502 13.7893 20.111 13.5366V13.5366C19.6717 13.2839 19.3514 12.8665 19.2208 12.3769C19.0902 11.8872 19.1602 11.3658 19.4153 10.9279C19.5812 10.6383 19.8213 10.3981 20.111 10.2322V10.2322C21.0161 9.70283 21.3264 8.54343 20.8066 7.63271V7.63271V7.62355Z"
                                    stroke="var(--primary)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <circle
                                    cx="12.175"
                                    cy="11.889"
                                    r="2.63616"
                                    stroke="var(--primary)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="ms-2">Settings </span>
                              </li>
                            </ul>
                            <NavLink to="/">
                              <ul>
                                <li className="dropdown-item ai-icon ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--primary)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                  </svg>
                                  <span className="ms-2">Logout </span>
                                </li>
                              </ul>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default HeaderExp;
