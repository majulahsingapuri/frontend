import { createContext } from "react";

export enum AuthState {
  LOADING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export type Auth = {
  state: AuthState;
  email: string;
  firstName: string;
};

export const AuthContext = createContext<Auth>({
  state: AuthState.LOADING,
  email: "",
  firstName: "",
});
