import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <div className="bg-primary">
      <Navbar>
        <Container>
          <Navbar.Brand className="text-white" href="#home">
            Power Hack
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="text-white">Paid Total: 00</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
