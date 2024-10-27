import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedToken: { role: string; fullName: string; sub: string } =
          jwtDecode(token);
        setUserRole(decodedToken.role);
        localStorage.setItem("userRole", decodedToken.role);
        setIsAuthenticated(true);
        setUserName(decodedToken.fullName);
        setUserEmail(decodedToken.sub);
      } else {
        setUserRole("");
        setIsAuthenticated(false);
        setUserName("");
        setUserEmail("");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return { setIsAuthenticated, isAuthenticated, userRole, userName, userEmail };
};
