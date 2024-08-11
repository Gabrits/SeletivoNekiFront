import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from './AdicionarSkill.module.css';

function AdicionarSkill({ closeModal }) {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('INTERMEDIARIO');
  const [error, setError] = useState(null);

  // Fetch available skills on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:8080/skills');
        if (!response.ok) {
          throw new Error("Erro ao buscar skills.");
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error('Erro ao buscar skills:', err);
        setError('Erro ao buscar skills');
      }
    };

    fetchSkills();
  }, []);

  const handleAddSkill = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('O usuário não está autenticado.');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await fetch('http://localhost:8080/usuarios/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuarioId: userId,
          skillId: selectedSkill,
          level: selectedLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar skill.');
      }

      alert('Skill adicionada com sucesso');
      closeModal();
    } catch (err) {
      console.error('Erro ao adicionar skill:', err);
      setError('Erro ao adicionar skill');
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains(styles.cardModal)) {
      closeModal();
    }
  };

  return (
    <div className={styles.cardModal} onClick={handleClickOutside}>
      <div className={styles.conteudoModal}>
        <div>
          <button className={styles.closeButton} onClick={closeModal}>×</button>
        </div>
        <h2>Adicionar Habilidade</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.caixaEntrada}>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="" disabled hidden>Qual a sua skill?</option>
            {skills.map(skill => (
              <option key={skill.id} value={skill.id}>
                {skill.nome}
              </option>
            ))}
          </select>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="INICIANTE">Iniciante</option>
            <option value="INTERMEDIARIO">Intermediário</option>
            <option value="AVANCADO">Avançado</option>
          </select>
          <button onClick={handleAddSkill}>Adicionar Habilidade</button>
        </div>
      </div>
    </div>
  );
}

export default AdicionarSkill;
