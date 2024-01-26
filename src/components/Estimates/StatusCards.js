import React from "react";
import formatAmount from "../../custom/FormatAmount";
import SingleCard from "./SingleCard";
const StatusCards = ({ setStatusId, estmRecords, statusId }) => {
  return (
    <>
    

      <SingleCard
        setStatusId={setStatusId}
        statusId={statusId}
        status={4}
        title={"Pending"}
        color={"primary"}
        number={estmRecords.totalNewRecords}
        amount={estmRecords.totalNewRecordsSum}
      />
      <SingleCard
        setStatusId={setStatusId}
        statusId={statusId}
        status={6}
        title={"Needs PO"}
        color={"info"}
        number={estmRecords.totalNeedsPOCount}
        amount={estmRecords.totalNeedsPOSum}
      />

      <SingleCard
        setStatusId={setStatusId}
        statusId={statusId}
        status={1}
        title={"Open Approved"}
        color={"warning"}
        number={estmRecords.totalApprovedRecords}
        amount={estmRecords.totalApprovedRecordsSum}
      />
      <SingleCard
        setStatusId={setStatusId}
        statusId={statusId}
        status={7}
        title={"Ready To Invoice"}
        color={"success"}
        number={estmRecords.totalReadytoInvoiceCount}
        amount={estmRecords.totalReadytoInvoiceSum}
      />
      <SingleCard
        setStatusId={setStatusId}
        statusId={statusId}
        status={2}
        title={"Closed Billed"}
        color={"danger"}
        number={estmRecords.totalClosedRecords}
        amount={estmRecords.totalClosedRecordsSum}
      />

   
    </>
  );
};

export default StatusCards;
