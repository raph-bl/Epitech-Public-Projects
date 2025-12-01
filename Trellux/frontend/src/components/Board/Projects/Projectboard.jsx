import { useState, useEffect } from 'react';
import { projectService } from '../../../services/projects/projectService';
import ProjectCard from "../../Card/ProjectCard";
import AddButton from "../../Buttons/AddButton"

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [draggedProjectId, setDraggedProjectId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await projectService.getAll();
            setProjects(data);
        } catch (err) {
            console.error('Err fetching projects', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleAddProject = async () => {
        if (!newProjectTitle.trim()) {
            return;
        }

        try {
            await projectService.create(newProjectTitle);
            await fetchProjects();
            setNewProjectTitle('');
            setShowModal(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
        setNewProjectTitle('');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewProjectTitle('');
    };

    const handleDeleteProject = async (id) => {
        try {
            await projectService.delete(id);
            await fetchProjects();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDragStart = (e, projectId) => {
        setDraggedProjectId(projectId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnd = () => {
        setDraggedProjectId(null)
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, targetProjectId) => {
        e.preventDefault();

        const draggedIndex = projects.findIndex(p => p.id === draggedProjectId);
        const targetIndex = projects.findIndex(p => p.id === targetProjectId);

        if (draggedProjectId === targetProjectId || draggedIndex === -1 || targetIndex === -1) return;
        
        const newProjects = [...projects];
        const draggedProject = newProjects[draggedIndex];

        newProjects.splice(draggedIndex, 1);
        newProjects.splice(targetIndex, 0, draggedProject);

        setProjects(newProjects);
        setDraggedProjectId(null);
    };

    const handleUpdateProject = (updatedProject) => {
        setProjects(projects.map(project =>
            project.id === updatedProject.id ? updatedProject : project
        ));
    };
    
    if (loading) {
        return (
            <section className="min-h-screen py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
                <p className="text-gray-600 dark:text-neutral-300">Loading projects...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
                <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            </section>
        );
    }

    return (
        <section id="dashboard" className="min-h-screen py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-neutral-50 tracking-tight">Your projects</h1>
                    <div className="scale-75 origin-right transition-transform hover:scale-[0.78] duration-200">
                        <AddButton onClick={handleOpenModal}>Add</AddButton>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 pb-2">
                    {projects.length === 0 ? (
                        <p className="text-gray-500 dark:text-neutral-400 col-span-full text-center py-8">No projects yet. Create your first one!</p>
                    ) : (
                        projects.map(project => (
                            <div
                                key={project.id}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, project.id)}
                                className="transition-all duration-200"
                            >
                                <ProjectCard
                                    cardId={project.id}
                                    title={project.title}
                                    image={project.image}
                                    project={project}
                                    linkTo={`/board/${project.id}`}
                                    onDelete={() => handleDeleteProject(project.id)}
                                    onUpdate={handleUpdateProject}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    isDragging={draggedProjectId === project.id}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-50 mb-4">Create New Project</h2>

                        <input
                            type="text"
                            placeholder="Project title"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddProject()}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 mb-4 bg-white dark:bg-neutral-700 text-gray-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-400"
                            autoFocus
                        />

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-700 dark:text-neutral-200 bg-gray-100 dark:bg-neutral-700 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProject}
                                disabled={!newProjectTitle.trim()}
                                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
export default Dashboard;