import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WeeklyReportlist from './WeeklyReportlist'
import WeeklyReport from './WeeklyReport'
import AddWRform from './AddWRform'

const WeeklyReportIndex = () => {
    return (
        <>
            <Routes>
                <Route path='' element={<WeeklyReportlist />} />
                <Route path='WeeklyReport' element={<WeeklyReport />} />
                <Route path='Add-Weekly-Report' element={<AddWRform />} />
            </Routes>
        </>
    )
}

export default WeeklyReportIndex