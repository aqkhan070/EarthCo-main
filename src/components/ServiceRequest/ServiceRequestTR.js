import React from 'react'
import { NavLink } from 'react-router-dom'

const ServiceRequestTR = ({ record, onClick, index }) => {


    const handleClick = () => {
        onClick();
    }
    return (
        <tr className='serviceRequestRecords'>
            <td>
                {index + 1}
            </td>

            {/* <td>
                <span className="badge light badge-light">
                    {record.type}
                </span>
            </td> */}
            <td onClick={handleClick}>
                <NavLink to={`service-request${record.ID}`} style={{ display: 'contents' }}>
                    {record.ID}
                </NavLink>
            </td>

            <td>
                <p>{record.customer}</p>
            </td>
            <td>
                <p>{record.assign}</p>
            </td>
            <td>
                <p>{record.status}</p>
            </td>
            <td>
                <p>{record.workRequested}</p>
            </td>
            <td>
                <p>{record.created}</p>
            </td>
            <td>
                <p>{record.proposalNo}</p>
            </td>
            <td>
                <div className="flex-box">
                    <button title="Edit" type="button" className="btn btn-warning btn-sm mx-1">
                        <i className="fa fa-pen"></i>
                    </button>

                    <button title="Delete" type="button" className="btn btn-danger btn-sm mx-1">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </td>

        </tr>
    )
}

export default ServiceRequestTR
