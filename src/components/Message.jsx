import s from "../styles/Message.module.scss";

function Message({ message }) {
  return (
    <p className={s.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;