import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Cadastro.module.css';
import { jwtDecode } from 'jwt-decode';

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    confirmPassword: ''
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleBack = () => {
    navigate('/home');
  };

  const togglePasswordVisibility = () => {
    setMostrarSenha(prevState => !prevState);
  };

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não correspondem. Por favor, verifique e tente novamente.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await fetch('http://localhost:8080/auth/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
          role: 'USER'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        console.log('Cadastro realizado:', json);
        toast.success('Cadastro realizado com sucesso!');
      } else {
        console.log('Resposta do servidor não é JSON ou está vazia.');
        toast.success('Cadastro realizado com sucesso!');
      }
    } catch (err) {
      console.error('Erro ao realizar o cadastro:', err);
      toast.error('Erro ao realizar o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <div className={styles.containerGeral}>
      <div className={styles.voltar} onClick={handleBack}>
        <IoIosArrowBack size={46} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.card}>
        <div className={styles.titulo}>
          <p>CADASTRO</p>
        </div>
        <form className={styles.caixaEntrada} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Email"
              value={formData.login}
              onChange={(e) => handleInputChange(e, "login")}
              required
            />
            <BsPersonFill className={styles.inputIconPessoa} size={24} />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
              required
            />
            <div
              className={styles.inputIconOlho}
              onClick={togglePasswordVisibility}
            >
              {mostrarSenha ? <LuEye size={27} /> : <LuEyeOff size={27} />}
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e, "confirmPassword")}
              required
            />
            <div
              className={styles.inputIconOlho}
              onClick={togglePasswordVisibility}
            >
              {mostrarSenha ? <LuEye size={27} /> : <LuEyeOff size={27} />}
            </div>
          </div>
          <div className={styles.entrar}>
            <Button variant="contained" type="submit">
              Continuar
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cadastro;
