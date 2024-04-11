import { FiAlertTriangle } from "react-icons/fi";

interface FormErrorProps {
    massage?: string;
}

export const FormError = ({massage}: FormErrorProps) => {
    if(!massage) return null;

    return (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <FiAlertTriangle className="w-5 h-5"/>
            <p>{massage}</p>
        </div>
    )
}