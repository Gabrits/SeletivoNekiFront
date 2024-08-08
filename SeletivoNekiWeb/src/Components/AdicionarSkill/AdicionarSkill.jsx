import React from 'react';
import styles from './AdicionarSkill.module.css';

function AdicionarSkill({ closeModal }) {

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
        <div className={styles.caixaEntrada}>
          <select>
            <option value="" disabled selected hidden>Qual a sua skill?</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
          <select>
            <option value="" disabled selected hidden>Qual o seu nível?</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        <button onClick={closeModal}>Adicionar Habilidade</button>
        </div>
      </div>
    </div>
  );
}

export default AdicionarSkill;