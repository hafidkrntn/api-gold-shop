import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginPayload, LoginResponse, RegisterPayload, UserForm } from "../../types";

const JWT_SECRET = process.env.JWT_SECRET || 'JDRuy2Zv8JzEpAE06m66aDRU7JUd9p1u';

export const authService = {
  async register(payload: RegisterPayload): Promise<Omit<UserForm, 'password'>> {
    try {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: payload.email }
      });

      if (existingUser) {
        throw new Error('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(payload.password, 10);
      
      const user = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const user = await prisma.user.findUnique({ 
        where: { email: payload.email } 
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(payload.password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        JWT_SECRET, 
        { expiresIn: "1h" }
      );

      return { 
        token, 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email 
        } 
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Additional auth methods can be added here
};
