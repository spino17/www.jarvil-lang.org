import { ThemeProvider } from "@/components/theme";
import StyledComponentsRegistry from "../lib/registry";
import "./globals.css";
import React from "react";
import { themeData } from "@/utils/theme";
import "semantic-ui-css/semantic.min.css";
import { TopBar } from "@/components/top_bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={themeData}>
            <TopBar />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
