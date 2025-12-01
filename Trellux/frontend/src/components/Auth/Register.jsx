import React, { useState } from "react";
import AuthInput from "./shared/AuthInput";
import AuthButton from "./shared/AuthButton";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContext";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [region, setRegion] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const submitAndSend = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    name: lastName,
                    firstname: firstName
                })
            });

            const data = await res.json();
            // console.log('Réponse backend:', data);

            if(data.success) {
                toast.success('Inscription réussie !');
                setTimeout(() => navigate('/login'), 500);
            } else {
                toast.error('Erreur : ' + data.message);
            }

        } catch (err) {
            console.error('Erreur inscription:', err);
            toast.error('Impossible de s’inscrire, vérifie les champs ou le serveur.');
        }
    };


    return (
        <section id="register" className="min-h-screen flex items-start justify-center overflow-hidden pt-16 sm:pt-20 md:pt-28 px-4 bg-white dark:bg-neutral-900">
            <div className="w-full max-w-md px-4 sm:px-6">
                <h1 className="text-black dark:text-neutral-50 text-[24px] sm:text-[32px] font-semibold text-center mb-6 sm:mb-8 tracking-tight">
                Sign up to a new Trellux Account
                </h1>

                <div className="relative h-[200px] mb-6">
                    <form className="space-y-4" onSubmit={submitAndSend}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AuthInput
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                autoFocus
                                showArrow={false}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <AuthInput
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                showArrow={false}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <AuthInput
                            type="text"
                            placeholder="Email"
                            value={email}
                            showArrow={false}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <AuthInput
                            type="birthdate"
                            placeholder="Test"
                            value={birthdate}
                            showArrow={false}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                        <AuthInput
                            type="region"
                            value={region}
                            showArrow={false}
                            onChange={(e) => setRegion(e.target.value)}

                        />
                        <AuthInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            showArrow={false}
                            showTick={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <AuthInput
                            type="password"
                            placeholder="Password confirmation"
                            showArrow={false}
                        />
                        <AuthInput
                            type="phone"
                            placeholder="Phone"
                            value={phoneNumber}
                            showArrow={false}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <AuthButton type="submit">
                            Continue
                        </AuthButton>
                    </form>
                </div>
                <ToastContainer
                    position="top-right"
                    pauseOnHover
                    theme={darkMode ? "dark" : "light"}
                 />
            </div>
        </section>
    );
};

export default Register;