import React, { useState } from "react";
import AuthInput from "./shared/AuthInput";
import AuthButton from "./shared/AuthButton";
import AuthFormStep from "./shared/AuthFormStep";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../../utils/auth";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState("email");
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const handleContinue = (e) => {
        e.preventDefault();
        if (step === "email" && email.trim()) {
            setStep("password");
        }
    };

    const handleBack = () => {
        setStep("email");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Login:", { email, password });

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            // console.log('Réponse backend:', data);

            if (data.success) {
                setAuthData(data.token, data.userId);
                toast.success("Login réussie!");
                setTimeout(() => navigate('/dashboard'), 500);
            } else {
                alert('err: ' + data.message);
            }

        } catch (err) {
            console.error("Erreur de connexion : ", err);
            toast.error('Impossible de se connecter, vérifie le serveur ou les champs');
        }
    };

    return (
        <section id="login" className="min-h-screen flex items-center justify-center overflow-hidden py-12 px-4 bg-white dark:bg-[#0D0D0F] transition-colors">
            <div className="w-full max-w-md px-4 sm:px-6">

                <div className="flex justify-center mb-8">
                    <div className="flex gap-2">
                        <img src="./trellux.png" alt = "logo_trellux" className="w-14 dark:brightness-90"/>
                    </div>
                </div>

                <h1 className="text-black dark:text-white text-[24px] sm:text-[32px] font-semibold text-center mb-6 sm:mb-8 tracking-tight">
                    Sign in with Trellux Account
                </h1>

                {/* Forms Container */}
                <div className="relative h-[200px] mb-4">
                    {/* Email */}
                    <AuthFormStep isActive={step === "email"} direction="left">
                        <form onSubmit={handleContinue} className="space-y-4">
                            <AuthInput
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email or Phone Number"
                                autoFocus
                            />

                            <AuthButton type="submit" disabled={!email.trim()}>
                                Continue
                            </AuthButton>
                        </form>
                    </AuthFormStep>

                    {/* Password Form */}
                    <AuthFormStep isActive={step === "password"} direction="right">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Back Button & Email Display */}
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex items-center gap-2 text-[#06c] hover:underline mb-4 text-[15px] dark:text-[#4DA3FF]"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                {email}
                            </button>

                            <AuthInput
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                autoFocus
                            />

                            <AuthButton type="submit" disabled={!password.trim()}>
                                Sign In
                            </AuthButton>
                        </form>
                    </AuthFormStep>
                </div>

                {/* Footer Links */}
                <div className="flex flex-col items-center gap-4 text-[14px]">
                    <button type="button" className="text-[#06c] hover:underline dark:text-[#4DA3FF]">
                        Forgot Trellux ID or password?
                    </button>
                    <button type="button" className="text-[#06c] hover:underline dark:text-[#4DA3FF]">
                        Don't have a Trellux account? Create yours now.
                    </button>
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

export default Login;
