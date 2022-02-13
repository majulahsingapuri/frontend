import './App.css';
import React from "react";
import "antd/dist/antd.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Base } from "./Base";
import { LoginRequired } from "./LoginRequired";
import { Home } from "./Home";


function App() {
  return (
    <BrowserRouter>
      <LoginRequired>
        <Base>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="*" element={<Navigate to={"/"} />}/>
          </Routes>
        </Base>
      </LoginRequired>
    </BrowserRouter>
  );
}

export default App;
