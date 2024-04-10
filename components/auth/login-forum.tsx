import CardWrapper from "@/components/auth/card-wrapper";

export const LoginForum = () => {
    return (
        <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register" showSocialLogin>
            Login Forum!
        </CardWrapper>
    )
}