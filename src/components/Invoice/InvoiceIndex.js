import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddInvioces from './AddInvioces'
import Invoices from './Invoices'
import InvoicePreview from './InvoicePreview'

const InvoiceIndex = () => {
  return (
<Routes>
    <Route path='' element={<Invoices />} />
    <Route path='AddInvioces' element={<AddInvioces />} />
    <Route path='Invoice-Preview' element={<InvoicePreview />} />

</Routes>
  )
}

export default InvoiceIndex