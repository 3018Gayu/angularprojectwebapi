export interface User {
  userId: number;
  name: string;
  email: string;
  passwordHash?: string;
  role: string;
  isActive: boolean;
}
