"use client";

import { z } from "zod";
import { ZodType } from "zod";
export type SignUp = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type SignIn = {
  email: string;
  password: string;
};

export const SignInSchema: ZodType<SignIn> = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
export const SignUpSchema: ZodType<SignUp> = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
});
