import { createContext, useState } from "react";
export const Store = createContext(null);

function Context({ children }) {
  const [message, setMessage] = useState();
  const [singleSermon, setSingleSermon] = useState();
  const [openMediaDrawer, setOpenMediaDrawer] = useState(false);
  const [liveStreamPageStyles, setLiveStreamPageStyles] = useState({
    background: "",
    color: "#737373",
    fontSize: 18,
    fontWeight: 400,
  });

  return (
    <Store.Provider
      value={{
        message,
        setMessage,
        singleSermon,
        setSingleSermon,
        openMediaDrawer,
        setOpenMediaDrawer,
        liveStreamPageStyles,
        setLiveStreamPageStyles,
      }}>
      {children}
    </Store.Provider>
  );
}

export default Context;
