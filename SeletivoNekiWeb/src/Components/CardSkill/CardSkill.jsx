import React, { useState } from 'react'
import styles from './CardSkill.module.css'
import { FaJava, FaCircle } from "react-icons/fa";

function CardSkill() {

  const [level, setLevel] = useState("");
  const [corBolinha, setCorBolinha] = useState([
    "#343A40",
    "#343A40",
    "#343A40",
  ]);

  const handleBolinha = (numero) => {
    let novasCores = ["#343A40", "#343A40", "#343A40"];
    let novoLevel = "Level Intermediário";

    if (numero === 0) {
      novasCores = ["#DC3545", "#343A40", "#343A40"];
      novoLevel = "Level Iniciante";
    } else if (numero === 1) {
      novasCores = ["#FFC107", "#FFC107", "#343A40"];
      novoLevel = "Level Intermediário";
    } else if (numero === 2) {
      novasCores = ["#28A745", "#28A745", "#28A745"];
      novoLevel = "Level Avançado";
    }

    setCorBolinha(novasCores);
    setLevel(novoLevel);
  };

  return (
    <div className={styles.containerGeral}>
        <div className={styles.imagem}>
          {/* <FaJava size={180} /> */}
          <img src=""/>
        </div>
        <div className={styles.titulo}>
          <p>Java</p>
        </div>
        <div className={styles.descricao}>
          <p>Conhecimento prévio em java, com mais de 8 cursos diferentes.</p>
        </div>
        <div className={styles.level}>
          <p>{level}</p>
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
  )
}

export default CardSkill