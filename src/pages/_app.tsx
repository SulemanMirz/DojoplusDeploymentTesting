/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { appWithI18Next } from 'ni18n';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import NextNprogress from 'nextjs-progressbar';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { ni18nConfig } from '../../ni18n.config';
import { COLOR_BUTTON_RED } from '../shared/styles/colors';
import 'dayjs/locale/es';
import 'dayjs/locale/pt';

import { theme } from '../shared/styles/theme';
import { createEmotionCache } from '../shared/config/createEmotionCache';

import '../shared/styles/globals.css';
import { initLanguage } from '../shared/utils/language-utils';
import { FireBaseAuthProvider } from '../context/FirebaseContext';
import { store } from '../redux/store';
import FirebaseConnect from '../modules/null-components/FirebaseConnect';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
/**
 *
 * @param {AppProps} prop - Props.
 * @param {AppProps} prop.Component - Component.
 * @param {AppProps} prop.pageProps - PageProps.
 * @returns {JSX.Element} - Main app component.
 */
function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps): JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    initLanguage({ i18n, language: window.navigator.language });
  }, [i18n]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="google-site-verification" content="fbRP9Y1JgSrpgP8Y27SOvg2nwAdJT_kDD4e76fJjN8w" />
      </Head>
      <CacheProvider value={emotionCache}>
        <FireBaseAuthProvider>
          <UserProvider>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <FirebaseConnect />
                <CssBaseline />
                <GlobalStyles
                  styles={{
                    html: {
                      height: '100%',
                    },
                    body: {
                      height: '100%',
                      overflowY: 'scroll',
                    },
                    '#__next': {
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    },
                  }}
                />
                <NextNprogress color={COLOR_BUTTON_RED} />
                <Component {...pageProps} />
              </ThemeProvider>
            </Provider>
          </UserProvider>
        </FireBaseAuthProvider>
      </CacheProvider>
    </>
  );
}

// eslint-disable-next-line import/no-default-export
export default appWithI18Next(App, ni18nConfig);
