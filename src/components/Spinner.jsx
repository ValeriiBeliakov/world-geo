import s from "../styles/Spinner.module.scss";

function Spinner() {
  return (
    <div className={s.spinnerContainer}>
      <div className={s.spinner}></div>
    </div>
  );
}

export default Spinner;