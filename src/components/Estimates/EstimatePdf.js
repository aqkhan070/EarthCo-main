import React, { useContext } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import s from "../CommonComponents/PdfStyles";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../assets/images/logo/earthco_logo.png";
import formatDate from "../../custom/FormatDate";
import formatAmount from "../../custom/FormatAmount";

const EstimatePdf = ({ data }) => {
  return (
    // <PDFViewer style={{ width: "100%", height: "800px" }}>
    <Document>
      <Page size="A4" orientation="portrait">
        <View style={[s.containerFluid]}>
          <View style={[s.row]}>
            <View style={[s.col4]}>
              <Text style={s.text}>{data.SelectedCompany}</Text>

              <Text style={s.text}>1225 East Wakeham Avenue</Text>

              <Text style={s.text}>Santa Ana, California 92705</Text>
              <Text style={s.text}>O 714.571.0455 F 714.571.0580</Text>
              <Text style={s.text}>CL# C27 823185 / D49 1025053</Text>
            </View>
            <View style={[s.col4, s.textCenter, { marginTop: "20px" }]}>
              <Text style={s.title}>Proposal</Text>
            </View>

            <View style={[s.col4, s.textCenter]}>
              <Image style={{ width: "130px" }} src={logo}></Image>
            </View>
            <View style={[s.col8, { marginTop: "10px" }]}>
              <Text style={s.heading}>Submitted to</Text>
              <Text style={s.text}>
                {data.ContactName}, {data.ContactCompanyName}
              </Text>
            </View>
            <View style={[s.col2, { marginTop: "10px" }]}>
              <Text style={[s.text, { fontWeight: "bold" }]}>Date</Text>
              <Text style={[s.text, { fontWeight: "bold" }]}>Estimate #</Text>
              <Text style={[s.text, { fontWeight: "bold" }]}>Submitted by</Text>
            </View>
            <View style={[s.col2, s.textEnd, { marginTop: "10px" }]}>
              <Text style={s.text}>{formatDate(data.IssueDate)}</Text>
              <Text style={s.text}>{data.EstimateNumber}</Text>
              <Text style={s.text}>{data.RegionalManagerName}</Text>
            </View>

            <View
              style={[
                s.col12,
                s.textCenter,
                { marginTop: "20px", borderBottom: "2px solid #888888" },
              ]}
            >
              <Text style={s.heading}>{data.CustomerName}</Text>
            </View>

            <View style={[s.col12, { marginTop: "20px" }]}>
              <Text style={s.heading}>Description of work</Text>
              <Text style={s.text}>{data.EstimateNotes}</Text>
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
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>
                QTY
              </Text>
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
                  <Text style={[s.tblText, { marginRight: "30px" }]}>
                    {item.Qty}
                  </Text>
                </View>
                <View
                  style={[
                    s.col8,
                    { paddingLeft: "10px", borderBottom: "1px solid #CCCCCC" },
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

                {index === 24 && (
                  <View style={[s.col12, { height: "60em" }]}></View>
                )}
              </View>
            ))}
            <View style={[s.col9]}></View>
            <View
              style={[
                s.col1,
                { borderBottom: "1px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>Total:</Text>
            </View>
            <View
              style={[
                s.col2,
                s.textEnd,
                { borderBottom: "1px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>${formatAmount(data.Amount)}</Text>
            </View>

            <View
              style={[
                s.col3,
                { borderTop: "1px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>ACCEPTED BY:</Text>
            </View>
            <View
              style={[
                s.col3,
                { borderTop: "1px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>Buyer/Agent Signature</Text>
            </View>
            <View
              style={[
                s.col2,
                { borderTop: "1px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>Print Name</Text>
            </View>
            <View
              style={[
                s.col2,
                { borderTop: "1px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>Title</Text>
            </View>
            <View
              style={[
                s.col2,
                { borderTop: "1px solid #CCCCCC", marginTop: "30px" },
              ]}
            >
              <Text style={s.text}>Date</Text>
            </View>
            <View style={[s.col12, { marginTop: "20px" }]}>
              <Text style={s.small}>
                Payment Terms and Conditions: Please be advised that payments
                are due upon receipt of the invoice, with any payment made
                beyond thirty ﴾30﴿ days from the billing date considered overdue
                and subject to interest at the maximum legally permissible rate.
                In the event of legal action for collection, Earthco is entitled
                to reimbursement of all legal fees. Failure to make payment
                within a thirty ﴾30﴿‐day period will be deemed a major breach.
                This proposal assumes no preexisting conditions detrimental to
                labor and materials during installation, replacement, and
                repair, specifically for work conducted by Earthco Commercial
                Landscape or Earthco Arbor Care, with a 30‐day lead time for
                tree work. Earthco Arbor Care disclaims responsibility for
                damage to underground utilities, and work will adhere to ANSI
                A300 Arbor Standards. Requests for crown thinning exceeding 25%
                may incur additional costs and release Earthco Arbor Care from
                liability. The proposal excludes permits, traffic control, or
                engineering, with the client responsible for associated costs.
                Cancellation of work incurs a 20% fee, and tree work inspections
                must be conducted within 30 days of completion; otherwise, the
                work is deemed final. The client acknowledges the potential
                placement of a mechanics lien on the property as per the
                California Civil Code for non‐payment within the specified
                terms. The signing party affirms authorization to obligate the
                client to these terms.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default EstimatePdf;
