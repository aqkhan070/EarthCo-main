import React, { useContext } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import s from "../CommonComponents/PdfStyles";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../assets/images/logo/earthco_logo.png";
import formatDate from "../../custom/FormatDate";
import formatAmount from "../../custom/FormatAmount";

const InvoicePDF = ({ data }) => {
  return (
    // <PDFViewer style={{ width: "100%", height: "800px" }}>
    <Document>
      <Page size="A4" orientation="portrait">
        <View style={[s.containerFluid]}>
          <View style={[s.row]}>
            <View style={[s.col4]}>
              <Text style={s.text}>{data.SelectedCompany}</Text>

              <Text style={s.text}>1225 E. Wakeham Avenue</Text>

              <Text style={s.text}>Santa Ana CA 92705 US</Text>
              <Text style={s.text}>lolas@earthcompany.org</Text>
              <Text style={s.text}>www.earthcompany.org</Text>
            </View>
            <View style={[s.col4, s.textCenter, { marginTop: "20px" }]}>
              <Text style={s.title}>Invoice</Text>
            </View>

            <View style={[s.col4, s.textCenter]}>
              <Image style={{ width: "130px" }} src={logo}></Image>
            </View>
            <View style={[s.col8, { marginTop: "10px" }]}>
              <Text style={s.heading}>Bill to</Text>
              <Text style={s.text}>{data.CustomerName}</Text>
              <Text style={s.text}>
                {data.CustomerAddress?.split(", ").slice(0, 2).join(", ")}
              </Text>
              <Text style={s.text}>
                {data.CustomerAddress?.split(", ").slice(2).join(", ")}
              </Text>
              <Text style={s.text}>{data.ContactCompanyName}</Text>
              <Text style={s.text}>{data.ContactName}</Text>
              <Text style={s.text}>{data.ContactAddress}</Text>
            </View>
            <View style={[s.col4, { marginTop: "10px" }]}></View>

            <View
              style={[
                s.col2,
                {
                  marginTop: " 10px",
                  backgroundColor: "#CCCCCC",
                  paddingLeft: " 10px",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>INVOICE #</Text>
            </View>

            <View
              style={[
                s.col2,
                {
                  marginTop: " 10px",
                  backgroundColor: "#CCCCCC",
                  paddingLeft: " 10px",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>DATE</Text>
            </View>

            <View
              style={[
                s.col2,
                {
                  marginTop: " 10px",
                  backgroundColor: "#CCCCCC",
                  paddingLeft: " ",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>TOTAL DUE</Text>
            </View>
            <View
              style={[
                s.col2,
                {
                  marginTop: " 10px",
                  backgroundColor: "#CCCCCC",
                  paddingLeft: " 10px",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>DUE DATE</Text>
            </View>
            <View
              style={[
                s.col2,
                {
                  marginTop: " 10px",
                  backgroundColor: "#CCCCCC",
                  paddingLeft: " 10px",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>TERMS </Text>
            </View>

            <View
              style={[
                s.col2,
                s.textEnd,
                { marginTop: " 10px", backgroundColor: "#CCCCCC" },
              ]}
            >
              <Text style={[s.tblHeading]}>ENCLOSED</Text>
            </View>

            <View
              style={[
                s.col2,

                {
                  paddingLeft: " 10px",
                  borderBottom: "1px solid #CCCCCC",
                },
              ]}
            >
              <Text style={s.tblText}>{data.InvoiceNumber}</Text>
            </View>
            <View
              style={[
                s.col2,

                {
                  paddingLeft: " 10px",
                  borderBottom: "1px solid #CCCCCC",
                },
              ]}
            >
              <Text style={s.tblText}>{formatDate(data.CreatedDate, false)}</Text>
            </View>
            <View
              style={[
                s.col2,

                {
                  paddingLeft: " 10px",
                  borderBottom: "1px solid #CCCCCC",
                },
              ]}
            >
              <Text style={s.tblText}></Text>
            </View>
            <View
              style={[
                s.col2,

                {
                  paddingLeft: " 10px",
                  borderBottom: "1px solid #CCCCCC",
                },
              ]}
            >
              <Text style={s.tblText}> {formatDate(data.DueDate, false)}</Text>
            </View>
            <View
              style={[
                s.col2,

                {
                  paddingLeft: " 10px",
                  borderBottom: "1px solid #CCCCCC",
                },
              ]}
            >
              <Text style={s.tblText}>{data.Term}</Text>
            </View>
            <View
              style={[
                s.col2,

                {
                  paddingLeft: " 10px",
                  borderBottom: "1px solid #CCCCCC",
                },
              ]}
            >
              <Text style={s.text}>
                
                {data.StatusId === 0 ? "Closed" : "Open"}
              </Text>
            </View>

            <View style={[s.col12, { marginTop: "20px" }]}>
              <Text style={s.heading}>Description of work</Text>
              <Text style={s.text}> {data.CustomerMessage}</Text>
            </View>

            <View style={[s.col12, { marginTop: "20px" }]}>
              <Text style={s.heading}>item(s)</Text>
            </View>

            <View
              style={[
                s.col2,
                {
                  marginTop: " 10px",
                  backgroundColor: "#CCCCCC",
                  paddingLeft: " 10px",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>QTY</Text>
            </View>

            <View
              style={[
                s.col8,
                {
                  marginTop: " 10px",
                  paddingLeft: " 10px",
                  backgroundColor: "#CCCCCC",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>DESCRIPTION</Text>
            </View>

            <View
              style={[
                s.col2,
                s.textEnd,
                { marginTop: " 10px", backgroundColor: "#CCCCCC" },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>AMOUNT</Text>
            </View>

            {data.ApprovedItems.map((item, index) => (
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View
                  style={[
                    s.col2,
                    s.textEnd,
                    {
                      paddingLeft: " 10px",
                      borderBottom: "1px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={s.tblText}>{item.Qty}</Text>
                </View>
                <View
                  style={[
                    s.col8,
                    {
                      paddingLeft: "10px",
                      borderBottom: "1px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={s.tblText}>{item.Description}</Text>
                </View>
                <View
                  style={[
                    s.col2,
                    s.textEnd,
                    { borderBottom: "1px solid #CCCCCC" },
                  ]}
                >
                  <Text style={[s.tblText]}>${formatAmount(item.Amount)}</Text>
                </View>

                {index === 28 && (
                  <View style={[s.col12, { height: "80em" }]}></View>
                )}
              </View>
            ))}
            <View
              style={[
                s.col8,
                { borderBottom: "3px solid #CCCCCC", marginTop: "30px" },
              ]}
            ></View>
            <View
              style={[
                s.col2,
                { borderBottom: "3px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>Subtotal:</Text>
            </View>
            <View
              style={[
                s.col2,
                s.textEnd,
                { borderBottom: "3px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>${formatAmount(data.Amount)}</Text>
            </View>

            <View
              style={[
                s.col8,
                { borderBottom: "3px solid #012A47", marginTop: "10px" },
              ]}
            ></View>
            <View
              style={[
                s.col2,
                { borderBottom: "3px solid #012A47", marginTop: "10px" },
              ]}
            >
              <Text style={s.text}>Total USD:</Text>
            </View>
            <View
              style={[
                s.col2,
                s.textEnd,
                { borderBottom: "3px solid #012A47", marginTop: "10px" },
              ]}
            >
              <Text style={s.text}>${formatAmount(data.Amount)}</Text>
            </View>
            <View style={[s.col12, s.textCenter, {marginTop : "20px"}]}>
              <Text style={s.small}>
                For invoice questions please contact Yisel Ferreyra at
                Yiself@earthcompany.org
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default InvoicePDF;
