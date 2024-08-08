import React, { useState } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { FaJava, FaCircle } from "react-icons/fa";
import NavBar from '../../Components/NavBar/NavBar';
import CardBoasVindas from '../../Components/CardBoasVindas/CardBoasVindas';
import Footer from '../../Components/Footer/Footer';
import CardSkill from '../../Components/CardSkill/CardSkill';

function Home() {
  return (
    <div className={styles.containerGeral}>
      <div>
        <NavBar />
      </div>
      <div className={styles.cardBoasVindas}>
        <CardBoasVindas/>
      </div>
      <div className={styles.divisor}></div>
      <div className={styles.tituloHabilidades}>
        <h1>Habilidades</h1>
      </div>
      <div className={styles.cardSkill}>
        <CardSkill/>
      </div>
      <div className={styles.footer}>
      <Footer/>
      </div>
    </div>
  );
}

export default Home;
