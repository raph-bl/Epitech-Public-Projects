import React, { useState } from "react";

const Add = ({ title, onAdd }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [cardTitle, setCardTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardTitle.trim()) {
            onAdd({
                title: cardTitle
            });
            setCardTitle("");
            setIsFormOpen(false);
        }
    };

    const handleCancel = () => {
        setCardTitle("");
        setIsFormOpen(false);
    };

    if (isFormOpen) {
        return (
            <div className="apple-card bg-white dark:bg-neutral-800 p-5 w-full border-2 border-gray-300 dark:border-neutral-600 flex flex-col min-h-[200px]">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <input
                        type="text"
                        placeholder="Titre de la carte"
                        value={cardTitle}
                        onChange={(e) => setCardTitle(e.target.value)}
                        className="apple-input w-full mb-4 px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-neutral-700 text-gray-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-500"
                        autoFocus
                    />
                    <div className="flex gap-2 mt-auto">
                        <button
                            type="submit"
                            className="apple-button flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-3 text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                        >
                            Ajouter
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="apple-button flex-1 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-200 py-2 px-3 text-sm hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div
            onClick={() => setIsFormOpen(true)}
            className="apple-card bg-white dark:bg-neutral-800 border-2 border-dashed border-gray-300 dark:border-neutral-600 p-5 hover:shadow-lg dark:hover:shadow-neutral-900/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 w-full cursor-pointer flex items-center justify-center min-h-[200px]"
        >
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                    {title || "Ajouter une carte"}
                </h3>
            </div>
        </div>
    );
};

export default Add;