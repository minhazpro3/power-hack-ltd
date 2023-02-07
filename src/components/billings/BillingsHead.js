import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "../../state/Store";
import { ADD_BILLING } from "../../state/ActionTypes";
import { FILTER_SEARCH } from "./../../state/ActionTypes";
import { useToast } from "rc-toastr";

const BillingsHead = () => {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(Context);
  const { toast } = useToast();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://power-hack-server-cyc5.onrender.com/api/add-billing", {
        data,
      })
      .then((res) => {
        if (res.data.data.acknowledged) {
          reset();
          handleClose();

          toast.success("Wow! Successfully Done");

          dispatch({
            type: ADD_BILLING,
            payload: {
              name: data.name,
              email: data.email,
              phone: data.email,
              amount: data.amount,
              _id: res.data.data.insertedIds[0],
            },
          });
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A New Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto my-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="  form-control"
              {...register("name")}
              type="text"
              placeholder="  Full Name"
              required
              maxLength="15"
            />
            <br />
            <input
              className="  form-control"
              {...register("email")}
              type="email"
              placeholder="E-mail"
              required
            />
            <br />
            <input
              className="  form-control"
              {...register("phone")}
              type="number"
              placeholder="Phone"
              required
              maxLength="15"
            />
            <br />
            <input
              className="  form-control"
              {...register("amount")}
              type="number"
              placeholder="Amount"
              maxLength="8"
              required
            />
            <br />
            <input
              className="mt-2 btn btn-success w-100 "
              type="submit"
              value="Create Post"
            />
          </form>
        </Modal.Body>
      </Modal>

      <Navbar>
        <Container className="bg-secondary d-flex justify-content-between py-2">
          <Navbar.Brand className="text-white" href="#home">
            Billings
          </Navbar.Brand>
          <input
            style={{ width: "40%" }}
            type="text"
            className="form-control"
            id="pwd"
            placeholder="Search by any"
            name="search"
            onChange={(e) =>
              dispatch({ type: FILTER_SEARCH, payload: e.target.value })
            }
          />

          <Navbar.Collapse className="justify-content-end">
            <Button className="text-white btn btn-success" onClick={handleShow}>
              Add New Bill:
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default BillingsHead;
