import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

const domaim = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code is: ${token}</p>`,
    })
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${domaim}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    })
}

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${domaim}/auth/new-verification?token=${token}`;

    console.log(email)

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Сonfirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    })
}