import { useEffect } from "react";
import { Html, Head, Main, NextScript } from "next/document";
import useOneSignal from "utils/useOneSignal";

export default function Document() {
  useEffect(() => {
    useOneSignal();
  }, []);
  return (
    <Html>
      <Head>
        <link rel='stylesheet' href='https://kit.fontawesome.com/8b07aff316.css' crossOrigin='anonymous'></link>
        <link rel='manifest' href='/manifest.json' />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async={true}></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
