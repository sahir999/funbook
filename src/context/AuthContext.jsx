import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  currentUser: null,
  login: () => false,
  logout: () => {},
  register: () => false,
  updateProfilePicture: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === email)) return false;

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      profilePicture: "",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return true;
  };

  const updateProfilePicture = (profilePicture) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, profilePicture };
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, register, updateProfilePicture }}
    >
      {children}
    </AuthContext.Provider>
  );
};
