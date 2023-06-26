import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from 'react';
import Home from "./Pages/Home"
import Login from "./Component/Login/Login"
import SignUp from "./Component/Signup/SignUp";
import Card from './Component/Card/Card'
import Chart from './Component/Graph/Graph'
import DataGridDemo from "./Component/DataGrid/Datagrid";
import StripedGrid from "./Component/DataGrid/StripeGrid";
import Demo from "./Component/DataGrid/grid";
import { StyledEngineProvider } from '@mui/material/styles';
import { Component } from "react";

const Component1 = lazy(() => import('./Component/DataGrid/StripeGrid'));

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/card" element={<Card />} />
        <Route path="/datagrid" element={<DataGridDemo/>}/>
        <Route path="/stripe" element={<StripedGrid/>}/>
      </Routes>
    </BrowserRouter>

    // <StyledEngineProvider injectFirst>
    //   <Demo />
    // </StyledEngineProvider> 
    // <Chart />

    
    

  );
};

export default App;

