import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import HeaderExp from "../components/Header/HeaderExp";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer";
import CustomerIndex from "../components/Customers/CustomerIndex";
import EstimateIndex from "../components/Estimates/EstimateIndex";
import ServiceIndex from "../components/ServiceRequest/ServiceIndex";
import IrrigationIndex from "../components/Irrigation/IrrigationIndex";
import CustomersTable from "../components/Customers/CustomersTable";
import AddCutomer from "../components/Customers/AddCutomer";
import UpdateCustomer from "../components/Customers/UpdateCustomer";
import Irrigationlist from "../components/Irrigation/Irrigationlist";
import IrrigationForm from "../components/Irrigation/IrrigationForm";
import Audit from "../components/Reports/Audit";
import PunchListIndex from "../components/PunchLists/PunchListIndex";
import PunchlistPreview from "../components/PunchLists/PunchlistPreview";
import SummaryReport from "../components/Reports/SummaryReport";
import ProposalSummary from "../components/Reports/ProposalSummary";
import WeeklyReportIndex from "../components/Reports/WeeklyReport/WeeklyReportIndex";
import WeeklyReportlist from "../components/Reports/WeeklyReport/WeeklyReportlist";
import WeeklyReport from "../components/Reports/WeeklyReport/WeeklyReport";
import AddWRform from "../components/Reports/WeeklyReport/AddWRform";
import LandscapeIndex from "../components/Landscape/LandscapeIndex";
import Landscapelist from "../components/Landscape/Landscapelist";
import LandscapeForm from "../components/Landscape/LandscapeForm";
import Landscape from "../components/Landscape/Landscape";
import ServiceRequest from "../components/ServiceRequest/ServiceRequest";
import { RoutingContext } from "../context/RoutesContext";
import SRlist from "../components/ServiceRequest/SRlist";
import EstimateList from "../components/Estimates/EstimateList";
import EstimateIDopen from "../components/Estimates/EstimateIDopen";
import AddEstimate from "../components/Estimates/AddEstimate";

import MapIndex from "../components/Map/MapIndex";
import AddSRform from "../components/ServiceRequest/AddSRform";

import StaffIndex from "../components/Staff/StaffIndex";
import StaffList from "../components/Staff/StaffList";
import AddStaff from "../components/Staff/AddStaff";
import CustomerData from "../context/CustomerData";
import PurchaseOrder from "../components/PurchaseOrder/PurchaseOrder";
import { AddPO } from "../components/PurchaseOrder/AddPO";
import PurchaseOrderIndex from "../components/PurchaseOrder/PurchaseOrderIndex";

import Bills from "../components/Bill/Bills";
import Invoices from "../components/Invoice/Invoices";
import InvoiceIndex from "../components/Invoice/InvoiceIndex";
import AddInvioces from "../components/Invoice/AddInvioces";
import Items from "../components/Items/Items";
import Cookies from "js-cookie";
import EstimatePreview from "../components/Estimates/EstimatePreview";
import SRPreview from "../components/ServiceRequest/SRPreview";
import POPreview from "../components/PurchaseOrder/POPreview";
import InvoicePreview from "../components/Invoice/InvoicePreview";
import BillPreview from "../components/Bill/BillPreview";
import BillIndex from "../components/Bill/BillIndex";
import AddBill from "../components/Bill/AddBill";
import UpdateEstimateForm from "../components/Estimates/UpdateEstimateForm";
const DashboardPage = () => {
  const { SRroute, estimateRoute } = useContext(RoutingContext);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const isEstimatePreviewRoute =
    window.location.pathname.includes("Estimate-Preview");
  const isSRPreviewRoute = window.location.pathname.includes(
    "Service-Request-Preview"
  );
  const isBillPreviewRoute = window.location.pathname.includes("Bill-Preview");
  const isInvoicePreviewRoute =
    window.location.pathname.includes("Invoice-Preview");
  const isPOPreviewRoute = window.location.pathname.includes(
    "Purchase-Order-Preview"
  );

  return (
    <>
      {token ? (
        <>
          {!isEstimatePreviewRoute &&
            !isSRPreviewRoute &&
            !isBillPreviewRoute &&
            !isInvoicePreviewRoute &&
            !isPOPreviewRoute && <HeaderExp />}
          {!isEstimatePreviewRoute &&
            !isSRPreviewRoute &&
            !isBillPreviewRoute &&
            !isInvoicePreviewRoute &&
            !isPOPreviewRoute && <SideBar />}

          <div
            className={
              !isEstimatePreviewRoute &&
              !isSRPreviewRoute &&
              !isBillPreviewRoute &&
              !isInvoicePreviewRoute &&
              !isPOPreviewRoute &&
              "content-body"
            }
            id="contentBody"
          >
            <Routes>
              <Route path="" element={<DashBoard />} />
              <Route
                path="/Customers/*"
                element={
                  <CustomerData>
                    <CustomerIndex />
                  </CustomerData>
                }
              >
                <Route path="" element={<CustomersTable />} />
                <Route path="Update-Customer" element={<UpdateCustomer />} />
                <Route path="Add-Customer" element={<AddCutomer />} />
              </Route>
              <Route path="Staff/*" element={<StaffIndex />}>
                <Route path="" element={<StaffList />} />
                <Route path="Add-Staff" element={<AddStaff />} />
              </Route>
              <Route path="Map" element={<MapIndex />} />
              <Route path="Estimates" element={<EstimateIndex />}>
                <Route path="" element={<EstimateList />} />
                <Route path="Add-Estimate" element={<AddEstimate />} />
                <Route path='Update-Estimate' element={<UpdateEstimateForm />} />
                <Route path="Estimate-Preview" element={<EstimatePreview />} />
                <Route path={estimateRoute} element={<EstimateIDopen />} />
              </Route>
              <Route path="Service-Requests" element={<ServiceIndex />}>
                <Route path="" element={<SRlist />} />
                <Route path="Service-Request-Preview" element={<SRPreview />} />
                <Route path="Add-SRform" element={<AddSRform />} />
                <Route path={SRroute} element={<ServiceRequest />} />
              </Route>
              <Route path="Purchase-Order/*" element={<PurchaseOrderIndex />}>
                <Route path="" element={<PurchaseOrder />}>
                  <Route
                    path="Purchase-Order-Preview"
                    element={<POPreview />}
                  />

                  <Route path="AddPO" element={<AddPO />}></Route>
                </Route>
              </Route>

              <Route path="Bills/*" element={<BillIndex />}>
                <Route path="" element={<Bills />}></Route>
                <Route path='AddBill' element={<AddBill />} />
                <Route path="Bill-Preview" element={<BillPreview />} />
              </Route>

              <Route path="Invoices/*" element={<InvoiceIndex />}>
                <Route path="" element={<Invoices />}></Route>
                <Route path="Invoice-Preview" element={<InvoicePreview />} />

                <Route path="AddInvioces" element={<AddInvioces />}></Route>
              </Route>

              <Route path="Items" element={<Items />}></Route>

              <Route path="Irrigation" element={<IrrigationIndex />}>
                <Route path="" element={<Irrigationlist />} />
                <Route path="Add-Irrigation" element={<IrrigationForm />} />
              </Route>
              <Route path="Irrigation/Audit-Report" element={<Audit />} />
              <Route path="Punchlist" element={<PunchListIndex />} />
              <Route
                path="Irrigation/PunchlistPreview"
                element={<PunchlistPreview />}
              />
              <Route path="SummaryReport" element={<SummaryReport />} />
              <Route path="ProposalSummary" element={<ProposalSummary />} />
              <Route path="Weekly-Reports" element={<WeeklyReportIndex />}>
                <Route path="" element={<WeeklyReportlist />} />
                <Route path="WeeklyReport" element={<WeeklyReport />} />
                <Route path="Add-Weekly-Report" element={<AddWRform />} />
              </Route>
              <Route path="Landscape" element={<LandscapeIndex />}>
                <Route path="" element={<Landscapelist />} />
                <Route path="Add-Landscape" element={<LandscapeForm />} />
              </Route>
              <Route
                path="Landscape/PunchList-Report"
                element={<Landscape />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <div>
          <h1>Access is denied</h1>
        </div>
      )}

      <Footer />
    </>
  );
};

export default DashboardPage;
