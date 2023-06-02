import { ThemeProvider } from "@/components/theme";
import StyledComponentsRegistry from "../lib/registry";
import "./globals.css";
import React from "react";
import { themeData } from "@/utils/theme";

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
