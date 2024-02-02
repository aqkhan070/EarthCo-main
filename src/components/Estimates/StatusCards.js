import React from "react";
import formatAmount from "../../custom/FormatAmount";
import SingleCard from "./SingleCard";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import WorkHistoryIcon from '@mui/icons-material/WorkHistoryOutlined';
import CheckBoxIcon from '@mui/icons-material/BeenhereOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FactCheckIcon from '@mui/icons-material/FactCheckOutlined';
const StatusCards = ({ setStatusId, estmRecords, statusId }) => {
  return (
    <>
    

      <SingleCard
      icon={PendingActionsIcon}
        setStatusId={setStatusId}
        statusId={statusId}
        status={4}
        title={"Pending"}
        color={"warning"}
        number={estmRecords.totalNewRecords}
        amount={estmRecords.totalNewRecordsSum}
      />
      <SingleCard
      icon={WorkHistoryIcon}
        setStatusId={setStatusId}
        statusId={statusId}
        status={6}
        title={"Needs PO"}
        color={"info"}
        number={estmRecords.totalNeedsPOCount}
        amount={estmRecords.totalNeedsPOSum}
      />

      <SingleCard
      icon={CheckBoxIcon}
        setStatusId={setStatusId}
        statusId={statusId}
        status={1}
        title={"Open Approved"}
        color={"success"}
        // iconColor={"#fff"}
        number={estmRecords.totalApprovedRecords}
        amount={estmRecords.totalApprovedRecordsSum}
      />
      <SingleCard
      icon={PlaylistAddCheckIcon}
        setStatusId={setStatusId}
        statusId={statusId}
        status={7}
        title={"Ready To Invoice"}
        color={"success"}
        number={estmRecords.totalReadytoInvoiceCount}
        amount={estmRecords.totalReadytoInvoiceSum}
      />
      <SingleCard
      icon={FactCheckIcon}
        setStatusId={setStatusId}
        statusId={statusId}
        status={2}
        title={"Closed Billed"}
        color={"success"}
        number={estmRecords.totalClosedRecords}
        amount={estmRecords.totalClosedRecordsSum}
      />

   
    </>
  );
};

export default StatusCards;
