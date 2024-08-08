import React, { useState, useRef } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { BsPersonFill } from "react-icons/bs";
import { LuEye, LuEyeOff } from "react-icons/lu";

function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const checkboxRef = useRef(null);

  const togglePasswordVisibility = () => {
    setMostrarSenha(prevState => !prevState);
  }

  const handleCheckboxClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  }

  const handleCadastro = () => {
    navigate('/cadastro');
  }

  const handleHome = () => {
    navigate('/home');
  }

  return (
    <div className={styles.containerGeral}>
      <div className={styles.card}>
        <div className={styles.titulo}>
          <p>LOGIN</p>
        </div>
        <div className={styles.caixaEntrada}>
          <div className={styles.inputWrapper}>
            <input type="text" placeholder="Email" />
            <BsPersonFill className={styles.inputIconPessoa} size={24} />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
            />
            <div className={styles.inputIconOlho} onClick={togglePasswordVisibility}>
              {mostrarSenha ? <LuEye size={27} /> : <LuEyeOff size={27} />}
            </div>
          </div>
          <div className={styles.checkBox}>
            <input
              type="checkbox"
              id="customCheckbox"
              ref={checkboxRef}
            />
            <label htmlFor="customCheckbox"></label>
            <span onClick={handleCheckboxClick}>Deseja salvar a sua senha?</span>
          </div>
          <div className={styles.entrar} onClick={handleHome}>
            <button>Entrar</button>
          </div>
          <div className={styles.cadastrarContainer}>
            <p>Não possui uma conta? </p>
            <div className={styles.cadastrar}>
              <p onClick={handleCadastro}> Cadastre-se</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
