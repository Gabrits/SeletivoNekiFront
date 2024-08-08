import React from 'react'
import styles from './NavBar.module.css'
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import logo from '../../assets/logoNomeTransparente.png'

function NavBar() {

  const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
      }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logoImagem}/>
      </div>
      <div className={styles.logOutIcon} onClick={handleLogin}>
        <BiLogOut size={30} />
      </div>
    </div>
  );
}

export default NavBar