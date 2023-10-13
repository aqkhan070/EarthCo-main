import axios from "axios";
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataFun = ({ children }) => {

    const [singleObj, setSingleObj] = useState();
    const [singleSR, setSingleSR] = useState();

    const [users, setUsers] = useState();

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8001/Users');
        setUsers(response.data)
    }
    const fetchCustomers = async () => {
        const response = await axios.get('http://localhost:8001/Customers');
        setCustomers(response.data)
    }

    useEffect(() => {
        fetchUsers();
        fetchCustomers();
    }, [])

    const [estimates, setEstimates] = useState([
        {
            estimateID: 1000,
            customerName: 'Crest DeVille',
            issuedDate: '7 / 10 / 2023',
            approvedTotal: 4105.00,
            SRstatus: 'Open',
            serviceRequest: 'Estimate (#',
            QBstatus: 'Not Sent',
            status: 'Sent',
            notes: 'Notes...'
        },
        {
            estimateID: 1001,
            customerName: 'Sea Summit',
            issuedDate: '4 / 07 / 2023',
            approvedTotal: 1175.20,
            SRstatus: 'Closed',
            serviceRequest: 'Estimate (#',
            QBstatus: 'Not Sent',
            status: 'Sent',
            notes: 'Notes...'
        },
        {
            estimateID: 1002,
            customerName: 'Bella Palermo',
            issuedDate: '2 / 09 / 2023',
            approvedTotal: 3104.02,
            SRstatus: 'Open',
            serviceRequest: 'Estimate (#',
            QBstatus: 'Not Sent',
            status: 'Sent',
            notes: 'Notes...'
        },
        {
            estimateID: 1003,
            customerName: 'Valmont',
            issuedDate: '7 / 10 / 2023',
            approvedTotal: 3904.02,
            SRstatus: 'Open',
            serviceRequest: 'Estimate (#',
            QBstatus: 'Ready to Send',
            status: 'Sent',
            notes: 'Notes...'
        },
        {
            estimateID: 1004,
            customerName: 'Promenade',
            issuedDate: '2 / 10 / 2023',
            approvedTotal: 2994.02,
            SRstatus: 'Closed',
            serviceRequest: 'Estimate (#',
            QBstatus: 'Not Sent',
            status: 'Sent',
            notes: 'Notes...'
        },
        {
            estimateID: 1005,
            customerName: 'Highland Park',
            issuedDate: '2 / 09 / 2023',
            approvedTotal: 3104.02,
            SRstatus: 'Open',
            serviceRequest: 'Estimate (#',
            QBstatus: 'Not Sent',
            status: 'Sent',
            notes: 'Notes...'
        }
    ]);

    const [customers, setCustomers] = useState();

    const [serviceRequests, setServiceRequest] = useState([
        {
            ID: "SR-1001",
            type: 'Monthly Maintainence Report',
            assign: 'Vincente, Allan',
            customer: 'Sunrise Lane',
            status: 'Closed',
            created: '1/17/2014 4:29 PM',
            estimateTotal: 30.0,
            description: '14 IG ROSEMARY PROSTRATA',
            proposalNo: 'OC-91014-02',
            workRequested: 'This proposal is to install Jute for the protection of the bare areas on the slopes.'
        },
        {
            ID: "SR-1002",
            type: 'Weekly Maintainence Report',
            assign: 'Vincente, Allan',
            customer: 'Hillandale Ave',
            status: 'Open',
            created: '5/12/2022 4:29 PM',
            estimateTotal: 90.5,
            description: 'TREE REMOVAL',
            proposalNo: 'OC-910883-09',
            workRequested: 'This proposal is to trim all the Melelueca and California Pepper trees throughout the community.'
        }
    ]);

    const [contacts, setContacts] = useState([]);

    const [wReportData, setWReportData] = useState([
        {
            id: 742246,
            assign: 'Vincente, Allan',
            customer: 'Wakeham',
            status: 'Closed',
            created: '1/17/2014 4:29 PM',
            estTotal: '$0.00',
            workRequested: 'hrthsertae'
        }
    ])

    const [estimateItems, setEstimateItems] = useState([
        {
            id: 'item1',
            name: '05GP',
            qty: 10,
            description: '5 Gallon Plant - Carissa m. Green Carpet',
            rate: 38.00,
            tax: 'Non',
        }
    ])

    const [loggedUser, setLoggedUser] = useState([]);



    return (
        <DataContext.Provider value={{ users, setUsers, loggedUser, setLoggedUser, contacts, setContacts, estimates, setEstimates, customers, setCustomers, singleObj, setSingleObj, serviceRequests, setServiceRequest, singleSR, setSingleSR, estimateItems, setEstimateItems, wReportData, setWReportData }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataFun;
export { DataContext };