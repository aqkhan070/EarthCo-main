import React, { useContext } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import s from "../CommonComponents/PdfStyles";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../assets/images/logo/earthco_logo.png";
import formatDate from "../../custom/FormatDate";

const PunchListPdf = ({ pLData, pLDetailData }) => {
  return (
    // <PDFViewer style={{ width: "100%", height: "800px" }}>
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={[s.containerFluid]}>
          <View style={[s.row]}>
            <View style={[s.colXL4, { paddingRight: "80px" }]}>
              <Image style={{ width: "100px" }} src={logo}></Image>
            </View>
            <View style={[s.colXL4, s.textCenter, { marginTop: "30px" }]}>
              <Text style={s.title}>PunchList</Text>
            </View>

            <View
              style={[s.colXL4, s.textEnd, { paddingLeft: "100px" }]}
            ></View>

            <View
              style={[
                s.colXL4,

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
                {pLData.CustomerName}
              </Text>
              <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Title
              </Text>
              <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {pLData.Title}
              </Text>
            </View>
            <View
              style={[
                s.colXL4,
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
                {pLData.ContactName}
              </Text>
              <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Contact Company
              </Text>
              <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {pLData.ContactCompany}
              </Text>
            </View>
            <View
              style={[
                s.colXL4,
                s.borderLight,
                {
                  marginTop: " 10px",
                  border: "1px solid rgb(120, 154, 61)",
                  paddingLeft: " 10px",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                By Account Manager:
              </Text>
              <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {pLData.AssignToName}
              </Text>
              <Text style={[s.tblHeading, { marginBottom: 0, marginTop: 4 }]}>
                Created
              </Text>
              <Text style={[s.tblText, { marginBottom: 4, marginTop: 0 }]}>
                {formatDate(pLData.CreatedDate, false)}
              </Text>
            </View>

            <View
              style={[
                s.colXL1,

                {
                  marginTop: " 10px",
                  border: "1px solid rgb(120, 154, 61)",
                  paddingLeft: " 10px",
                  backgroundColor: "#789A3D",
                },
              ]}
            >
              <Text
                style={[
                  s.tblHeading,
                  { marginBottom: 8, marginTop: 8, color: "white" },
                ]}
              >
                #
              </Text>
            </View>
            <View
              style={[
                s.colXL3,

                {
                  marginTop: " 10px",
                  border: "1px solid rgb(120, 154, 61)",
                  paddingLeft: " 10px",
                  backgroundColor: "#789A3D",
                },
              ]}
            >
              <Text
                style={[
                  s.tblHeading,
                  { marginBottom: 8, marginTop: 8, color: "white" },
                ]}
              >
                Photo
              </Text>
            </View>
            <View
              style={[
                s.colXL3,

                {
                  marginTop: " 10px",
                  border: "1px solid rgb(120, 154, 61)",
                  paddingLeft: " 10px",
                  backgroundColor: "#789A3D",
                },
              ]}
            >
              <Text
                style={[
                  s.tblHeading,
                  { marginBottom: 8, marginTop: 8, color: "white" },
                ]}
              >
                Address
              </Text>
            </View>
            <View
              style={[
                s.colXL3,

                {
                  marginTop: " 10px",
                  border: "1px solid rgb(120, 154, 61)",
                  paddingLeft: " 10px",
                  backgroundColor: "#789A3D",
                },
              ]}
            >
              <Text
                style={[
                  s.tblHeading,
                  { marginBottom: 8, marginTop: 8, color: "white" },
                ]}
              >
                Notes
              </Text>
            </View>
            <View
              style={[
                s.colXL2,

                {
                  marginTop: " 10px",
                  border: "1px solid rgb(120, 154, 61)",
                  paddingLeft: " 10px",
                  backgroundColor: "#789A3D",
                },
              ]}
            >
              <Text
                style={[
                  s.tblHeading,
                  { marginBottom: 8, marginTop: 8, color: "white" },
                ]}
              >
                Completed
              </Text>
            </View>
            {pLDetailData.map((item, index) => (
              <>
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
                    {item.DetailData.PunchlistDetailId}
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
                  <Text style={[s.tblText, { marginBottom: 4, marginTop: 4 }]}>
                  
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
                  <Text style={[s.tblText, { marginBottom: 4, marginTop: 4 }]}>
                    {item.DetailData.Address}
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
                  <Text style={[s.tblText, { marginBottom: 4, marginTop: 4 }]}>
                    {item.DetailData.Notes}
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
                    {item.DetailData.PunchlichlistDetailStatus}
                  </Text>
                </View>
              </>
            ))}
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default PunchListPdf;
