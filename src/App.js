import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/css/style.css'
import './assets/css/bootstrap-select.min.css'
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import DashBoard from './components/DashBoard';
import CustomerIndex from './components/Customers/CustomerIndex';
import EstimateIndex from './components/Estimates/EstimateIndex';
import CustomersTable from './components/Customers/CustomersTable';
import AddCutomer from './components/Customers/AddCutomer';
import ServiceIndex from './components/ServiceRequest/ServiceIndex';
import IrrigationIndex from './components/Irrigation/IrrigationIndex';
import IrrigationForm from './components/Irrigation/IrrigationForm';
import Irrigationlist from './components/Irrigation/Irrigationlist';
import Audit from './components/Reports/Audit';
import PunchListIndex from './components/PunchLists/PunchListIndex';
import PunchlistPreview from './components/PunchLists/PunchlistPreview';
import SummaryReport from './components/Reports/SummaryReport';
import ProposalSummary from './components/Reports/ProposalSummary';
import WeeklyReportIndex from './components/Reports/WeeklyReport/WeeklyReportIndex';
import WeeklyReportlist from './components/Reports/WeeklyReport/WeeklyReportlist';
import AddWRform from './components/Reports/WeeklyReport/AddWRform';
import WeeklyReport from './components/Reports/WeeklyReport/WeeklyReport';
import LandscapeIndex from './components/Landscape/LandscapeIndex';
import Landscapelist from './components/Landscape/Landscapelist';
import LandscapeForm from './components/Landscape/LandscapeForm';
import Landscape from './components/Landscape/Landscape';
import { useContext } from 'react';
import { RoutingContext } from './context/RoutesContext';
import ServiceRequest from './components/ServiceRequest/ServiceRequest';
import SRlist from './components/ServiceRequest/SRlist';
import EstimateList from './components/Estimates/EstimateList';
import EstimateIDopen from './components/Estimates/EstimateIDopen';
import AddEstimate from './components/Estimates/AddEstimate';
import MapIndex from './components/Map/MapIndex';
import AddSRform from './components/ServiceRequest/AddSRform';
import StaffIndex from './components/Staff/StaffIndex';
import StaffList from './components/Staff/StaffList';
import AddStaff from './components/Staff/AddStaff';
import ErrorPage from './pages/ErrorPage';

function App() {

  const { SRroute, estimateRoute } = useContext(RoutingContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/Dashboard/*' element={
            <DashboardPage />
          }>
            <Route path='' element={<DashBoard />} />
            <Route path='Customers' element={<CustomerIndex />} >
              <Route path='' element={<CustomersTable />} />
              <Route path='Add-Customer' element={<AddCutomer />} />
            </Route>
            <Route path='Staff/*' element={<StaffIndex />} >
              <Route path='' element={<StaffList />} />
              <Route path='Add-Staff' element={<AddStaff />} />
            </Route>
            <Route path='Map' element={<MapIndex />} />
            <Route path='Estimates' element={<EstimateIndex />} >
              <Route path='' element={<EstimateList />} />
              <Route path='Add-Estimate' element={<AddEstimate />} />
              <Route path={estimateRoute} element={<EstimateIDopen />} />
            </Route>
            <Route path='Service-Requests/*' element={<ServiceIndex />}>
              <Route path='' element={<SRlist />} />
              <Route path='Add' element={<AddSRform />} />
              <Route path={SRroute} element={<ServiceRequest />} />
            </Route>
            <Route path='Irrigation' element={<IrrigationIndex />} >
              <Route path='' element={<Irrigationlist />} />
              <Route path='Add-Irrigation' element={<IrrigationForm />} />
            </Route>
            <Route path='Irrigation/Audit-Report' element={<Audit />} />
            <Route path='Punchlist' element={<PunchListIndex />} />
            <Route path='Irrigation/PunchlistPreview' element={<PunchlistPreview />} />
            <Route path='SummaryReport' element={<SummaryReport />} />
            <Route path='ProposalSummary' element={<ProposalSummary />} />
            <Route path='Weekly-Reports' element={<WeeklyReportIndex />}>
              <Route path='' element={<WeeklyReportlist />} />
              <Route path='WeeklyReport' element={<WeeklyReport />} />
              <Route path='Add-Weekly-Report' element={<AddWRform />} />
            </Route>
            <Route path='Landscape' element={<LandscapeIndex />}>
              <Route path='' element={<Landscapelist />} />
              <Route path='Add-Landscape' element={<LandscapeForm />} />
            </Route>
            <Route path='Landscape/PunchList-Report' element={<Landscape />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        {/* <DataFun>
          <DashboardPage />
        </DataFun> */}
      </BrowserRouter>
    </>
  );
}

export default App;
