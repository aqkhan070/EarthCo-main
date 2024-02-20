import React, { useContext } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import s from "../CommonComponents/PdfStyles";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../assets/images/logo/earthco_logo.png";
import formatDate from "../../custom/FormatDate";
import formatAmount from "../../custom/FormatAmount";

const SummaryReportPdf = ({ reportData, CustomerName }) => {
  return (
    // <PDFViewer style={{ width: "100%", height: "800px" }}>
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={[s.containerFluid]}>
            <View style={[s.row]}>
              <View style={[s.colXL4]}>
                <Text style={s.text}>EarthCo</Text>

                <Text style={s.text}>1225 East Wakeham </Text>

                <Text style={s.text}>Santa Ana, Ca 92705</Text>

                <Text style={[s.text, { marginTop: "10px" }]}>
                  Submitted to
                </Text>
                <Text style={[s.text]}>{CustomerName}</Text>
                <Text style={[s.text]}> {reportData[0].Address}</Text>
              </View>
              <View style={[s.colXL4, s.textCenter, { marginTop: "20px" }]}>
                <Text style={s.title}>Service Request Summary report</Text>
                <Text style={s.heading}>Grandview Crest</Text>
              </View>

              <View style={[s.colXL4, { paddingLeft: "80px" }]}>
                <Image style={{ width: "100px" }} src={logo}></Image>
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

              {reportData.map((report, index) => {
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
      </Document>
    // </PDFViewer>
  );
};

export default SummaryReportPdf;
