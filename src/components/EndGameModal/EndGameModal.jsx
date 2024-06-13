import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import { postLeader } from "../../api/api";
import { useGameMode } from "../../hooks/useGameMode";
import { useState } from "react";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { pairsCount } = useParams();
  const { isEasyMode, usedAlohomora } = useGameMode();

  const navigate = useNavigate();

  const hardLevelPairsNumber = 6 && 9;

  const isLeader = isWon && Number(pairsCount) === hardLevelPairsNumber;

  const superPlayed = isLeader && usedAlohomora === true;

  const hardPlayed = isLeader && isEasyMode === false;

  const title = isLeader ? "Вы попали в лидерборд!" : isWon ? "Вы выйграли" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const [nameInputElement, setNameInputElement] = useState("");

  const [error, setError] = useState(null);

  let achievements = [];

  if (hardPlayed) {
    achievements.unshift(1);
  }

  if (superPlayed) {
    achievements.unshift(2);
  }

  const time = `${gameDurationMinutes.toString().padStart("2", "0")}.${gameDurationSeconds
    .toString()
    .padStart("2", "0")}`;

  const sumbitPostLeader = async event => {
    event.preventDefault();
    try {
      const timeToBoard = gameDurationMinutes * 60 + gameDurationSeconds;
      if (!nameInputElement.trim()) {
        throw new Error("Введите имя!");
      }
      await postLeader({
        nameInputElement,
        time: timeToBoard,
        achievements: achievements,
      });
      navigate("/leaderboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isLeader ? (
        <>
          <div className={styles.userblock}>
            <input
              className={styles.input}
              type="text"
              name="nameInputElement"
              placeholder="Пользователь"
              value={nameInputElement}
              onChange={event => {
                setNameInputElement(event.target.value);
              }}
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <Button onClick={sumbitPostLeader}>Отправить</Button>
        </>
      ) : null}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>{time}</div>
      <Button onClick={onClick}>Начать сначала</Button>
      {isLeader ? (
        <>
          <Link to="/leaderboard">
            <div className={styles.leaderBoardLink}>Перейти к лидерборду</div>
          </Link>
        </>
      ) : null}
    </div>
  );
}
