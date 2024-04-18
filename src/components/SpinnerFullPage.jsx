import Spinner from "./Spinner";
import s from "../styles/SpinnerFullPage.module.scss";

function SpinnerFullPage() {
  return (
    <div className={s.spinnerFullpage}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;