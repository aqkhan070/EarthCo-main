import React, { useContext } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import s from "../../CommonComponents/PdfStyles";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../../assets/images/logo/earthco_logo.png";
import formatDate from "../../../custom/FormatDate";
import formatAmount from "../../../custom/FormatAmount";

const WeeklyReportPdf = ({ weeklyPreviewData }) => {
  return (
    // <PDFViewer style={{ width: "100%", height: "800px" }}>
      <Document>
        <Page size="A4" orientation="portrait">
          <View style={[s.containerFluid]}>
            <View style={[s.row]}>
              <View style={[s.col4, { paddingRight: "80px" }]}></View>
              <View style={[s.col4, s.textCenter, { marginTop: "30px" }]}>
                <Text style={s.title}>Weekly Report</Text>
              </View>

              <View style={[s.col4, s.textEnd, { paddingLeft: "40px" }]}>
                {" "}
                <Image style={{ width: "80px" }} src={logo}></Image>
              </View>

              <View
                style={[
                  s.col4,

                  {
                    marginTop: " 10px",
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                  Customer Name
                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                  {weeklyPreviewData.name}
                </Text>
              </View>
              <View
                style={[
                  s.col4,
                  s.borderLight,
                  {
                    marginTop: " 10px",
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                  Contact Name
                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                 { weeklyPreviewData.ContactName}
                </Text>
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                  Contact Company
                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                 {weeklyPreviewData.ContactCompany}
                </Text>
              </View>
              <View
                style={[
                  s.col4,
                  s.borderLight,
                  {
                    marginTop: " 10px",
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                  By Regional Manager
                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                  {weeklyPreviewData.RegionalManagerName}
                </Text>
                
              </View>

              <View
                style={[
                  s.col4,

                  {
                    marginTop: " 10px",
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Report for Week of:
                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {formatDate(weeklyPreviewData.ReportForWeekOf, false)}
                </Text>
              </View>
              <View
                style={[
                  s.col4,
                  s.borderLight,
                  {
                    marginTop: " 10px",
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                This week rotation:

                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {weeklyPreviewData.Thisweekrotation}
                </Text>
                
              </View>
              <View
                style={[
                  s.col4,
                  s.borderLight,
                  {
                    marginTop: " 10px",
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Next weeks rotation:
                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {weeklyPreviewData.Nextweekrotation}
                </Text>
                
              </View>

              <View
                style={[
                  s.col12,
                  s.borderLight,
                  {
                    marginTop: 0,
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Service Requests:

                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                null    
                </Text>
              </View>

              <View
                style={[
                  s.col12,
                  s.borderLight,
                  {
                    marginTop: 0,
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Proposals:

                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {weeklyPreviewData.ProposalsNotes}
                </Text>
              </View>

              <View
                style={[
                  s.col12,
                  s.borderLight,
                  {
                    marginTop: 0,
                    border: "1px solid rgb(120, 154, 61)",
                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Notes:
                </Text>
                <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {weeklyPreviewData.Notes}
                </Text>
              </View>

              <View
                style={[
                  s.col12,

                  {
                    marginTop: 0,

                    paddingLeft: " 10px",
                  },
                ]}
              >
                <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                  Photos:
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    // {/* </PDFViewer> */}
  );
};

export default WeeklyReportPdf;
