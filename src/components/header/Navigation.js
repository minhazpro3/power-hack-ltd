import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Context } from "./../../state/Store";

import { useNavigate } from "react-router-dom";

import { ADD_USER } from "../../state/ActionTypes";

const Navigation = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="bg-primary">
      <Navbar>
        <Container>
          <Navbar.Brand className="text-white" href="#home">
            Power Hack
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="text-white">Hey</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
