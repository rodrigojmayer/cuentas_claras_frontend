'use client';

import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createEmotionCache from "../createEmotionCache";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const emotionCache = createEmotionCache();

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-asap-condensed), sans-serif",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <CacheProvider value={emotionCache}>
          <TssCacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </TssCacheProvider>
        </CacheProvider>
      </NextThemeProvider>
    </SessionProvider>
  );
}