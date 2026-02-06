export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

/** Only email is required for forgot password */
export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
  user: {
    userId: number;
    name: string;
    email: string;
    role: string;
  };
}
