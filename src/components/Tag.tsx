interface TagProps {
    href: string;
    children: React.ReactNode;
    color?: string; // type this later
}

const Tag = ({href, children}: TagProps) => {

    return(
        <a
        href={'https://cursos.alura.com.br/' + href}
        target="_blank"
        className="inline-block rounded-full text-white bg-red-400 hover:bg-red-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100">
        {children}
    </a>
    );
}

export default Tag;