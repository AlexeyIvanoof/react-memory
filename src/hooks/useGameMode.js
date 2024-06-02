import { useContext } from "react";
import { GameModeContext } from "../pages/SelectLevelPage/CheckBoxContext";

export function useGameMode() {
  return useContext(GameModeContext);
}
