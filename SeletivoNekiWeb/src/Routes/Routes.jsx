import React from 'react'
import Login from '../Pages/Login/Login'
import Cadastro from '../Pages/Cadastro/Cadastro'
import Home from '../Pages/Home/Home'
import { Route, Routes } from 'react-router-dom';

function AppRouter() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  );
}

export default AppRouter