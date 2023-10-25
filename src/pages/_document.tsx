import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Main,
  NextScript,
  Head,
  Html,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from '../shared/config/createEmotionCache';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          enhanceApp: (App: any) => (props) =>
            sheet.collectStyles(<App emotionCache={cache} {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      // This is important. It prevents emotion to render invalid HTML.
      // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
      const emotionStyles = extractCriticalToChunks(initialProps.html);
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));

      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          emotionStyleTags,
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <title>DOJO+</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Saira:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
          // Import the two tones MD variant                           ^^^^^^^^
        />
        <style jsx global>{`
          /* ::-webkit-scrollbar {
            width: 2px;
          } */
          a {
            color: inherit;
            text-decoration: none !important;
          }
          textarea {
            padding: 0;
            line-height: inherit;
          }
          button,
          input,
          optgroup,
          select,
          textarea {
            font-family: inherit;
            font-size: 100%;
            line-height: 1.15;
            margin: 0;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:active {
            transition: background-color 5000s ease-in-out 0s;
            -webkit-text-fill-color: #fff !important;
          }
          input:-webkit-autofill:focus {
            transition: background-color 5000s ease-in-out 0s;
            -webkit-text-fill-color: rgba(27, 27, 27, 1) !important;
          }
          .nav-active {
            background-color: #fff !important;
            border-radius: 100% !important;
            color: #111 !important;
          }
          .activeFooter {
            color: rgba(255, 89, 95, 1);
          }

          .text-dojogray-900 {
            color: rgba(60, 60, 60, 1);
            font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI,
              Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
          }
          .disabled:opacity-50:disabled,
          .opacity-50 {
            opacity: 0.5;
          }
          .focus:outline-none:focus,
          .outline-none {
            outline: 2px solid transparent;
            outline-offset: 2px;
          }
          .appearance-none {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          .bg-transparent {
            background-color: transparent;
          }
          .focus-within:text-dojogray-900:focus-within {
            color: rgba(27, 27, 27, 1);
          }
          .css-1wgcwo1-MuiButtonBase-root-MuiIconButton-root,
          .css-nfrs8p-MuiButtonBase-root-MuiIconButton-root,
          .css-7kykdr-MuiButtonBase-root-MuiIconButton-root {
            color: #fff !important;
          }
        `}</style>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="https://maps.google.com/maps/api/js?key=AIzaSyA7OXXpkCUsyuTOCs37F8sjwlY4I57PkT0"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
