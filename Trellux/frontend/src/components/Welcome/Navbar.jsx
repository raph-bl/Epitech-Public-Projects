import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListElement from "./ListElement";
import { fetchUserData, isLoggedIn, onAuthChange } from "../../utils/auth";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [initials, setInitials] = useState("JL");
    const [darkMode] = useTheme();

    useEffect(() => {
        const loadUserData = async () => {
            if (loggedIn) {
                const user = await fetchUserData();
                if (user && user.name) {
                    const nameParts = user.name.split(' ');
                    const firstNameParts = user.firstname.split(' ');

                    const firstInitial = nameParts[0]?.charAt(0).toUpperCase();
                    const lastInitial = firstNameParts[0]?.charAt(0).toUpperCase();
                    
                    setInitials(lastInitial + firstInitial);
                }
            }
        };

        loadUserData();
    }, [loggedIn]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthChange(() => {
            setLoggedIn(isLoggedIn());
        });

        return unsubscribe;
    }, []);

    return (
    <nav
      className={`navbar fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        darkMode
          ? scrolled
            ? 'bg-[rgba(30,30,30,0.72)] backdrop-blur-[20px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)]'
            : 'bg-[rgba(30,30,30,0.8)] backdrop-blur-[20px] shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
          : scrolled
            ? 'bg-[rgba(251,251,253,0.72)] backdrop-blur-[20px] shadow-[0_1px_0_0_rgba(0,0,0,0.1)]'
            : 'bg-[rgba(251,251,253,0.8)] backdrop-blur-[20px] shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="navbar-inner max-w-[980px] mx-auto px-6 md:px-8 flex justify-between items-center h-11">
        <Link
          to="/"
          className={`logo text-[21px] font-semibold no-underline transition-all duration-200 hover:opacity-70 ${
            darkMode ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
          }`}
        >
          Trellux
        </Link>
        <ul className="nav-menu hidden md:flex gap-8 list-none m-0 p-0 items-center">
          {loggedIn ? (
            <>
                <ListElement to="/dashboard">Dashboard</ListElement>
                <Link to = "/settings">
                <li className="flex items-center">
                    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-xs text-gray-600 dark:text-gray-300">{initials}</span>
                    </div>
                </li>
            </Link>
            </>
          ) : (
            <>
              <ListElement to="/login">Login</ListElement>
              <ListElement to="/register">Register</ListElement>
            </>
          )}
        </ul>

        <div
          className="hamburger md:hidden flex flex-col gap-[4px] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-[18px] h-[1px] transition-all duration-300 ${
            darkMode ? 'bg-[#f5f5f7]' : 'bg-[#1d1d1f]'
          } ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
          <span className={`w-[18px] h-[1px] transition-all duration-300 ${
            darkMode ? 'bg-[#f5f5f7]' : 'bg-[#1d1d1f]'
          } ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-[18px] h-[1px] transition-all duration-300 ${
            darkMode ? 'bg-[#f5f5f7]' : 'bg-[#1d1d1f]'
          } ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;