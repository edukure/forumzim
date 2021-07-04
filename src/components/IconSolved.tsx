interface IconSolvedProps {
    isSolved: boolean;
    className?: string;
}

const IconSolved = ({ isSolved, className = '' }: IconSolvedProps) => {
    const textColor = isSolved ? 'text-green-400' : 'text-gray-400';
    const borderColor = isSolved ? 'border-green-400' : 'border-gray-400';
    const bgColor = isSolved ? 'bg-green-50' : 'bg-gray-50';

    return (
        <div className={`p-2 border-2 ${textColor} ${borderColor} ${bgColor} rounded-full ${className}`}>
            <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default IconSolved;
