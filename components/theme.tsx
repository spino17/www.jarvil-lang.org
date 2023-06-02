import { Theme } from "@/utils/theme";
import { useState } from "react";
import { ThemeContext } from "styled-components";

type ThemeProviderProps = {
  theme: Theme;
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
