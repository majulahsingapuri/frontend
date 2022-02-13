import { EffectCallback, useEffect, useState } from "react";
import { Auth, AuthState } from "./AuthContext";
import axios, { AxiosResponse } from "axios";
import { AuthResponse, LoginRequest, LoginResponse, GoogleRequest } from "./types";

export const instance = axios.create({
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "x-csrftoken",
    withCredentials: true
});

async function emailLogin(data: LoginRequest) {
    let response = await instance.post<LoginRequest, AxiosResponse<LoginResponse>>(
        `/auth/login/`, data)
    return response.data
}

async function googleLogin(data: GoogleRequest) {
    let response = await instance.post<GoogleRequest, AxiosResponse<LoginResponse>>(
        `/auth/google/`, data)
    console.log(response)
    return response.data
}

function logout() {
    instance.post(`/auth/logout/`).then(() => {
        sessionStorage.setItem("Token", "")
        window.location.href = "/";
    });
}

export function useAuth() {
    const [auth, setAuth] = useState<Auth>({
        state: AuthState.LOADING,
        email: "",
        firstName: "",
    });

    useEffect(() => {
        if (auth.state === AuthState.AUTHENTICATED) {
            return;
        }
        instance.get<AuthResponse>(
            `/api/auth`).then(function (response) {
                const { email, first_name } = response.data;
                setAuth({ state: AuthState.AUTHENTICATED, email: email, firstName: first_name });
            }).catch(() => {
                setAuth({ state: AuthState.UNAUTHENTICATED, email: "", firstName: "" })
            });
    }, [auth.state]);

    useEffect(() => {
        axios.interceptors.request.use((config) => {
            const token = sessionStorage.getItem("Token")
            if (token && config.headers) {
                config.headers.Authorization = `Token ${token}`
            }
            return config;
        })
    }, [])

    return auth;
}

function useGet<T>(url: string | null, initialData: T) {
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState(url !== null);
    const [error, setError] = useState("");

    const doGet: EffectCallback = () => {
        if (!url) {
            return;
        }

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        setLoading(true);
        instance
            .get<T>(url, { cancelToken: source.token })
            .then((response) => setData(response.data))
            .catch(setError)
            .finally(() => setLoading(false));

        return source.cancel;
    };

    useEffect(doGet, [url]);

    return { data, loading, error, doGet };
}

const exports = {
    instance,
    emailLogin,
    googleLogin,
    logout,
};

export default exports;