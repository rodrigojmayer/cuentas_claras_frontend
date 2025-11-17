'use client';

import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createEmotionCache from "../createEmotionCache";
import { SessionProvider } from "next-auth/react";

const emotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <TssCacheProvider value={emotionCache}>
          {children}
        </TssCacheProvider>
      </CacheProvider>
    </SessionProvider>
  );
}