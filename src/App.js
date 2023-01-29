import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/authentications/Login";
import Register from "./pages/authentications/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
