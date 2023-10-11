import React, { useContext } from 'react'
import TitleBar from '../TitleBar'
import ServiceRequests from './ServiceRequests'
import SRlist from './SRlist'
import { Route, Routes } from 'react-router-dom'
import ServiceRequest from './ServiceRequest'
import { RoutingContext } from '../../context/RoutesContext'
import AddSRform from './AddSRform'

const ServiceIndex = () => {

    const { SRroute } = useContext(RoutingContext)

    return (
        <>
            <Routes>
                <Route path='' element={<SRlist />} />
                <Route path='Add' element={<AddSRform />} />
                <Route path={SRroute} element={<ServiceRequest />} />
            </Routes>
        </>
    )
}

export default ServiceIndex