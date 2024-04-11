import { CiCircleCheck } from "react-icons/ci";

interface FormSuccessProps {
    massage?: string;
}

export const FormSuccess = ({massage}: FormSuccessProps) => {
    if(!massage) return null;

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CiCircleCheck className="w-5 h-5"/>
            <p>{massage}</p>
        </div>
    )
}