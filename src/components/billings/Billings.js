import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../state/Store";
import axios from "axios";
import { GET_BILLING, REMOVE_BILLING } from "../../state/ActionTypes";
import { useForm } from "react-hook-form";
import { Modal, Spinner } from "react-bootstrap";
import { useToast } from "rc-toastr";
import { ADD_BILLING } from "./../../state/ActionTypes";

const Billings = () => {
  const { toast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [updateData, setUpdateData] = useState({});

  const { allBill, search } = state;

  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
    setUpdateData(" ");
  };
  const handleShow = (bill) => {
    setShow(true);
    setUpdateData(bill);
  };
  const { register, handleSubmit, reset } = useForm();
  const limit = 10;

  // query bills
  useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `https://power-hack-server-cyc5.onrender.com/api/billing-list?page=${page}&&limit=${limit}`
      )
      .then((res) => {
        if (res.data.data) {
          setIsloading(false);
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
      .delete(
        `https://power-hack-server-cyc5.onrender.com/api/delete-billing/${id}`
      )
      .then((res) => {
        if (res.data.data.acknowledged) {
          dispatch({ type: REMOVE_BILLING, payload: id });
          toast.success("Deleted successfully");
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
      _id: updateData?._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      amount: data.amount,
    };

    axios
      .put(
        `https://power-hack-server-cyc5.onrender.com/api/update-billing/${updateData?._id}`,
        {
          update,
        }
      )
      .then((res) => {
        if (res.data.data.acknowledged) {
          handleClose();
          toast.success("updated success!");

          dispatch({
            type: ADD_BILLING,
            payload: {
              name: data.name,
              email: data.email,
              phone: data.email,
              amount: data.amount,
              _id: updateData?._id,
            },
          });
        }
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
              placeholder={updateData?.name}
              maxLength="15"
              required
            />
            <br />
            <input
              className="mt-2"
              {...register("email")}
              type="email"
              placeholder={updateData?.email}
              required
            />
            <br />
            <input
              className="mt-2"
              {...register("phone")}
              type="number"
              placeholder={updateData?.phone}
              maxLength="15"
              required
            />
            <br />
            <input
              className="mt-2"
              {...register("amount")}
              type="number"
              placeholder={updateData?.amount}
              maxLength="8"
              required
            />
            <br />
            <input className="mt-2" type="submit" value="Update Post" />
          </form>
        </Modal.Body>
      </Modal>
      <div className="container">
        <h2>Bordered Table</h2>
        <p>The .table-bordered class adds borders to a table:</p>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center  my-5">
            {" "}
            <Spinner animation="grow " variant="secondary" />
          </div>
        ) : (
          <table className="table table-bordered">
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
                      : item.name?.toLowerCase().includes(search) ||
                          item.phone?.includes(search) ||
                          item.email.toLowerCase().includes(search) ||
                          item.amount.includes(search);
                  })
                  .map((bill, index) => (
                    <tr key={index}>
                      <td> {bill?._id}</td>
                      <td>{bill?.name}</td>
                      <td>{bill?.email}</td>
                      <td>{bill?.phone}</td>
                      <td>${bill?.amount}</td>
                      <td>
                        <button
                          onClick={() => handleShow(bill)}
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
        )}
      </div>
      {!isLoading && (
        <div className=" d-flex justify-content-center gap-2 text-center">
          <button className="btn btn-success" onClick={handlePrevious}>
            Previous
          </button>

          <button className="btn btn-success" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Billings;
