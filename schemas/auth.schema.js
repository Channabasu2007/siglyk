import { z } from "zod";

export const signupRequestSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
});

export const otpVerifySchema = z.object({
    email: z.string().email(),
    // Validates exactly 6 numeric digits as a string
    otp: z.string()
        .length(6, "Verification code must be exactly 6 digits")
        .regex(/^\d+$/, "Verification code must only contain numbers"),
});

export const registrationSchema = z.object({
    // From User Model
    email: z.string().email(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
    role: z.enum(['INDIVIDUAL', 'ORG_ADMIN', 'ORG_EMPLOYEE']).default('INDIVIDUAL'),
    orgId: z.string().optional().nullable(), // For employees joining a company
    gender : z.enum(['Male', ' Female', 'Other']).optional(),
    // From Profile Model
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username too long"),
    nationality: z.string().optional(),
    preference: z.enum(['Speech', 'Sign'], {
        errorMap: () => ({ message: "Please select Speech or Sign" })
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Sets the error to the confirmPassword field in the UI
});

// Asking the user to provide their email to start the password reset process
export const forgotPasswordRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Checking the data recieved for reset of password
export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "Code must be 6 digits"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmNewPassword: z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

// For employees changing their password while logged in for the firste time or it is used in the profile settings to change password
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "New password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmNewPassword: z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match",
  path: ["confirmNewPassword"],
});

// Login schema for the users withe Oauth provider
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  // Optional for future OAuth integration
  provider: z.string().optional(), 
});