import { createContext, useState } from "react";

export const GameModeContext = createContext(null);

export const GameModeProvider = ({ children }) => {
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [usedAlohomora, setUsedAlohomora] = useState(false);

  return (
    <GameModeContext.Provider value={{ isEasyMode, setIsEasyMode, usedAlohomora, setUsedAlohomora }}>
      {children}
    </GameModeContext.Provider>
  );
};
