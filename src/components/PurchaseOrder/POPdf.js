import React, { useContext } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import s from "../CommonComponents/PdfStyles";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../assets/images/logo/earthco_logo.png";
import formatDate from "../../custom/FormatDate";
import formatAmount from "../../custom/FormatAmount";

const POPdf = ({data}) => {
  return (
    //  <PDFViewer style={{ width: "100%", height: "800px" }}>
    <Document>
      <Page size="A4" orientation="portrait">
        <View style={[s.containerFluid]}>
          <View style={[s.row]}>
            <View style={[s.col4]}>
             
            </View>
            <View style={[s.col4, s.textCenter, { marginTop: "20px" }]}>
              <Text style={s.title}>Purchase Order</Text>
            </View>

            <View style={[s.col4, s.textCenter]}>
              <Image style={{ width: "130px" }} src={logo}></Image>
            </View>
            <View style={[s.col8, { marginTop: "10px" }]}>
         
              <Text style={s.text}>{data.Data?.SupplierName}</Text>
              <Text style={s.text}>
              {data.Data?.SupplierAddress}
              </Text>
              
              <Text style={[s.text, {marginTop : "10px  "}]}>{data.Data?.CustomerName}</Text>
          
            </View>
            <View style={[s.col2, { marginTop: "10px" }]}>
            <Text style={[s.text, {marginTop : "10px"}]}>Date</Text>
            <Text style={[s.text]}>Purchase Order#</Text>
            </View>
            <View style={[s.col2, { marginTop: "10px" }]}>
            <Text style={[s.text,s.textEnd, {marginTop : "10px  "}]}>  {formatDate(
                                  data.Data?.CreatedDate,
                                  false
                                )}</Text>
            <Text style={[s.text, s.textEnd,]}>{data.Data?.PurchaseOrderNumber}</Text>
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
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>Item Code</Text>
            </View>

            <View
              style={[
                s.col6,
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
                s.col1,
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
                s.col1,
                {
                  marginTop: " 10px",
                  backgroundColor: "#CCCCCC",
                  paddingLeft: " 10px",
                },
              ]}
            >
              <Text style={[s.tblHeading, { marginBottom: 4, marginTop: 4 }]}>RATE</Text>
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

            {data.ItemData?.map((item, index) => (
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View
                  style={[
                    s.col2,
                 
                    {
                      paddingLeft: " 10px",
                      borderBottom: "1px solid #CCCCCC",
                    },
                  ]}
                >
                  <Text style={s.tblText}>{item.ItemId}</Text>
                </View>
                <View
                  style={[
                    s.col6,
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
                    s.col1,
                    s.textEnd,
                    { borderBottom: "1px solid #CCCCCC" },
                  ]}
                >
                  <Text style={[s.tblText]}>{item.Qty}</Text>
                </View>

                <View
                  style={[
                    s.col1,
                    s.textEnd,
                    { borderBottom: "1px solid #CCCCCC" },
                  ]}
                >
                  <Text style={[s.tblText]}>${item.Rate}</Text>
                </View>

                <View
                  style={[
                    s.col2,
                    s.textEnd,
                    { borderBottom: "1px solid #CCCCCC" },
                  ]}
                >
                  <Text style={[s.tblText]}> ${formatAmount(item.Qty * item.Rate)}</Text>
                </View>
                

             {index === 26 && (
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
              <Text style={s.text}>${formatAmount(data.Total)}</Text>
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
              <Text style={s.text}>${formatAmount(data.Total)}</Text>
            </View>
            
          </View>
        </View>
      </Page>
    </Document>
    //  </PDFViewer>
  )
}

export default POPdf