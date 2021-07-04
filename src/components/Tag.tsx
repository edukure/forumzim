interface TagProps {
    href: string;
    children: React.ReactNode;
    color?: string; // type this later
    className?: string;
}

const Tag = ({ href, color, className = '', children }: TagProps) => {
    const bgColor = color ? `bg-${color}-400` : 'bg-red-400';
    const hoverBgColor = color ? `hover:bg-${color}-500` : 'hover:bg-red-500';

    return (
        <a
            href={'https://cursos.alura.com.br/' + href}
            target="_blank"
            className={`inline-block rounded-full text-white ${bgColor} ${hoverBgColor} duration-300 text-xs font-bold px-4 py-1 opacity-90 hover:opacity-100 ${className}`}>
            {children}
        </a>
    );
};

export default Tag;
