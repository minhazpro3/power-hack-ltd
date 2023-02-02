import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../state/Store";
import axios from "axios";
import {
  ADD_BILLING,
  ADD_PAGE,
  GET_BILLING,
  REMOVE_BILLING,
  UPDATE_BILLING,
} from "../../state/ActionTypes";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

const Billings = () => {
  const [state, dispatch] = useContext(Context);
  const [updateId, setUpdateId] = useState(" ");

  const { allBill, isLoading, search } = state;

  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => setShow(true);
  const { register, handleSubmit, reset } = useForm();
  const limit = 10;

  const handleBill = (id) => {
    handleShow();

    setUpdateId(id);
  };

  // query bills
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
  }, [page]);

  // delete bills

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

  // previous page
  const handlePrevious = () => {
    if (page === 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  // next page
  const handleNext = () => {
    setPage((p) => p + 1);
  };

  // update bill func

  const onSubmit = (data) => {
    const update = {
      _id: updateId?._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      amount: data.amount,
    };

    axios
      .put(`http://localhost:5000/api/update-billing/${updateId?._id}`, {
        update,
      })
      .then((res) => {
        console.log(res.data);
        // if (res.data) {
        //   handleClose();
        //   alert("updated success!");

        //   dispatch({ type: ADD_BILLING, payload: update });
        // }
      });
  };

  return (
    <div className="my-3">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mt-2"
              {...register("name")}
              type="text"
              placeholder={"Full Name"}
              required
              maxLength="15"
            />
            <br />
            <input
              className="mt-2"
              {...register("email")}
              type="email"
              placeholder="E-mail"
              required
            />
            <br />
            <input
              className="mt-2"
              {...register("phone")}
              type="number"
              placeholder="Phone"
              required
              maxLength="15"
            />
            <br />
            <input
              className="mt-2"
              {...register("amount")}
              type="number"
              placeholder="Amount"
              maxLength="8"
              required
            />
            <br />
            <input className="mt-2" type="submit" value="Create Post" />
          </form>
        </Modal.Body>
      </Modal>
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
              allBill
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search);
                })
                .map((bill, index) => (
                  <tr key={index}>
                    <td>{isLoading ? <sma>lod..</sma> : bill?._id}</td>
                    <td>{bill?.name}</td>
                    <td>{bill?.email}</td>
                    <td>{bill?.phone}</td>
                    <td>${bill?.amount}</td>
                    <td>
                      <button
                        onClick={() => handleBill(bill?._id)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <button
                        className="btn btn-danger"
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
      <div className=" d-flex justify-content-center gap-2 text-center">
        <button className="btn btn-success" onClick={handlePrevious}>
          Previous
        </button>
        {allBill.length - 1 ? (
          <button className="btn btn-success" onClick={handleNext}>
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Billings;
