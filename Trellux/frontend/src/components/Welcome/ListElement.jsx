import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const ListElement = ({ to, href, children }) => {
    const [darkMode] = useTheme();
    const linkClasses = `no-underline text-[12px] font-normal transition-all duration-200 ${
        darkMode
            ? 'text-[#f5f5f7] hover:text-[#2997ff]'
            : 'text-[#1d1d1f] hover:text-[#06c]'
    }`;

    return (
        <li>
            {to ? (
                <Link to={to} className={linkClasses}>
                    {children}
                </Link>
            ) : (
                <a href={href} className={linkClasses}>
                    {children}
                </a>
            )}
        </li>
    );
};

export default ListElement;