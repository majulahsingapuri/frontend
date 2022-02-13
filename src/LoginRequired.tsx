import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./api";
import { AuthContext, AuthState } from "./AuthContext";
import { Login } from "./Login"

export const LoginRequired: React.FC = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {auth.state === AuthState.AUTHENTICATED ? children : 
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<Navigate to={"/login"} />}/>
        </Routes>
      }
    </AuthContext.Provider>
  );
};