'use client';

import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createEmotionCache from "../createEmotionCache";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const emotionCache = createEmotionCache();

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-asap-condensed), sans-serif",

  //     subsets: ["latin"],
  // weight: ["300", "400", "500", "600", "700"],
  // variable: ""


  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <TssCacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </TssCacheProvider>
      </CacheProvider>
    </SessionProvider>
  );
}