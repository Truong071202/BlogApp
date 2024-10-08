import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();
import { showSuccessToast } from "../services/toastService";

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const login = async (inputs) => {
    const res = await axios.post("/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    try {
      // Assuming you don't need to pass any data, an empty object can be used
      await axios.post("/api/auth/logout", {});
      setCurrentUser(null);
      showSuccessToast("Logout Success!");
    } catch (err) {
      console.error(err);
    }
  };

  //change current user => uef
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
