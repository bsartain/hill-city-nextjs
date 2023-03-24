// pages/_app.js
import "./main-styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "../context/context";
import AudioPlayer from "components/AudioPlayer";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Component {...pageProps} />
        <AudioPlayer />
      </Context>
    </>
  );
}
