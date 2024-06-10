import styles from "./Checkbox.module.css";
import { useGameMode } from "../../hooks/useGameMode";
export default function Checkbox({ id, name, label, onClick }) {
  const { isEasyMode } = useGameMode();
  return (
    <div className={styles.wrapper}>
      <input type="checkbox" id={id} name={name} checked={isEasyMode} className={styles.input} onClick={onClick} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
