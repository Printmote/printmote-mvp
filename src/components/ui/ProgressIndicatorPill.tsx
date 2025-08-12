import { PiCheckCircleFill } from "react-icons/pi";

interface ProgressIndicatorPillProps {
    step: number;
    label: string;
    isActive?: boolean;
    isCompleted?: boolean;
    onClick?: () => void;
    description?: string;
    isLast?: boolean;
}

export default function ProgressIndicatorPill({
    step,
    label,
    isActive = false,
    isCompleted = false,
    onClick,
    description = '',
    isLast,
}: ProgressIndicatorPillProps) {
    return (
        <>
        <div className="flex flex-row lg:flex-col gap-0 items-center w-fit">
        <span onClick={onClick} className={` rounded-full cursor-pointer flex items-center justify-center h-[50px] w-[50px] border-gray-200 border-2 ${isCompleted ? "bg-green-500 text-white border-green-500 px-1": "bg-transparent text-gray-800"} ${isActive && "!bg-[#6150FF] text-white font-bold !border-blue-100 border-4"}`}>
            {isCompleted ? <PiCheckCircleFill size={24}/>: step}
        </span>
        {!isLast && <div className={`lg:h-[80px] lg:w-[2px] h-[2px] w-[40px] ${isCompleted? "bg-green-500":"bg-gray-200"}`}></div>}
        </div>
        </>
    );
}