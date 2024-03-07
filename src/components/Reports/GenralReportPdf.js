import React, { useContext } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import s from "../CommonComponents/PdfStyles";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../assets/images/logo/earthco_logo.png";
import formatDate from "../../custom/FormatDate";
import formatAmount from "../../custom/FormatAmount";

const GenralReportPdf = ({ SummaryReportData,reportData,  landscapeData, CustomerName }) => {
  return (
    <Document>
    <Page size="A4" orientation="landscape">
      <View style={[s.containerFluid]}>
        <View style={[s.row]}>
          <View style={[s.colXL4]}>
            <Text style={s.text}>Earthco Landscape</Text>

            <Text style={s.text}>1225 East Wakeham </Text>

            <Text style={s.text}>Santa Ana, Ca 92705</Text>

            <Text style={[s.text, { marginTop: "10px" }]}>
              Submitted to:
            </Text>
            <Text style={[s.text]}>{CustomerName}</Text>
            {/* <Text style={[s.text]}> {SummaryReportData[0]?.Address}</Text> */}
          </View>
          <View style={[s.colXL5, s.textCenter, { marginTop: "20px" }]}>
                <Text style={s.title}>Service Request Summary report</Text>
                {/* <Text style={s.heading}>Grandview Crest</Text> */}
              </View>

              <View style={[s.colXL3, { paddingLeft: "80px" }]}>
                <Image style={{ width: "100px", marginLeft : "10px" }} src={logo}></Image>
              </View>
              <View style={[s.colXL12, {marginTop : "30px" ,borderBottom : "2px solid #888888"}]}></View>

          <View
            style={[
              s.colXL2,
              s.borderLight,
              {
                marginTop: " 10px",

                paddingLeft: " 10px",
              },
            ]}
          >
            <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
              RECEIVED:
            </Text>
          </View>
          <View
            style={[
              s.colXL1,
              s.borderLight,
              {
                marginTop: " 10px",

                paddingLeft: " 10px",
              },
            ]}
          >
            <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
              W/O #:
            </Text>
          </View>
          <View
            style={[
              s.colXL3,
              s.borderLight,
              {
                marginTop: " 10px",

                paddingLeft: " 10px",
              },
            ]}
          >
            <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
              REQUESTED WORK:
            </Text>
          </View>
          <View
            style={[
              s.colXL3,
              s.borderLight,
              {
                marginTop: " 10px",

                paddingLeft: " 10px",
              },
            ]}
          >
            <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
              EARTHCO'S ACTION TAKEN
            </Text>
          </View>

          <View
            style={[
              s.colXL1,
              s.borderLight,
              {
                marginTop: " 10px",

                paddingLeft: " 10px",
              },
            ]}
          >
            <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
              STATUS:
            </Text>
          </View>
          <View
            style={[
              s.colXL2,
              s.borderLight,
              {
                marginTop: " 10px",

                paddingLeft: " 10px",
              },
            ]}
          >
            <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
              COMPLETED:
            </Text>
          </View>

          {SummaryReportData?.map((report, index) => {
                      return ( <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <View
                        style={[
                          s.colXL2,
                          s.borderLight,
                          {
                            paddingLeft: " 10px",
                          },
                        ]}
                      >
                        <Text style={[s.tblText, { marginBottom: 4, marginTop: 4 }]}>
                        {formatDate(report.CreatedDate, false)}
                        </Text>
                      </View>
                      <View
                        style={[
                          s.colXL1,
                          s.borderLight,
                          {
                            paddingLeft: " 10px",
                          },
                        ]}
                      >
                        <Text style={[s.tblText, { marginBottom: 4, marginTop: 4 }]}>
                        {report.ServiceRequestNumber}
                        </Text>
                      </View>
                      <View
                        style={[
                          s.colXL3,
                          s.borderLight,
                          {
                            paddingLeft: " 10px",
                          },
                        ]}
                      >
                        <Text style={[s.tblText]}> {report.WorkRequest}</Text>
                      </View>
                      <View
                        style={[
                          s.colXL3,
                          s.borderLight,
                          {
                            paddingLeft: " 10px",
                          },
                        ]}
                      >
                        <Text style={[s.tblText]}> {report.ActionTaken}</Text>
                      </View>
      
                      <View
                        style={[
                          s.colXL1,
                          s.borderLight,
                          {
                            paddingLeft: " 10px",
                          },
                        ]}
                      >
                        <Text style={[s.tblText]}>{report.Status}</Text>
                      </View>
                      <View
                        style={[
                          s.colXL2,
                          s.borderLight,
                          {
                            paddingLeft: " 10px",
                          },
                        ]}
                      >
                        <Text style={[s.tblText]}>{formatDate(report.CompletedDate, false)}</Text>
                      </View>
                    </View> )
                    })}

          
        </View>
      </View>
    </Page>

    <Page size="A4" orientation="landscape">
          <View style={[s.containerFluid]}>
            <View style={[s.row]}>
              <View style={[s.colXL4]}>
                <Text style={s.text}>Earthco Landscape</Text>

                <Text style={s.text}>1225 East Wakeham </Text>

                <Text style={s.text}>Santa Ana, Ca 92705</Text>

                <Text style={[s.text, { marginTop: "10px" }]}>
                  Submitted to:
                </Text>
                <Text style={[s.text]}>{CustomerName}</Text>
                {/* <Text style={[s.text]}> {reportData[0]?.Address}</Text> */}
              </View>
              <View style={[s.colXL4, s.textCenter, { marginTop: "20px" }]}>
                <Text style={s.title}>Proposal Summary Report</Text>
                {/* <Text style={s.heading}>Grandview Crest</Text> */}
              </View>

              <View style={[s.colXL4, { paddingLeft: "80px" }]}>
                <Image style={{ width: "100px", marginLeft : "80px" }} src={logo}></Image>
              </View>
              <View style={[s.colXL12, {marginTop : "30px" ,borderBottom : "2px solid #888888"}]}></View>

              <View
                style={[
                  s.colXL2,
                  s.borderLight,
                  {
                    marginTop: " 10px",

                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
                SUBMITTED	
                </Text>
              </View>
              
              <View
                style={[
                  s.colXL2,
                  s.borderLight,
                  {
                    marginTop: " 10px",

                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
                PROPOSAL #	                </Text>
              </View>
              <View
                style={[
                  s.colXL4,
                  s.borderLight,
                  {
                    marginTop: " 10px",

                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
                DESCRIPTION
                </Text>
              </View>

              <View
                style={[
                  s.colXL2,
                  s.borderLight,
                  {
                    marginTop: " 10px",

                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
                AMOUNT
                </Text>
              </View>
              <View
                style={[
                  s.colXL2,
                  s.borderLight,
                  {
                    marginTop: " 10px",

                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
                STATUS
                </Text>
              </View>

              {reportData?.map((report, index) => {
                          return ( <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                          <View
                            style={[
                              s.colXL2,
                              s.borderLight,
                              {
                                paddingLeft: " 10px",
                              },
                            ]}
                          >
                            <Text style={[s.tblText, { marginBottom: 4, marginTop: 4 }]}>
                            {formatDate(report.CreatedDate, false)}
                            </Text>
                          </View>
                          <View
                            style={[
                              s.colXL2,
                              s.borderLight,
                              {
                                paddingLeft: " 10px",
                              },
                            ]}
                          >
                            <Text style={[s.tblText, { marginBottom: 4, marginTop: 4 }]}>
                            {report.EstimateNumber}
                            </Text>
                          </View>
                          <View
                            style={[
                              s.colXL4,
                              s.borderLight,
                              {
                                paddingLeft: " 10px",
                              },
                            ]}
                          >
                            <Text style={[s.tblText]}> {report.EstimateNotes}</Text>
                          </View>
                          <View
                            style={[
                              s.colXL2,
                              s.borderLight,
                              {
                                paddingLeft: " 10px",
                              },
                            ]}
                          >
                            <Text style={[s.tblText]}> $
                                {report.TotalAmount.toFixed(2).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}</Text>
                          </View>
          
                          <View
                            style={[
                              s.colXL2,
                              s.borderLight,
                              {
                                paddingLeft: " 10px",
                              },
                            ]}
                          >
                            <Text style={[s.tblText]}>{report.Status}</Text>
                          </View>
                          
                        </View> )
                        })}

              
            </View>
          </View>
        </Page>

        <Page size="A4" orientation="portrait">
          <View style={[s.containerFluid]}>
            <View style={[s.row]}>
              <View style={[s.col4]}>
                <Text style={s.text}>Earthco Landscape</Text>

                <Text style={s.text}>1225 E Wakeham</Text>

                <Text style={[s.text, { marginTop: "10px" }]}>
                  Submitted to:
                </Text>
                <Text style={s.text}> {CustomerName}</Text>
                {/* <Text style={s.text}> {landscapeData?.Address}</Text> */}
                {/* <Text style={s.text}>Phone: {landscapeData?.Phone} </Text> */}
              </View>
              <View style={[s.col4, s.textCenter, { marginTop: "20px" }]}>
                <Text style={s.title}>LandScape Report</Text>
              </View>

              <View style={[s.col4, { paddingLeft: "20px" }]}>
              <Image style={[{ width: "100px", marginLeft : "60px" }]} src={logo}></Image>
              </View>

              <View style={[s.col8, s.textEnd, { marginTop: "10px" }]}></View>
              <View style={[s.col2, { marginTop: "10px" }]}>
                <Text style={s.text}>Date Created: </Text>
              </View>
              <View style={[s.col2, { marginTop: "10px" }]}>
                <Text style={s.text}>  {formatDate(landscapeData?.CreatedDate, false)}</Text>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    backgroundColor: "#CCCCCC",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading]}>Maintenance Report</Text>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: " 10px",
                    backgroundColor: "#CCCCCC",
                  },
                ]}
              >
                <Text
                  style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}
                ></Text>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Supervisor visited the job weekly:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.SupervisorVisitedthejobweekly
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>

                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Completed litter pickup of grounds areas:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.CompletedLitterpickupofgroundareas
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>

                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Completed sweeping or blowing of walkways:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.Completedsweepingorblowingofwalkways
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    High priority areas were visited weekly:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.HighpriorityareaswereVisitedweekly
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    V ditches were cleaned and inspected:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.VDitcheswerecleanedandinspected
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "10px" }]}>
                    Weep screens inspected and cleaned in rotation section:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {
                            landscapeData?.WeepscreeninspectedandcleanedinrotationsectionId
                          }
                  </Text>
                </View>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    backgroundColor: "#CCCCCC",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
                  Lawn Maintenance
                </Text>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: " 10px",
                    backgroundColor: "#CCCCCC",
                  },
                ]}
              >
                <Text
                  style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}
                ></Text>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Fertilization of turf occurred:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.Fertilizationoftrufoccoured}
                  </Text>
                </View>

                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Turf was mowed and edged weekly:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.Trufwasmovedandedgedweekly
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    backgroundColor: "#CCCCCC",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading]}>Shrub Maintenance</Text>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: " 10px",
                    backgroundColor: "#CCCCCC",
                  },
                ]}
              >
                <Text style={[s.tblHeading]}></Text>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Shrubs trimmed according to rotation schedule:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.Shrubstrimmedaccordingtorotationschedule
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>

                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Fertilization of shrubs occurred:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.FertilizationofShrubsoccoured}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    backgroundColor: "#CCCCCC",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading]}>
                  Ground Cover and Flowerbed Maint.
                </Text>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: " 10px",
                    backgroundColor: "#CCCCCC",
                  },
                ]}
              >
                <Text
                  style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}
                ></Text>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View
                  style={[
                    s.col6,

                    {
                      paddingLeft: " 10px",
                      borderBottom: "0.5px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    Watering of flowerbeds was completed and checked:
                  </Text>
                </View>
                <View
                  style={[
                    s.col6,
                    { paddingLeft: "10px", borderBottom: "0.5px solid #CCCCCC" },
                  ]}
                >
                  <Text style={s.tblText}>
                  {landscapeData?.WateringofflowerbedsCompletedandchecked
                            ? "Yes"
                            : "No"}
                  </Text>
                </View>

                <View
                  style={[
                    s.col6,
                    {
                      backgroundColor: "#CCCCCC",
                      paddingLeft: " 10px",
                    },
                  ]}
                >
                  <Text style={[s.tblHeading]}>Irrigation System</Text>
                </View>

                <View
                  style={[
                    s.col6,
                    {
                      paddingLeft: " 10px",
                      backgroundColor: "#CCCCCC",
                    },
                  ]}
                >
                  <Text style={[s.tblHeading]}></Text>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <View
                    style={[
                      s.col6,

                      {
                        paddingLeft: " 10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={[s.tblText, { marginRight: "30px" }]}>
                      Heads were adjusted for maximum coverage:
                    </Text>
                  </View>
                  <View
                    style={[
                      s.col6,
                      {
                        paddingLeft: "10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={s.tblText}>
                    {landscapeData?.Headswereadjustedformaximumcoverage
                            ? "Yes"
                            : "No"}
                    </Text>
                  </View>

                  <View
                    style={[
                      s.col6,

                      {
                        paddingLeft: " 10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={[s.tblText, { marginRight: "30px" }]}>
                      Repairs were made to maintain an effective system:
                    </Text>
                  </View>
                  <View
                    style={[
                      s.col6,
                      {
                        paddingLeft: "10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={s.tblText}>
                    {landscapeData?.Repairsweremadetomaintainaneffectivesystem
                            ? "Yes"
                            : "No"}
                    </Text>
                  </View>

                  <View
                    style={[
                      s.col6,

                      {
                        paddingLeft: " 10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={[s.tblText, { marginRight: "30px" }]}>
                      Controllers were inspected and adjusted:
                    </Text>
                  </View>
                  <View
                    style={[
                      s.col6,
                      {
                        paddingLeft: "10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={s.tblText}>
                    {landscapeData?.Controllerswereinspectedandadjusted
                            ? "Yes"
                            : "No"}
                    </Text>
                  </View>
                  <View
                    style={[
                      s.col6,

                      {
                        paddingLeft: " 10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={[s.tblText, { marginRight: "30px" }]}>
                      Main line was repaired:
                    </Text>
                  </View>
                  <View
                    style={[
                      s.col6,
                      {
                        paddingLeft: "10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={s.tblText}> {landscapeData?.Mainlinewasrepaired ? "Yes" : "No"}</Text>
                  </View>
                  <View
                    style={[
                      s.col6,

                      {
                        paddingLeft: " 10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={[s.tblText, { marginRight: "30px" }]}>
                      Valve(s) was repaired:
                    </Text>
                  </View>
                  <View
                    style={[
                      s.col6,
                      {
                        paddingLeft: "10px",
                        borderBottom: "0.5px solid #CCCCCC",
                      },
                    ]}
                  >
                    <Text style={s.tblText}>  {landscapeData?.Valvewasrepaired ? "Yes" : "No"}</Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    backgroundColor: "#CCCCCC",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading]}>Rotation</Text>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: " 10px",
                    backgroundColor: "#CCCCCC",
                  },
                ]}
              >
                <Text
                  style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}
                ></Text>
              </View>
              <View
                style={[
                  s.col6,

                  {
                    paddingLeft: " 10px",
                    borderBottom: "0.5px solid #CCCCCC",
                  },
                ]}
              >
                <Text style={[s.tblText, { marginRight: "30px" }]}>
                  This months expected rotation schedule:
                </Text>
              </View>
              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: "10px",
                    borderBottom: "0.5px solid #CCCCCC",
                  },
                ]}
              >
                <Text style={s.tblText}>
                {landscapeData?.Thismonthexpectedrotationschedule}
                </Text>
              </View>
              <View
                style={[
                  s.col6,
                  {
                    backgroundColor: "#CCCCCC",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading]}>Extra Information</Text>
              </View>

              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: " 10px",
                    backgroundColor: "#CCCCCC",
                  },
                ]}
              >
                <Text
                  style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}
                ></Text>
              </View>
              <View
                style={[
                  s.col6,

                  {
                    paddingLeft: " 10px",
                    borderBottom: "0.5px solid #CCCCCC",
                  },
                ]}
              >
                <Text style={[s.tblText, { marginRight: "30px" }]}>Notes:</Text>
              </View>
              <View
                style={[
                  s.col6,
                  {
                    paddingLeft: "10px",
                    borderBottom: "0.5px solid #CCCCCC",
                  },
                ]}
              >
                <Text style={s.tblText}>{landscapeData?.Notes}</Text>
              </View>

              <View style={[s.col12, s.textCenter, { marginTop: "10px" }]}>
                <Text style={s.small}>
                  *Note Beginning October 1, Earthco will commence annual skip
                  mowing of the grass due to the winter season
                </Text>
              </View>
            </View>
          </View>
        </Page>
  </Document>
  )
}

export default GenralReportPdf