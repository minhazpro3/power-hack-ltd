import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Modal from "react-bootstrap/Modal";

const BillingsHead = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
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
            placeholder="Search"
            name="search"
          ></input>

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
