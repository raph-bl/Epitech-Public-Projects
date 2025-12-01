import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="bg-white dark:bg-neutral-900 font-['SF_Pro'] antialiased overflow-hidden">
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-900">
                <div className="relative z-10 max-w-[980px] mx-auto px-4 sm:px-6 text-center py-20 sm:py-28 md:py-32">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-[-0.015em] text-gray-900 dark:text-neutral-50 leading-[1.05] mb-4 animate-fadeIn">
                        Trellux
                    </h1>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-neutral-100 mb-3 tracking-[-0.015em] leading-tight">
                        Organize everything.
                    </p>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-500 dark:text-neutral-400 mb-8 sm:mb-12 tracking-[-0.015em] leading-tight">
                        Accomplish anything.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                        <Link
                            to="/register"
                            className="text-[#06c] dark:text-blue-400 hover:underline text-[21px] font-normal"
                        >
                            Get started →
                        </Link>
                    </div>
                </div>

                {/* Scroll Down Button */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="w-9 h-14 rounded-full border-2 border-gray-400 dark:border-neutral-600 flex items-start justify-center pt-2 hover:border-gray-600 dark:hover:border-neutral-400 transition-colors group"
                        aria-label="Scroll down"
                    >
                        <div className="w-1 h-2 bg-gray-400 dark:bg-neutral-600 rounded-full animate-scrollDown group-hover:bg-gray-600 dark:group-hover:bg-neutral-400"></div>
                    </button>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-16 sm:py-24 md:py-40 bg-[#fbfbfd] dark:bg-neutral-800 border-t border-b border-gray-200 dark:border-neutral-700">
                <div className="max-w-[980px] mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16 sm:mb-24">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.015em] text-gray-900 dark:text-neutral-50 mb-4 sm:mb-5 leading-tight">
                            Intelligence meets simplicity.
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-neutral-300 font-normal max-w-[600px] mx-auto leading-[1.4]">
                            Advanced algorithms that understand your workflow and organize tasks automatically.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-[900px] mx-auto">
                        <div className="text-center">
                            <div className="mb-5">
                                <svg className="w-12 h-12 text-gray-900 dark:text-neutral-100 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-50 mb-2 tracking-tight">
                                Fast
                            </h3>
                            <p className="text-[17px] text-gray-600 dark:text-neutral-400 leading-[1.5] font-normal">
                                Instant sync across all your devices.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mb-5">
                                <svg className="w-12 h-12 text-gray-900 dark:text-neutral-100 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-50 mb-2 tracking-tight">
                                Private
                            </h3>
                            <p className="text-[17px] text-gray-600 dark:text-neutral-400 leading-[1.5] font-normal">
                                End-to-end encrypted. Your data stays yours.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mb-5">
                                <svg className="w-12 h-12 text-gray-900 dark:text-neutral-100 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-50 mb-2 tracking-tight">
                                Collaborative
                            </h3>
                            <p className="text-[17px] text-gray-600 dark:text-neutral-400 leading-[1.5] font-normal">
                                Work seamlessly with your team.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlight Section */}
            <section className="py-16 sm:py-24 md:py-40 bg-white dark:bg-neutral-900">
                <div className="max-w-[980px] mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-neutral-50 mb-4 sm:mb-6 tracking-[-0.015em] leading-tight">
                        Designed for everyone.
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-neutral-300 font-normal max-w-[700px] mx-auto leading-[1.4] mb-12 sm:mb-16">
                        From solo entrepreneurs to Fortune 500 teams. Trellux adapts to the way you work.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 max-w-[800px] mx-auto text-left">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-neutral-50 mb-3 tracking-tight">For individuals</h3>
                            <p className="text-[17px] text-gray-600 dark:text-neutral-400 leading-[1.5] font-normal mb-4">
                                Stay organized with smart lists that prioritize your day. Set reminders, track habits, and achieve your personal goals.
                            </p>
                            <a href="#personal" className="text-[#06c] dark:text-blue-400 hover:underline text-[17px] font-normal">
                                Learn more →
                            </a>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-neutral-50 mb-3 tracking-tight">For teams</h3>
                            <p className="text-[17px] text-gray-600 dark:text-neutral-400 leading-[1.5] font-normal mb-4">
                                Collaborate in real-time. Assign tasks, set deadlines, and track project progress with complete transparency.
                            </p>
                            <a href="#teams" className="text-[#06c] dark:text-blue-400 hover:underline text-[17px] font-normal">
                                Learn more →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Section */}
            <section className="py-16 sm:py-24 md:py-40 bg-[#fbfbfd] dark:bg-neutral-800 border-t border-b border-gray-200 dark:border-neutral-700">
                <div className="max-w-[980px] mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-neutral-50 mb-4 sm:mb-5 tracking-[-0.015em] leading-tight">
                        Everywhere you are.
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-neutral-300 font-normal max-w-[650px] mx-auto mb-12 sm:mb-20 leading-[1.4]">
                        Native apps for all your devices. Your tasks, always in sync.
                    </p>
                    <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-12 flex-wrap text-sm text-gray-500 dark:text-neutral-400">
                        <span className="font-normal">iPhone</span>
                        <span className="font-normal">iPad</span>
                        <span className="font-normal">Mac</span>
                        <span className="font-normal">Apple Watch</span>
                        <span className="font-normal">Web</span>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-16 sm:py-24 md:py-40 bg-white dark:bg-neutral-900">
                <div className="max-w-[640px] mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-gray-900 dark:text-neutral-50 mb-4 sm:mb-6 tracking-[-0.015em] leading-tight">
                        Start organizing today.
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-neutral-300 font-normal mb-8 sm:mb-10 leading-[1.4]">
                        Free for 14 days. No credit card required.
                    </p>
                    <Link
                        to="/register"
                        className="text-[#06c] dark:text-blue-400 hover:underline text-lg sm:text-[21px] font-normal"
                    >
                        Get started →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-neutral-700 py-5 bg-white dark:bg-neutral-900">
                <div className="max-w-[980px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[12px] text-gray-500 dark:text-neutral-400">
                        <p className="font-normal text-center md:text-left">Copyright © 2025 Trellux Inc. All rights reserved.</p>
                        <div className="flex gap-4 sm:gap-5">
                            <a href="#privacy" className="hover:text-gray-900 dark:hover:text-neutral-100 transition-colors font-normal">Privacy Policy</a>
                            <a href="#terms" className="hover:text-gray-900 dark:hover:text-neutral-100 transition-colors font-normal">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scrollDown {
                    0% {
                        opacity: 0;
                        transform: translateY(0);
                    }
                    40% {
                        opacity: 1;
                    }
                    80% {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .animate-scrollDown {
                    animation: scrollDown 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
                }

                /* Hide scrollbar for Chrome, Safari and Opera */
                ::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                * {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default Welcome;