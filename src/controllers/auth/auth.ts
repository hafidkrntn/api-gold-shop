import { Request, Response } from "express";
import { Responses } from "../../utils";
import { authService } from "../../services";
import { LoginPayload, LoginResponse, RegisterPayload } from "../../types";

export const register = async (req: Request, res: Response) => {
  const { name, email, password }: RegisterPayload = req.body;

  try {
    const user = await authService.register({ name, email, password });
    Responses.SuccessCreate(res, user);
  } catch (err: any) {
    Responses.ErrorBadRequest(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginPayload = req.body;
    const { token, user }: LoginResponse = await authService.login(req.body);
    Responses.SuccessRead(res, token);
  } catch (err: any) {
    Responses.ErrorUnauthorized(res, err);
  }
}