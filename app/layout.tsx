"use client";

import StyledComponentsRegistry from "../lib/registry";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { Theme, themeData } from "@/utils/theme";
import { ThemeProvider } from "@/components/theme";

export const consolasFont = localFont({
  src: "../public/Consolas.ttf",
  display: "swap",
  weight: "300",
});

type ThemeContextType = {
  theme: Theme;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: themeData,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={themeData}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
