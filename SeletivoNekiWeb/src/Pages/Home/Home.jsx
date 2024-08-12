import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../../Components/NavBar/NavBar';
import CardBoasVindas from '../../Components/CardBoasVindas/CardBoasVindas';
import Footer from '../../Components/Footer/Footer';
import CardSkill from '../../Components/CardSkill/CardSkill';
import { toast } from 'react-toastify';

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token não encontrado');
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return response;
};

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

        const response = await fetchWithAuth(`http://localhost:8080/usuarios/skills/${userId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar as skills.");
        }
        const data = await response.json();

        const uniqueSkills = data.filter((skill, index, self) =>
          index === self.findIndex((s) => (
            s.id === skill.id
          ))
        );

        setSkills(uniqueSkills);
      } catch (error) {
        console.error('Erro ao buscar as skills:', error);
        toast.error('Erro ao buscar as skills.');
      }
    };

    fetchUserSkills();
  }, [navigate]);

  const handleDelete = async (skillId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await fetchWithAuth(`http://localhost:8080/skills/${userId}/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar skill.');
      }

      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== skillId));
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
      toast.error('Erro ao deletar skill.');
    }
  };

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
          <CardSkill
            key={skill.id}
            skill={skill}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
