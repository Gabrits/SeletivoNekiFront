import React, { useState, useEffect } from 'react';
import styles from './CardSkill.module.css';
import { FaCircle } from "react-icons/fa";
import {jwtDecode} from 'jwt-decode';

function CardSkill({ skill }) {
  const [level, setLevel] = useState(skill.level);
  const [corBolinha, setCorBolinha] = useState(getInitialColors(skill.level));

  function getInitialColors(level) {
    if (level === "INICIANTE") return ["#DC3545", "#343A40", "#343A40"];
    if (level === "INTERMEDIARIO") return ["#FFC107", "#FFC107", "#343A40"];
    if (level === "AVANCADO") return ["#28A745", "#28A745", "#28A745"];
    return ["#343A40", "#343A40", "#343A40"];
  }

  function formatLevel(level) {
    switch (level) {
      case "INICIANTE":
        return "Level Iniciante";
      case "INTERMEDIARIO":
        return "Level Intermediário";
      case "AVANCADO":
        return "Level Avançado";
      default:
        return level;
    }
  }

  useEffect(() => {
    setCorBolinha(getInitialColors(level));
  }, [level]);

  const updateSkillLevel = async (newLevel) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const response = await fetch(`http://localhost:8080/usuarios/skills/${userId}/${skill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: skill.nome,
          descricao: skill.descricao,
          imagemUrl: skill.imagemUrl,
          level: newLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar skills.');
      }

      setLevel(newLevel);
    } catch (error) {
      console.error('Erro ao atualizar skills:', error);
    }
  };

  const handleBolinha = (numero) => {
    let novoLevel = "INTERMEDIARIO";

    if (numero === 0) {
      novoLevel = "INICIANTE";
    } else if (numero === 1) {
      novoLevel = "INTERMEDIARIO";
    } else if (numero === 2) {
      novoLevel = "AVANCADO";
    }

    updateSkillLevel(novoLevel);
  };

  return (
    <div className={styles.containerGeral}>
      <div className={styles.imagem}>
        <img src={skill.imagemUrl} alt="" />
      </div>
      <div className={styles.titulo}>
        <p>{skill.nome}</p>
      </div>
      <div className={styles.descricao}>
        <p>{skill.descricao}</p>
      </div>
      <div className={styles.level}>
        <p>{formatLevel(level)}</p>
      </div>
      <div className={styles.levelBolinha}>
        <FaCircle
          size={20}
          className={styles.bolinha}
          style={{ color: corBolinha[0], cursor: "pointer" }}
          onClick={() => handleBolinha(0)}
        />
        <FaCircle
          size={20}
          className={styles.bolinha}
          style={{ color: corBolinha[1], cursor: "pointer" }}
          onClick={() => handleBolinha(1)}
        />
        <FaCircle
          size={20}
          className={styles.bolinha}
          style={{ color: corBolinha[2], cursor: "pointer" }}
          onClick={() => handleBolinha(2)}
        />
      </div>
    </div>
  );
}

export default CardSkill;
