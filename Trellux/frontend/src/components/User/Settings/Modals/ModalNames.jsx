import { useState } from "react";
import { userService } from '../../../../services/user/userService';
import { toast } from "react-toastify";

const ModalNames = ({ isOpen, onClose, user, setUser }) => {
    const [firstname, setFirstname] = useState(user?.firstname || '');
    const [lastname, setLastname] = useState(user?.name || '');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.putProfile(user.id, firstname, lastname);
            setUser({
                ...user,
                firstname,
                name: lastname
            });
            toast.success('Nom modifié avec succès !');
            onClose();
        } catch (err) {
            console.log('[!] Erreur dans la mise à jour des infos.', err);
            toast.error('Erreur lors de la mise à jour du nom.');
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/60"
            onClick={onClose}
        >
            <div
                className="bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-[20px] w-[300px] overflow-hidden shadow-xl animate-[scale_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-5">
                        <h3 className="text-[18px] font-bold text-center text-black dark:text-white mb-2 tracking-tight">
                            Modifier le profil
                        </h3>
                        <p className="text-[14px] text-center text-black/50 dark:text-white/50 mb-5 font-medium">
                            Mettez à jour vos informations
                        </p>

                        <div className="space-y-3">
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Prénom"
                                className="w-full px-4 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-xl text-[15px] text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 border-0 focus:outline-none focus:bg-white dark:focus:bg-white/5 shadow-sm"
                            />
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Nom"
                                className="w-full px-4 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-xl text-[15px] text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 border-0 focus:outline-none focus:bg-white dark:focus:bg-white/5 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 px-4 pb-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 active:scale-95 rounded-xl text-[16px] font-semibold text-black/70 dark:text-white/70 transition-all shadow-sm"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0051D5] active:scale-95 rounded-xl text-[16px] font-semibold text-white transition-all shadow-md"
                        >
                            Valider
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalNames;