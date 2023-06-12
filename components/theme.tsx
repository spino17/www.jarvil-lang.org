"use client";

import { Theme, themeData } from "@/utils/theme";
import React from "react";
import { ThemeContext } from "styled-components";

type ThemeContextType = {
  theme: Theme;
};

export const LocalThemeContext = React.createContext<ThemeContextType>({
  theme: themeData,
});

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
