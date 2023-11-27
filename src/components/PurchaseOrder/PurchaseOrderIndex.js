import React from 'react'
import { AddPO } from './AddPO'
import PurchaseOrder from './PurchaseOrder'
import { Route, Routes } from 'react-router-dom'
import POPreview from './POPreview'


const PurchaseOrderIndex = () => {
  return (
    <Routes>
    <Route path='' element={<PurchaseOrder />} />
    <Route path='AddPO' element={<AddPO />} />
    <Route path='Purchase-Order-Preview' element={<POPreview />} />

</Routes>
  )
}

export default PurchaseOrderIndex