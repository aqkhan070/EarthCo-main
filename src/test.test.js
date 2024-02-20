import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import YourDocument from './EstimatePdf'; // Import your document component

const YourComponent = () => {
  const [pdfBlob, setPdfBlob] = useState(null);

  // Your form data and other states
  const formData = {
    // your form data here
  };
  const staffName = ''; // your staff name here
  const loggedInUser = { CompanyName: '' }; // your logged in user details here
  const name = ''; // customer name

  const generatePdfDocument = async () => {
    const doc = (
      <YourDocument
        data={{
          ...formData,
          RegionalManagerName: staffName,
          SelectedCompany: loggedInUser.CompanyName,
          CustomerName: name,
          ApprovedItems: formData.tblEstimateItems.filter((item) => item.IsApproved === true),
          Amount: formData.tblEstimateItems.filter((item) => item.IsApproved === true).reduce(
            (accumulator, item) => accumulator + item.Amount,
            0
          ),
        }}
      />
    );

    const blob = await pdf(doc).toBlob();
    setPdfBlob(blob);
    // You can now use pdfBlob for your needs, like saving to state, or uploading to a server
  };

  return (
    <div>
      <button onClick={generatePdfDocument}>Generate PDF</button>
      {/* Render the download link only if pdfBlob is available */}
      {pdfBlob && (
        <a href={URL.createObjectURL(pdfBlob)} download="Estimate.pdf">
          Download PDF
        </a>
      )}
    </div>
  );
};

export default YourComponent;
