import { Link } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import cn from "classnames";
import { Button } from "../../components/Button/Button";
import { getLeaderList } from "../../api/api";
import { useEffect, useState } from "react";
export function LeaderBoardPage() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getLeaderList().then(data => {
      setLeaders(data.leaders.sort((a, b) => (a.time > b.time ? 1 : -1)).slice(0, 10));
    });
  }, []);

  function leaderTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const zeroMinutes = minutes < 10 ? 0 : "";
    const zeroSeconds = seconds < 10 ? 0 : "";

    return `${zeroMinutes}${minutes}:${zeroSeconds}${seconds}`;
  }
  return (
    <>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.pagename}>Лидерборд</div>
          <Link to="/">
            <Button>Начать игру</Button>
          </Link>
        </div>
        <div className={styles.list}>
          <div className={cn(styles.listContent, styles.titleText)}>
            <div className={styles.position}>Позиция</div>
            <div className={styles.name}>Пользователь</div>
            <div className={styles.time}>Время</div>
          </div>
          {leaders.map((list, index) => (
            <div className={cn(styles.listContent, styles.playerText)} key={list.id}>
              <div className={styles.position}># {index + 1}</div>
              <div className={styles.name}>{list.name}</div>
              <div className={styles.time}>{leaderTime(list.time)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
