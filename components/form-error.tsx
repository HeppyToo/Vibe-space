import { FiAlertTriangle } from "react-icons/fi";

interface FormErrorProps {
    message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FiAlertTriangle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};
