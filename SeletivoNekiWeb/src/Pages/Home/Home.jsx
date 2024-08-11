import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../../Components/NavBar/NavBar';
import CardBoasVindas from '../../Components/CardBoasVindas/CardBoasVindas';
import Footer from '../../Components/Footer/Footer';
import CardSkill from '../../Components/CardSkill/CardSkill';

function Home() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSkills = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await fetch(`http://localhost:8080/usuarios/skills/${userId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar as skills.");
        }
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Erro ao buscar as skills:', error);
      }
    };

    fetchUserSkills();
  }, [navigate]);

  return (
    <div className={styles.containerGeral}>
      <div>
        <NavBar />
      </div>
      <div className={styles.cardBoasVindas}>
        <CardBoasVindas />
      </div>
      <div className={styles.divisor}></div>
      <div className={styles.tituloHabilidades}>
        <h1>Habilidades</h1>
      </div>
      <div className={styles.cardSkill}>
        {skills.map(skill => (
          <CardSkill key={skill.id} skill={skill} />
        ))}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
