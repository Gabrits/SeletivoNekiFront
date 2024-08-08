import React from 'react';
import styles from './Footer.module.css';
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.redesSociais}>
        <a href='https://www.instagram.com/nekitechnologies/' target="_blank" rel="noopener noreferrer">
          <AiFillInstagram size={33}/>
        </a>
        <a href='https://www.linkedin.com/company/neki-it/' target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={29} style={{marginBottom:"2px", marginLeft:"10px"}} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
