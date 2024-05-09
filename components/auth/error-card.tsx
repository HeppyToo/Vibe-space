import { FiAlertTriangle } from "react-icons/fi";
import CardWrapper from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <FiAlertTriangle className="w-16 h-16 text-destructive" />
      </div>
    </CardWrapper>
  );
};
