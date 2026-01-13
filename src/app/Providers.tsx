'use client';

import { useEffect, useState, useMemo } from "react";
import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createEmotionCache from "../createEmotionCache";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { createTheme } from "@mui/material/styles";

const emotionCache = createEmotionCache();

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
        },
        typography: {
          fontFamily: "var(--font-asap-condensed), sans-serif",
        },
      }),
    [resolvedTheme]
  );

  if (!mounted) return null; // ⛔ prevent hydration mismatch

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
      >
        <CacheProvider value={emotionCache}>
          <TssCacheProvider value={emotionCache}>
            <MuiThemeWrapper>
              {children}
            </MuiThemeWrapper>
          </TssCacheProvider>
        </CacheProvider>
      </NextThemeProvider>
    </SessionProvider>
  );
}