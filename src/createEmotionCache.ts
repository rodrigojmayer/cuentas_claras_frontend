import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of <head> for proper overriding
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}