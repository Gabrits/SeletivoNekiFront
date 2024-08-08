import React, { useState } from 'react';
import styles from './CardBoasVindas.module.css';
import { FaJava, FaCircle } from "react-icons/fa";
import AdicionarSkill from '../AdicionarSkill/AdicionarSkill';

function CardBoasVindas() {
  const [level, setLevel] = useState("Level Intermediário");
  const [corBolinha, setCorBolinha] = useState([
    "#FFC107",
    "#FFC107",
    "#343A40",
  ]);
  const [modalOpen, setModalOpen] = useState(false);

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.cardBoasVindasContainer}>
      <div className={styles.escritaCardBoasVindas}>
        <div>
          <h1>Exiba suas</h1>
          <h1 style={{ fontSize: "45px" }}>Habilidades!</h1>
          <p>
            Adicione suas competências com fotos, descrições e níveis de
            proficiência. Mostre o que você sabe fazer!
          </p>
          <button onClick={openModal}>Adicionar Habilidade</button>{" "}
          {/* Botão que abre o modal */}
        </div>
      </div>
      <div className={styles.cardJava}>
        <div className={styles.imagemCardJava}>
          <FaJava size={180} />
        </div>
        <div className={styles.tituloCardJava}>
          <p>Java</p>
        </div>
        <div className={styles.descricaoCardJava}>
          <p>
          Java é uma linguagem orientada a objetos, versátil e 
  amplamente usada no desenvolvimento de software.
          </p>
        </div>
        <div className={styles.levelCardJava}>
          <p>{level}</p>
        </div>
        <div className={styles.levelBolinhaCardJava}>
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

      {modalOpen && <AdicionarSkill closeModal={closeModal} />}
    </div>
  );
}

export default CardBoasVindas;
