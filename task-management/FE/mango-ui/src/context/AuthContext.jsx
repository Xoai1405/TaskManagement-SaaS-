import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const fakeLogin = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "123456") {
        resolve({ email });
      } else {
        reject(new Error("Email hoặc mật khẩu không đúng"));
      }
    }, 1000);
  });
const fakeRegister = (email, fullName, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "da@gmail.com") {
        reject(new Error("Email đã tồn tại"));
      } else {
        resolve({ email, fullName });
      }
    }, 1000);
  });
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const loggedInUser = await fakeLogin(email, password);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const register = async (email, fullName, password) => {
    await fakeRegister(email, fullName, password);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}