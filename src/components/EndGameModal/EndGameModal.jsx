/*import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
    </div>
  );
}
*/

import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link, useParams } from "react-router-dom";
import { postLeader } from "../../api/api";
import { useGameMode } from "../../hooks/useGameMode";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { pairsCount } = useParams();
  const { isEasyMode } = useGameMode();

  const hardLevelPairsNumber = 3;

  const isLeader = isWon && Number(pairsCount) === hardLevelPairsNumber;

  const hardPlayed = isLeader && isEasyMode === false;

  const title = isLeader ? "Вы попали в лидерборд!" : isWon ? "Вы выйграли" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const nameInputElement = document.getElementById("name-input");

  let achievements = [];

  if (hardPlayed) {
    achievements.unshift(1);
  }

  const time = `${gameDurationMinutes.toString().padStart("2", "0")}.${gameDurationSeconds
    .toString()
    .padStart("2", "0")}`;

  const sumbitPostLeader = () => {
    const timeToBoard = gameDurationMinutes * 60 + gameDurationSeconds;
    postLeader({
      nameInputElement,
      time: timeToBoard,
      achievements: achievements,
    });
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isLeader ? (
        <div className={styles.userblock}>
          <input id="name-input" type="text" className={styles.input} placeholder="Пользователь" />
        </div>
      ) : null}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>{time}</div>
      <Button onClick={onClick}>Начать сначала</Button>
      {isLeader ? (
        <>
          <Link to="/leaderboard">
            <div className={styles.leaderBoardLink} onClick={sumbitPostLeader}>
              Перейти к лидерборду
            </div>
          </Link>
        </>
      ) : null}
    </div>
  );
}
