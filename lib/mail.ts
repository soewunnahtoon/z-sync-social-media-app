import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email.",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const twoFactorMail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two factor authentication.",
    html: `<p>Your two factor authentication code is ${token}</p>`,
  });
};

export const sendResetPasswordMail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password.",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
