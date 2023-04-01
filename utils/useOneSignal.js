import { useEffect } from "react";

const useOneSignal = () =>
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "9aa8ff74-3226-4750-b4c7-f99718acc765",
        safari_web_id: "web.onesignal.auto.41aef4b6-51a4-4778-92bc-f3aa3e26acde",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });

    return () => {
      window.OneSignal = undefined;
    };
  }, []); // <-- run this effect once on mount

export default useOneSignal;
