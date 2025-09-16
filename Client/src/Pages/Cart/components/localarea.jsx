import { createContext, useState, useContext, useEffect } from "react";

const AreaContext = createContext();

export const AreaProvider = ({ children }) => {
  const [cityId, setCityId] = useState(() => {
    return localStorage.getItem("cityId") || "";
  });

  // Save the cityId to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cityId", cityId);
  }, [cityId]);

  const [localArea, setLocalArea] = useState(() => {
    return localStorage.getItem("localArea") || "";
  });

  // Save the state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("localArea", localArea);
  }, [localArea]);

  // Function to clear area from both state and localStorage
  const clearArea = () => {
    setLocalArea("");
    localStorage.removeItem("localArea");
  };

  // Function to clear city and area from both state and localStorage
  const clearCity = () => {
    setCityId("");
    localStorage.removeItem("cityId");
    localStorage.removeItem("city"); // Remove old city entry if it exists
    clearArea();
  };

  return (
    <AreaContext.Provider
      value={{
        cityId,
        setCityId,
        localArea,
        setLocalArea,
        clearArea,
        clearCity,
      }}
    >
      {children}
    </AreaContext.Provider>
  );
};

export const useAreaContext = () => useContext(AreaContext);
