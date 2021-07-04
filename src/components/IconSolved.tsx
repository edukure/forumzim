interface IconSolvedProps {
    isSolved: boolean;
    className?: string
}

const IconSolved = ({ isSolved, className = '' }: IconSolvedProps) => {
    const color = isSolved ? 'green' : 'gray';
     
    return (
        <div className={`p-2 border-2 text-${color}-400 border-${color}-400 bg-${color}-50 rounded-full ${className}`}>
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
