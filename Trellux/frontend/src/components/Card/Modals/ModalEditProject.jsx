import { useState, useEffect } from "react";
import { projectService } from '../../../services/projects/projectService';

const ModalEditProject = ({ isOpen, onClose, project, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && project) {
            setTitle(project.title || '');
            setImage(project.image || '');
        }
    }, [isOpen, project]);

    if (!isOpen) return null;

    if (!project) {
        console.error('[!] Aucun projet fourni au modal');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            console.error('[!] Le titre est requis');
            alert('Le titre du projet est requis');
            return;
        }

        setIsSubmitting(true);

        try {
            // console.log('[*] maj', { id: project.id, title, image });
            const updateData = { title };

            if (image && image.trim()) {
                updateData.image = image;
            }

            await projectService.update(project.id, updateData);

            onUpdate({
                ...project,
                title,
                image: image || project.image
            });

            onClose();
        } catch (err) {
            console.error('[!] Erreur dans la mise à jour du projet:', err);
            alert('Erreur lors de la mise à jour du projet');
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/60"
            onClick={onClose}
        >
            <div
                className="bg-[#F2F2F7] dark:bg-neutral-800 rounded-[20px] w-[300px] overflow-hidden shadow-xl animate-[scale_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-5">
                        <h3 className="text-[18px] font-bold text-center text-black dark:text-neutral-50 mb-2 tracking-tight">
                            Modifier le projet
                        </h3>
                        <p className="text-[14px] text-center text-black/50 dark:text-neutral-400 mb-5 font-medium">
                            Mettez à jour les informations du projet
                        </p>

                        <div className="space-y-3">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Nom du projet"
                                className="w-full px-4 py-3 bg-white/80 dark:bg-neutral-700 backdrop-blur-sm rounded-xl text-[15px] text-black dark:text-neutral-50 placeholder:text-black/40 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:bg-white dark:focus:bg-neutral-600 shadow-sm"
                            />
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="URL de l'image"
                                className="w-full px-4 py-3 bg-white/80 dark:bg-neutral-700 backdrop-blur-sm rounded-xl text-[15px] text-black dark:text-neutral-50 placeholder:text-black/40 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:bg-white dark:focus:bg-neutral-600 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 px-4 pb-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-white/60 dark:bg-neutral-700 hover:bg-white/80 dark:hover:bg-neutral-600 active:scale-95 rounded-xl text-[16px] font-semibold text-black/70 dark:text-neutral-200 transition-all shadow-sm"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !title.trim()}
                            className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0051D5] active:scale-95 rounded-xl text-[16px] font-semibold text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'En cours...' : 'Valider'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditProject;