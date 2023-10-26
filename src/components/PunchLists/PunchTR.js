import React from "react";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";


const PunchTR = () => {
  return (
    <div className="table-responsive">
      <table
       
        className="display table"
        style={{ minWidth: "845px" }}
      >
        <thead>
          <tr className="serviceRequestRecords">
            <th>#</th>

            <th>Customer Name</th>
            <th>Title</th>
            <th>Assigned to</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Report</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td >1</td>
            <td>Vincente, Allan</td>
            <td>PL-1001</td>

            <td>Sunrise Lane</td>

            <td>1/17/2014</td>
            <td>Closed</td>
            <td>
              <NavLink to="/Dashboard/Irrigation/PunchlistPreview">
                <span className="badge badge-primary light border-0 me-1">
                  Open
                </span>
              </NavLink>
            </td>
            <td>
              <div className="flex-box">
                <button
                  title="Add punchlist"
                  type="button"
                  className="btn btn-secondary btn-sm mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#addPhotos"
                >
                  <i className="fa fa-plus"></i>
                </button>

                <button
                  title="Edit"
                  type="button"
                  className="btn btn-warning btn-sm mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#editPunch"
                >
                  <i className="fa fa-pen"></i>
                </button>

                <button
                  title="Delete"
                  type="button"
                  className="btn btn-danger btn-sm mx-1"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr id="subRow">
            <td colSpan={4}>
              <div className="products">
                <img  className="avatar avatar-md" alt="lazy" />
                <div>
                  <h6>Keep plants</h6>
                  <span>Pool</span>
                </div>
              </div>
            </td>
            <td className="visNo"></td>
            <td className="visNo"></td>
            <td className="visNo"></td>
            <td className="visNo"></td>
            <td className="visNo"></td>
            <td className="visNo"></td>
            <td colSpan={3}>
              <Form.Select className="bg-white">
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
                <option value="Estimate">Estimate</option>
                <option value="Service Request">Service Request</option>
              </Form.Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PunchTR;
