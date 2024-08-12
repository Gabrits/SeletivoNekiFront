import React, { useState, useEffect } from 'react';
import styles from './CardSkill.module.css';
import { FaCircle, FaTrashAlt } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
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

function CardSkill({ skill, onDelete }) {
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
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await fetchWithAuth(`http://localhost:8080/usuarios/skills/${userId}/${skill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: skill.nome,
          descricao: skill.descricao,
          imagemUrl: skill.imagemUrl,
          level: newLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar skill.');
      }

      setLevel(newLevel);
    } catch (error) {
      console.error('Erro ao atualizar skills:', error);
      toast.error('Erro ao atualizar skill.');
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await fetchWithAuth(`http://localhost:8080/usuarios/skills/${userId}/${skill.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar skill.');
      }

      if (onDelete) {
        onDelete(skill.id);
      }
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
      toast.error('Erro ao deletar skill.');
    }
  };

  return (
    <div className={styles.containerGeral}>
      <div className={styles.trashContainer}>
        <FaTrashAlt
          className={styles.trash}
          size={20}
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
        />
      </div>
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
