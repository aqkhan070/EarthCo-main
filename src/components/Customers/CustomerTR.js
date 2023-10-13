import React, { useContext } from 'react'
import { CustomerContext } from '../../context/CustomerData'

const CustomerTR = ({ customer, contact, index }) => {

    const { setSelectedCustomer } = useContext(CustomerContext)

    return (
        <>
            <tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    <div className="products">
                        <div>
                            <h6>{customer.customerName}</h6>
                        </div>
                    </div>
                </td>
                <td><span>{contact.contactName}</span></td>
                <td>
                    <span >{customer.companyName}</span>
                </td>
                <td><span className="text-primary">{contact.email}</span></td>
                <td>
                    <div className='badgeBox'>
                        <button type="button" onClick={(e) => setSelectedCustomer(customer)} className='dispContents' data-toggle="modal" data-target="#customerShow">
                            <span className="actionBadge badge-success light border-0">
                                <span className="material-symbols-outlined">
                                    visibility
                                </span>
                            </span>
                        </button>
                        <span className="actionBadge badge-danger light border-0">
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </span>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default CustomerTR
