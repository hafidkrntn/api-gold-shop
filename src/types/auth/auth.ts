export interface UserForm {
  id?: string;
  name: string;
  email: string;
  password?: string; // Optional because we won't return it in responses
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginResponse {
  token: string;
  user: Omit<UserForm, 'password'>;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}