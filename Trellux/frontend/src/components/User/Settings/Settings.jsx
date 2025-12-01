// ⡴⠒⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠉⠳⡆⠀
// ⣇⠰⠉⢙⡄⠀⠀⣴⠖⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣆⠁⠙⡆
// ⠘⡇⢠⠞⠉⠙⣾⠃⢀⡼⠀⠀⠀⠀⠀⠀⠀⢀⣼⡀⠄⢷⣄⣀⠀⠀⠀⠀⠀⠀⠀⠰⠒⠲⡄⠀⣏⣆⣀⡍
// ⠀⢠⡏⠀⡤⠒⠃⠀⡜⠀⠀⠀⠀⠀⢀⣴⠾⠛⡁⠀⠀⢀⣈⡉⠙⠳⣤⡀⠀⠀⠀⠘⣆⠀⣇⡼⢋⠀⠀⢱
// ⠀⠘⣇⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⡴⢋⡣⠊⡩⠋⠀⠀⠀⠣⡉⠲⣄⠀⠙⢆⠀⠀⠀⣸⠀⢉⠀⢀⠿⠀⢸
// ⠀⠀⠸⡄⠀⠈⢳⣄⡇⠀⠀⢀⡞⠀⠈⠀⢀⣴⣾⣿⣿⣿⣿⣦⡀⠀⠀⠀⠈⢧⠀⠀⢳⣰⠁⠀⠀⠀⣠⠃
// ⠀⠀⠀⠘⢄⣀⣸⠃⠀⠀⠀⡸⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠈⣇⠀⠀⠙⢄⣀⠤⠚⠁⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⢹⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⢘⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⢰⣿⣿⣿⡿⠛⠁⠀⠉⠛⢿⣿⣿⣿⣧⠀⠀⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡀⣸⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⡀⢀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡇⠹⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⡿⠁⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣤⣞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢢⣀⣠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠲⢤⣀⣀⠀⢀⣀⣀⠤⠒⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//              Faut refactoriser shallah

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/auth";
import ModalNames from "./Modals/ModalNames"
import ModalEmails from "./Modals/ModalEmail";
import ModalPassword from "./Modals/ModalPassword";
import {useTheme} from "../../../hooks/useTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
    const navigate = useNavigate();
    const [emailNotifications, setEmailNotifications]   = useState(false);
    const [darkMode, setDarkMode]                       = useTheme();
    const [user, setUser]                               = useState(null);
    const [isModalNameOpen, setModalNameOpen]           = useState(false);
    const [isModalMailOpen, setModalMailOpen]           = useState(false);
    const [isModalPasswordOpen, setModalPasswordOpen]   = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert('Non connecté');
            navigate('/');
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
            });

            const data = await res.json();

            if (data.success) {
            setUser(data.user);
            } else {
            alert('Erreur de chargement des données');
            }
        } catch (err) {
            console.error('Erreur:', err);
            alert('Erreur de connexion au serveur');
        }
        };

    fetchUserData();
  }, [navigate])

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
        logout();
        navigate('/');
        setUser(null);
    } catch (err) {
        console.log("Erreur de déco: ", err);
    }
  }

  const Section = ({ title, children, delay = "0.1s" }) => (
    <div
      className="mb-8 opacity-0 animate-[slideIn_0.4s_ease-out_forwards]"
      style={{ animationDelay: delay }}
    >
      <div className="mb-3 px-2">
        <h2 className="text-[22px] font-semibold text-neutral-800 dark:text-neutral-100">{title}</h2>
      </div>
      <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
        {children}
      </div>
    </div>
  );

  const Divider = () => (
    <div className="mx-5 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-700 to-transparent" />
  );

  const Toggle = ({ checked, onChange }) => (
    <label className="relative inline-block w-[51px] h-[31px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="absolute inset-0 cursor-pointer rounded-full bg-[#e5e5ea] transition-all duration-300 ease-in-out peer-checked:bg-[#34c759]" />
      <span className="absolute left-[2px] bottom-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-[20px]" />
    </label>
  );

  const Item = ({ icon, label, value, description, action, danger, onClick }) => {
    const [pressed, setPressed] = useState(false);

    return (
      <button
        type="button"
        onClick={onClick}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-transform duration-150 ${
          onClick ? "hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer" : ""
        } ${danger ? "text-red-600 dark:text-red-500" : "text-neutral-800 dark:text-neutral-100"}`}
        style={{
          transform: pressed ? "scale(0.98)" : "scale(1)",
        }}
      >
    <div
    className={`flex h-10 w-10 min-w-[40px] items-center justify-center rounded-xl text-white/90 ${
        danger
        ? "bg-gradient-to-br from-[#ff3b30] to-[#d32f2f]"
        : "bg-gradient-to-br from-[#007aff] to-[#0051d5]"
    } shadow-md`}
    >
    {icon}
    </div>

        <div className="flex-1 min-w-0">
          <div className={`text-[17px] font-medium ${danger ? "text-[#ff3b30] dark:text-red-500" : ""}`}>
            {label}
          </div>
          {value && (
            <div className="text-[15px] text-neutral-500 dark:text-neutral-400 truncate">{value}</div>
          )}
          {description && (
            <div className="text-[14px] text-neutral-500 dark:text-neutral-400 mt-[2px]">
              {description}
            </div>
          )}
        </div>

        <div className="flex items-center text-neutral-400 dark:text-neutral-500">{action}</div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef2f6] dark:from-neutral-900 dark:to-neutral-800 py-10 px-5 font-sans text-neutral-800 dark:text-neutral-100">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="pt-12 text-[42px] font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Paramètres
          </h1>
          <p className="text-[17px] text-neutral-500 dark:text-neutral-400">
            Gérez vos préférences et votre compte
          </p>
        </div>

        {/* Section Profil */}
        <Section title="Profil" delay="0.1s">
          <Item
            onClick={() => setModalNameOpen(true)}
            icon={<i className="fa-regular fa-user text-red text-lg" />}
            label="Nom d'utilisateur"
            value={user?.firstname + ' ' + user?.name || "Non connecté"}
          />
          <Divider />
          <Item
            onClick={() => setModalMailOpen(true)}
            icon={<i className="fa-regular fa-envelope text-white text-lg" />}
            label="Email"
            value={user?.email || "Non configuré"}
          />
        </Section>

        {/* Notifications */}
        <Section title="Notifications" delay="0.2s">

          <Item
            icon={<i className="fa-regular fa-envelope-open text-white text-lg" />}
            label="Notifications par email"
            description="Recevoir des mises à jour par email"
            action={
              <Toggle
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
            }
          />
        </Section>

        {/* Apparence */}
        <Section title="Apparence" delay="0.3s">
          <Item
            icon={<i className={`${darkMode ? 'fa-solid fa-moon' : 'fa-regular fa-sun'} text-white text-lg`} />}
            label="Mode sombre"
            description={darkMode ? "Thème sombre activé" : "Thème clair activé"}
            action={
              <Toggle
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            }
          />
          {/* <Divider /> */}
        </Section>

        {/* Compte */}
        <Section title="Compte" delay="0.4s">
          <Item
            icon={<i className="fa-solid fa-key text-white text-lg" />}
            label="Changer le mot de passe"
            onClick={() => setModalPasswordOpen(true)}
          />
          <Divider />
          <Item
            icon={<i className="fa-solid fa-right-from-bracket text-white text-lg" />}
            label="Se déconnecter"
            danger
            onClick={handleLogout}
          />
        </Section>

        {/* Footer */}
        <div className="text-center mt-10 text-neutral-500 dark:text-neutral-400 text-sm">
          <p>eTodo Version 1.0.0</p>
          <p>© 2024 Tous droits réservés</p>
        </div>
      </div>

    <ModalNames
        isOpen={isModalNameOpen}
        onClose={() => setModalNameOpen(false)}
        user={user}
        setUser={setUser}
    />
    <ModalEmails
        isOpen={isModalMailOpen}
        onClose={() => setModalMailOpen(false)}
        user={user}
        setUser={setUser}
    />

    <ModalPassword
      isOpen={isModalPasswordOpen}
      onClose={() => setModalPasswordOpen(false)}
      user={user}
      setUser={setUser}
    />

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkMode ? "dark" : "light"}
    />

    </div>
  );
};

export default Settings;
