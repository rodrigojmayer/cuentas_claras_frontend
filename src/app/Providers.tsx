'use client';

import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createEmotionCache from "../createEmotionCache";

const emotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={emotionCache}>
      <TssCacheProvider value={emotionCache}>
        {children}
      </TssCacheProvider>
    </CacheProvider>
  );
}