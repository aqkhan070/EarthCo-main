import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF'; // assuming you have defined InvoicePDF component

const YourComponent = () => {
  const [pdfData, setPdfData] = useState(null);

  const handleDownload = ({ blob }) => {
    // Store the PDF blob data in the state
    setPdfData(blob);
  };

  return (
    <div>
      <PDFDownloadLink
        document={
          <InvoicePDF
            data={{
              ...formData,
              SelectedCompany: loggedInUser.CompanyName,
              CustomerName: name,
              ApprovedItems: formData.tblInvoiceItems,
              Amount: totalItemAmount,
            }}
          />
        }
        fileName="invoice.pdf"
      >
        {({ loading, error }) =>
          loading ? (
            "Loading..."
          ) : (
            <button onClick={() => console.log("Error", error)}>Download PDF</button>
          )
        }
      </PDFDownloadLink>

      {/* Conditionally render a link to download the stored PDF data */}
      {pdfData && (
        <a
          href={URL.createObjectURL(pdfData)}
          download="stored_invoice.pdf"
        >
          Download Stored PDF
        </a>
      )}
    </div>
  );
};

export default YourComponent;
