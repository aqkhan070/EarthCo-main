import React, { useContext } from 'react'
import TitleBar from '../TitleBar'
import ServiceRequests from './ServiceRequests'
import SRlist from './SRlist'
import { Route, Routes } from 'react-router-dom'
import ServiceRequest from './ServiceRequest'
import { RoutingContext } from '../../context/RoutesContext'
import AddSRform from './AddSRform'
import SRPreview from './SRPreview'

const ServiceIndex = () => {

    const { SRroute } = useContext(RoutingContext)

    return (
        <>
            <Routes>
                <Route path='' element={<SRlist />} />
                <Route path='Add-SRform' element={<AddSRform />} />
                <Route path='Service-Request-Preview' element={<SRPreview />} />
                <Route path={SRroute} element={<ServiceRequest />} />
            </Routes>
        </>
    )
}

export default ServiceIndex