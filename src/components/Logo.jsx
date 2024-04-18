import styles from "../styles/Logo.module.scss";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import s from "../styles/Logo.module.scss"

function Logo() {
  return (
    <div className={s.logo}>
       <Link to="/">
      <img src={logo} alt="WorldWise logo" className={styles.logo} />
    </Link>
    </div>
   

  );
}

export default Logo;
