// AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Cadastro from '../Pages/Cadastro/Cadastro';
import Home from '../Pages/Home/Home';
import { useAuth } from '../Hooks/useAuth';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
      />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Login />} />
      <Route
        path="/cadastro"
        element={!isAuthenticated ? <Cadastro /> : <Cadastro />}
      />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
    </Routes>
  );
};

export default AppRouter;
