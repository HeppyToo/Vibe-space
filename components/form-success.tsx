import { CiCircleCheck } from "react-icons/ci";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CiCircleCheck className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};
