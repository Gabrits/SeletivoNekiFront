import React, { useState, useRef } from 'react';
import styles from './Cadastro.module.css';
import { useNavigate } from 'react-router-dom';
import { BsPersonFill } from "react-icons/bs";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

function Cadastro() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const checkboxRef = useRef(null);

  const togglePasswordVisibility = () => {
    setMostrarSenha(prevState => !prevState);
  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className={styles.containerGeral}>
      <div className={styles.voltar} onClick={handleLogin}>
      <IoIosArrowBack size={46} style={{cursor:"pointer"}}/>
      </div>
      <div className={styles.card}>
        <div className={styles.titulo}>
          <p>CADASTRO</p>
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
          <div className={styles.inputWrapper}>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Confirmar senha"
            />
            <div className={styles.inputIconOlho} onClick={togglePasswordVisibility}>
              {mostrarSenha ? <LuEye size={27} /> : <LuEyeOff size={27} />}
            </div>
          </div>
          
          <div className={styles.entrar}>
            <button>Continuar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
