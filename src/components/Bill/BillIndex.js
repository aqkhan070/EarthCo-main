import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BillPreview from './BillPreview'
import Bills from './Bills'
import AddBill from './AddBill'
const BillIndex = () => {
  return (
    <Routes>
    <Route path='' element={<Bills />} />
    <Route path='AddBill' element={<AddBill />} />
    <Route path='Bill-Preview' element={<BillPreview />} />

</Routes>
  )
}

export default BillIndex