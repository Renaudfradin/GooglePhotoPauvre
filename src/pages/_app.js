import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/utils/theme.js';
import createEmotionCache from '@/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
