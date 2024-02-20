import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/css/style.css";
import "./assets/css/bootstrap-select.min.css";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./components/DashBoard";
import CustomerIndex from "./components/Customers/CustomerIndex";
import EstimateIndex from "./components/Estimates/EstimateIndex";
import CustomersTable from "./components/Customers/CustomersTable";
import AddCutomer from "./components/Customers/AddCutomer";
import UpdateCustomer from "./components/Customers/UpdateCustomer";
import ServiceIndex from "./components/ServiceRequest/ServiceIndex";
import IrrigationIndex from "./components/Irrigation/IrrigationIndex";
import IrrigationForm from "./components/Irrigation/IrrigationForm";
import Irrigationlist from "./components/Irrigation/Irrigationlist";
import Audit from "./components/Reports/Audit";
import PunchListIndex from "./components/PunchLists/PunchListIndex";
import PunchlistPreview from "./components/PunchLists/PunchlistPreview";
import SummaryReport from "./components/Reports/SummaryReport";
import ProposalSummary from "./components/Reports/ProposalSummary";
import WeeklyReportIndex from "./components/Reports/WeeklyReport/WeeklyReportIndex";
import WeeklyReportlist from "./components/Reports/WeeklyReport/WeeklyReportlist";
import AddWRform from "./components/Reports/WeeklyReport/AddWRform";
import WeeklyReport from "./components/Reports/WeeklyReport/WeeklyReport";
import LandscapeIndex from "./components/Landscape/LandscapeIndex";
import Landscapelist from "./components/Landscape/Landscapelist";
import LandscapeForm from "./components/Landscape/LandscapeForm";
import Landscape from "./components/Landscape/Landscape";
import { useContext } from "react";
import { RoutingContext } from "./context/RoutesContext";
import ServiceRequest from "./components/ServiceRequest/ServiceRequest";
import UpdateSRForm from "./components/ServiceRequest/UpdateSRForm";
import SRlist from "./components/ServiceRequest/SRlist";
import EstimateList from "./components/Estimates/EstimateList";
import EstimateIDopen from "./components/Estimates/EstimateIDopen";
import AddEstimate from "./components/Estimates/AddEstimate";
import MapIndex from "./components/Map/MapIndex";
import AddSRform from "./components/ServiceRequest/AddSRform";
import StaffIndex from "./components/Staff/StaffIndex";
import StaffList from "./components/Staff/StaffList";
import AddStaff from "./components/Staff/AddStaff";
import ErrorPage from "./pages/ErrorPage";
import ResetPassword from "./pages/ResetPassword";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EstimatePreview from "./components/Estimates/EstimatePreview";
import PurchaseOrder from "./components/PurchaseOrder/PurchaseOrder";
import PurchaseOrderIndex from "./components/PurchaseOrder/PurchaseOrderIndex";
import { AddPO } from "./components/PurchaseOrder/AddPO";
import Invoices from "./components/Invoice/Invoices";
import InvoiceIndex from "./components/Invoice/InvoiceIndex";
import AddInvioces from "./components/Invoice/AddInvioces";
import Bills from "./components/Bill/Bills";
import { EstimateProvider } from "./context/EstimateContext";
import SRPreview from "./components/ServiceRequest/SRPreview";
import POPreview from "./components/PurchaseOrder/POPreview";
import InvoicePreview from "./components/Invoice/InvoicePreview";
import BillIndex from "./components/Bill/BillIndex";
import BillPreview from "./components/Bill/BillPreview";
import AddBill from "./components/Bill/AddBill";
import UpdateEstimateForm from "./components/Estimates/UpdateEstimateForm";
import SummaryReportPreview from "./components/Reports/SummaryReportPreview";
import Items from "./components/Items/Items";
import AddItem from "./components/Items/AddItem";
import ItemIndex from "./components/Items/ItemIndex";
import GenralReport from "./components/Reports/GenralReport";
import SendMail from "./components/Reports/SendMail";
import AddRisingCanes from "./components/Reports/WeeklyReport/RisingCanes/AddRisingCanes";
import RisingCaneTable from "./components/Reports/WeeklyReport/RisingCanes/RisingCaneTable";
import RisingCanesPreview from "./components/Reports/WeeklyReport/RisingCanes/RisingCanesPreview";
import PunchListPhotoOnly from "./components/PunchListPhotoOnly/PunchListPhotoOnly";
import AddPLPhotoOnly from "./components/PunchListPhotoOnly/AddPLPhotoOnly";
import PLPhotoOnlyPreview from "./components/PunchListPhotoOnly/PLPhotoOnlyPreview";
import IrrigationAuditTable from "./components/IrrigationAudit/IrrigationAuditTable";
import AddIrrigationAudit from "./components/IrrigationAudit/AddIrrigationAudit";
import IrrigationAuditPreview from "./components/IrrigationAudit/IrrigationAuditPreview";
import TermsandConditions from "./pages/TermsandConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CompanySelect from "./pages/CompanySelect";
import WagesTable from "./components/Staff/WagesTable";
import SprayTechForm from "./components/SprayTech/SprayTechForm";
import SprayTechIndex from "./components/SprayTech/SprayTechIndex";
import SprayTechList from "./components/SprayTech/SprayTechList";
import STPreview from "./components/SprayTech/STPreview";
import SprayTechPreview from "./components/ServiceRequest/SprayTechPreview";
import WeeklyReportPdf from "./components/Reports/WeeklyReport/WeeklyReportPdf";






function App() {
  const { SRroute, estimateRoute } = useContext(RoutingContext);

  return (
    <>
      <EstimateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsandConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />

            <Route path="/" element={<DashboardPage />}>
              <Route path="/dashBoard" element={<DashBoard />} />

              <Route path="customers" element={<CustomerIndex />}>
                <Route path="" element={<CustomersTable />} />
                <Route path="add-customer" element={<AddCutomer />} />
                <Route path="update-customer" element={<UpdateCustomer />} />
              </Route>
              <Route path="staff/*" element={<StaffIndex />}>
                <Route path="" element={<StaffList />} />
                <Route path="add-staff" element={<AddStaff />} />
              </Route>
              <Route path="map" element={<MapIndex />} />
              <Route path="estimates" element={<EstimateIndex />}>
                <Route path="" element={<EstimateList />} />
                <Route path="add-estimate" element={<AddEstimate />} />
                <Route
                  path="update-estimate"
                  element={<UpdateEstimateForm />}
                />
                <Route path="estimate-preview" element={<EstimatePreview />} />
                <Route path={estimateRoute} element={<EstimateIDopen />} />
              </Route>
              <Route path="service-requests/*" element={<ServiceIndex />}>
                <Route path="" element={<SRlist />} />
                <Route path="service-request-preview" element={<SRPreview />} />
                <Route path='spray-tech-preview' element={<SprayTechPreview />} />
                <Route path="add-sRform" element={<AddSRform />} />
                <Route path="update-sRform" element={<UpdateSRForm />} />
                <Route path={SRroute} element={<ServiceRequest />} />
              </Route>

              <Route path="spray-tech/*" element={<SprayTechIndex />}>
                <Route path="" element={<SprayTechList />} />
               
                <Route path="preview" element={<STPreview />} />
                <Route path="add" element={<SprayTechForm />} />
                {/* <Route path="spray-tech" element={<ServiceRequest />} /> */}
              </Route>

              <Route path="purchase-order/*" element={<PurchaseOrderIndex />}>
                <Route path="" element={<PurchaseOrder />}>
                  <Route
                    path="purchase-order-preview"
                    element={<POPreview />}
                  />

                  <Route path="add-po" element={<AddPO />}></Route>
                </Route>
              </Route>

              {/* <Route path="Bills" element={<Bills />}></Route> */}
              <Route path="bills/*" element={<BillIndex />}>
                <Route path="" element={<Bills />}></Route>
                <Route path="add-bill" element={<AddBill />} />
                <Route path="bill-preview" element={<BillPreview />} />
              </Route>

              <Route path="invoices/*" element={<InvoiceIndex />}>
                <Route path="" element={<Invoices />}></Route>
                <Route path="add-invoices" element={<AddInvioces />}></Route>
                <Route path="invoice-preview" element={<InvoicePreview />} />
              </Route>

              <Route path="items/*" element={<ItemIndex />}>
                <Route path="" element={<Items />} />
                <Route path="add-item" element={<AddItem />} />
              </Route>

              <Route path="irrigation" element={<IrrigationIndex />}>
                <Route path="" element={<Irrigationlist />} />
                <Route path="add-irrigation" element={<IrrigationForm />} />
              </Route>
              <Route path="irrigation/audit-report" element={<Audit />} />
              <Route path="punchlist" element={<PunchListIndex />} />
              <Route path="summary-report" element={<SummaryReport />} />
              <Route path="PunchlistPreview" element={<PunchlistPreview />} />
              <Route
                path="summary-report-preview"
                element={<SummaryReportPreview />}
              />
              <Route path="general-report" element={<GenralReport />} />
              <Route path="/company-select" element={<CompanySelect />} />
              <Route path="/wages" element={<WagesTable />} />

              <Route path="proposal-summary" element={<ProposalSummary />} />
              <Route path="weekly-reports" element={<WeeklyReportIndex />}>
                <Route path="" element={<WeeklyReportlist />} />
                <Route
                  path="weekly-report-preview"
                  element={<WeeklyReport />}
                />
                <Route path="add-weekly-report" element={<AddWRform />} />
              </Route>
              <Route path="landscape" element={<LandscapeIndex />}>
                <Route path="" element={<Landscapelist />} />
                <Route path="add-landscape" element={<LandscapeForm />} />
              </Route>
              <Route
                path="landscape/landscape-report"
                element={<Landscape />}
              />
              <Route path="send-mail" element={<SendMail />} />
              <Route
                path="weekly-reports/add-rising-canes"
                element={<AddRisingCanes />}
              />
              <Route
                path="weekly-reports/rising-canes"
                element={<RisingCaneTable />}
              />
              <Route
                path="weekly-reports/rising-canes-preview"
                element={<RisingCanesPreview />}
              />

              <Route
                path="punchList-photos-only"
                element={<PunchListPhotoOnly />}
              />
              <Route
                path="punchList-photos-only/add"
                element={<AddPLPhotoOnly />}
              />
              <Route
                path="punchList-photos-only/preview"
                element={<PLPhotoOnlyPreview />}
              />

              <Route
                path="irrigation-audit"
                element={<IrrigationAuditTable />}
              />
              <Route
                path="irrigation-audit/add"
                element={<AddIrrigationAudit />}
              />
              <Route
                path="irrigation-audit/preview"
                element={<IrrigationAuditPreview />}
              />
               <Route
                path="testpdf"
                element={<WeeklyReportPdf />}
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          {/* <DataFun>
          <DashboardPage />
        </DataFun> */}
        </BrowserRouter>
      </EstimateProvider>
    </>
  );
}

export default App;
