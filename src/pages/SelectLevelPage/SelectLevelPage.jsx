import styles from "./SelectLevelPage.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import { useGameMode } from "../../hooks/useGameMode";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

export function SelectLevelPage() {
  window.history.go(1);
  const { setIsEasyMode } = useGameMode();
  const selectGameMode = setIsEasyMode;
  const [difficult, setDifficult] = useState({});

  const selectDifficult = e => {
    const { value } = e.target;
    setDifficult(value);
  };

  let number = 3;
  if (difficult === "easy") {
    number = 3;
  }
  if (difficult === "middle") {
    number = 6;
  }
  if (difficult === "hard") {
    number = 9;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <input
            className={styles.levelInput}
            type="radio"
            id="radio1"
            name="mode"
            value="easy"
            onChange={selectDifficult}
          />
          <li className={cn(styles.level, { [styles.active]: number === 3 })}>
            <label className={styles.levelLink} htmlFor="radio1">
              1
            </label>
          </li>
          <input
            className={styles.levelInput}
            type="radio"
            id="radio2"
            name="mode"
            value="middle"
            onChange={selectDifficult}
          />
          <li className={cn(styles.level, { [styles.active]: number === 6 })}>
            <label className={styles.levelLink} htmlFor="radio2">
              2
            </label>
          </li>
          <input
            className={styles.levelInput}
            type="radio"
            id="radio3"
            name="mode"
            value="hard"
            onChange={selectDifficult}
          />
          <li className={cn(styles.level, { [styles.active]: number === 9 })}>
            <label className={styles.levelLink} htmlFor="radio3">
              3
            </label>
          </li>
        </ul>
        <Checkbox id={"modeCheckbox"} name={"modeCheckbox"} label={"Легкий режим (3 жизни)"} onClick={selectGameMode} />
        <Link to={`/game/${number}`}>
          <Button>Играть</Button>
        </Link>
        <Link to="/leaderboard">
          <div className={styles.leaderBoardLink}>Перейти к лидерборду</div>
        </Link>
      </div>
    </div>
  );
}
