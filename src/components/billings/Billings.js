import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../state/Store";
import axios from "axios";
import {
  ADD_BILLING,
  ADD_PAGE,
  GET_BILLING,
  REMOVE_BILLING,
} from "../../state/ActionTypes";

const Billings = () => {
  const [state, dispatch] = useContext(Context);
  const { allBill, isLoading, page } = state;

  const limit = 10;

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/billing-list?page=${page}&&limit=${limit}`
      )
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data);
          dispatch({
            type: GET_BILLING,
            payload: res.data.data,
          });
        }
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/delete-billing/${id}`)
      .then((res) => {
        if (res.data.data.acknowledged) {
          dispatch({ type: REMOVE_BILLING, payload: id });
          alert("Delete success");
        }
      });
  };

  return (
    <div>
      <div class="container">
        <h2>Bordered Table</h2>
        <p>The .table-bordered class adds borders to a table:</p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Paid Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBill.length &&
              allBill?.map((bill, index) => (
                <tr key={index}>
                  <td>{isLoading ? <sma>lod..</sma> : bill?._id}</td>
                  <td>{bill?.name}</td>
                  <td>{bill?.email}</td>
                  <td>{bill?.phone}</td>
                  <td>{bill?.amount}</td>
                  <td>
                    <span>Edit</span> |{" "}
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete(bill?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <butto onClick={() => dispatch({ type: ADD_PAGE })}>Next</butto>
    </div>
  );
};

export default Billings;
