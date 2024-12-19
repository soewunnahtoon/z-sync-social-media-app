import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "Username must have 5 characters long." })
      .regex(new RegExp(/^[a-zA-Z0-9_]+$/), {
        message: "Username can only contain letters numbers and underscores.",
      }),
    firstName: z
      .string()
      .min(5, { message: "First name must have at leat 1 character." })
      .regex(new RegExp(/^[A-Z][a-zA-Z-' ]{1,39}$/), {
        message: "First name can only contain letters.",
      }),
    lastName: z
      .string()
      .min(5, { message: "Last name must have at leat 1 character." })
      .regex(new RegExp(/^[A-Z][a-zA-Z-' ]{1,39}$/), {
        message: "Last name can only contain letters.",
      }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email.")
      .regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), {
        message: "This is not a valid email.",
      }),
    password: z
      .string()
      .min(8, { message: "Password must have 8 characters long." })
      .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/), {
        message:
          "Password must contain uppercase and lowercase letters and digits.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must have 8 characters long." }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "The passwords did not match.",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), {
      message: "This is not a valid email.",
    }),
  password: z
    .string()
    .min(5, { message: "Password must have 5 characters long." })
    .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/), {
      message:
        "Password must contain uppercase and lowercase letters and digits.",
    }),
  code: z.optional(z.string()),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), {
      message: "This is not a valid email.",
    }),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must have 8 characters long." })
      .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/), {
        message:
          "Password must contain uppercase and lowercase letters and digits.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must have 8 characters long." }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "The passwords did not match.",
      path: ["confirmPassword"],
    }
  );

export const createPostSchema = z.object({
  content: z.string().trim().min(1, "Required"),
  mediaIds: z.array(z.string()).max(5, "Cannot have more than 5 attachments"),
});

export const createCommentSchema = z.object({
  content: z.string().trim().min(1, "Required"),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  bio: z.string().max(1000, "Must be at most 1000 characters"),
});
