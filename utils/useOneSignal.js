import { useEffect } from "react";

const useOneSignal = () =>
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "8cc82fdb-7b0d-4854-a96f-27330ae8032c",
        safari_web_id: "web.onesignal.auto.052f5ca9-1683-44c8-8c04-d88e94620413",
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
