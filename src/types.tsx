export type LoginRequest = {
    email: string;
    password: string;
}

export type GoogleRequest = {
    code: string
}

export type LoginResponse = {
    key: string;
}

export type AuthResponse = {
    email: string;
    first_name: string;
};

export type Error = {
    error: string;
}
