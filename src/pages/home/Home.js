import React, { useContext, useEffect } from "react";
import Billings from "../../components/billings/Billings";
import BillingsHead from "../../components/billings/BillingsHead";
import Navigation from "../../components/header/Navigation";

const Home = () => {
  return (
    <div>
      <Navigation />
      <BillingsHead />
      <Billings />
    </div>
  );
};

export default Home;
