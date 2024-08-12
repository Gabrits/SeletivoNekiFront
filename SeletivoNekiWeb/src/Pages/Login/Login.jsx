import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonFill } from "react-icons/bs";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const checkboxRef = useRef(null);

  useEffect(() => {
    const salvarLogin = localStorage.getItem('login');
    const salvarSenha = localStorage.getItem('password');

    if (salvarLogin && salvarSenha) {
      setLogin(salvarLogin);
      setPassword(salvarSenha);
      setLembrar(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setMostrarSenha(prevState => !prevState);
  };

  const handleCheckboxChange = () => {
    setLembrar(prevState => !prevState);
  };

  const handleCheckboxClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          toast.error(errorData.message || 'Dados inválidos');
        } else if (response.status === 401) {
          toast.error('Credenciais inválidas');
        } else {
          toast.error('Erro ao autenticar. Por favor, tente novamente.');
        }
        return;
      }
  
      const data = await response.json();
      console.log('Autenticação bem-sucedida:', data);
  
      localStorage.setItem('token', data.token);
  
      if (lembrar) {
        localStorage.setItem('login', login);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('login');
        localStorage.removeItem('password');
      }
  
      navigate('/home');
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      toast.error('Erro ao autenticar. Por favor, tente novamente.');
    }
  };

  return (
    <div className={styles.containerGeral}>
      <div className={styles.card}>
        <div className={styles.titulo}>
          <p>LOGIN</p>
        </div>
        <form className={styles.caixaEntrada} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Email"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <BsPersonFill className={styles.inputIconPessoa} size={24} />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={styles.inputIconOlho}
              onClick={togglePasswordVisibility}
            >
              {mostrarSenha ? <LuEye size={27} /> : <LuEyeOff size={27} />}
            </div>
          </div>
          <div className={styles.checkBox}>
            <input
              type="checkbox"
              id="customCheckbox"
              ref={checkboxRef}
              checked={lembrar}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="customCheckbox"></label>
            <span onClick={handleCheckboxClick}>
              Deseja salvar a sua senha?
            </span>
          </div>
          <div className={styles.entrar}>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
