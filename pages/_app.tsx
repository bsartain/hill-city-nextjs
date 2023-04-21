// pages/_app.js
import "./main-styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "../context/context";
import AudioPlayer from "components/AudioPlayer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "ga";
import useOneSignal from "../utils/useOneSignal";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useOneSignal();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Context>
        <Component {...pageProps} />
        <AudioPlayer />
      </Context>
    </>
  );
}
