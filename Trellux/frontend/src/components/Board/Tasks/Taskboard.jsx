import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../Card/TaskCard";
import Add from "../../Card/Add";
import { taskService } from "../../../services/tasks/taskService";
import { boardService } from "../../../services/boards/boardService";

const Taskboard = () => {
    const { projectId } = useParams();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projectName, setProjectName] = useState("");

    const addCard = async (cardData) => {
        try {
            const result = await boardService.create(projectId, {
                title: cardData.title
            });

            const newCard = {
                id: result.boardId,
                title: cardData.title,
                tasks: []
            };
            setCards([...cards, newCard]);
        } catch (err) {
            console.error("[!] Erreur création board:", err);
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await boardService.delete(cardId);
            setCards(cards.filter(card => card.id !== cardId));
        } catch (err) {
            console.error("[!] Erreur suppression board:", err);
        }
    };

    const handleAddTask = async (cardId, taskText, priority = 'normal') => {
        try {
            const newTask = await taskService.create(projectId, {
                title: taskText,
                board_id: cardId,
                priority: priority,
                dueTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });

            setCards(prevCards =>
                prevCards.map(card => {
                    if (card.id === cardId) {
                        return {
                            ...card,
                            tasks: [
                                ...card.tasks,
                                { id: newTask.todoId, text: taskText, completed: false, priority: priority }
                            ]
                        };
                    }
                    return card;
                })
            );
        } catch (err) {
            console.error("[!] Erreur ajout tâche :", err);
        }
    };

    const handleToggleTask = async (cardId, taskId) => {
        try {
            const card = cards.find(c => c.id === cardId);
            const task = card?.tasks.find(t => t.id === taskId);

            if (!task) return;

            const newStatus = task.completed ? 'not started' : 'done';

            await taskService.update(taskId, {
                status: newStatus
            });

            setCards(prevCards =>
                prevCards.map(card => {
                    if (card.id === cardId) {
                        return {
                            ...card,
                            tasks: card.tasks.map(t =>
                                t.id === taskId
                                    ? { ...t, completed: !t.completed }
                                    : t
                            )
                        };
                    }
                    return card;
                })
            );
        } catch (err) {
            console.error("[!] Erreur toggle tâche:", err);
        }
    };

    const handleDeleteTask = async (cardId, taskId) => {
        try {
            await taskService.delete(taskId);

            setCards(prevCards =>
                prevCards.map(card => {
                    if (card.id === cardId) {
                        return {
                            ...card,
                            tasks: card.tasks.filter(t => t.id !== taskId)
                        };
                    }
                    return card;
                })
            );
        } catch (err) {
            console.error("[!] Erreur suppression tâche:", err);
        }
    };

    const handleUpdateTaskPriority = async (cardId, taskId, newPriority) => {
        setCards(prevCards =>
            prevCards.map(card => {
                if (card.id === cardId) {
                    return {
                        ...card,
                        tasks: card.tasks.map(t =>
                            t.id === taskId
                                ? { ...t, priority: newPriority }
                                : t
                        )
                    };
                }
                return card;
            })
        );
        try {
            const result = await taskService.update(taskId, {
                priority: newPriority
            });
            console.log('[*] Priority update result:', result);
        } catch (err) {
            console.error("[!] Erreur mise à jour priorité:", err);
        }
    };
    
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                setLoading(true);
                const result = await boardService.getByProject(projectId);
                const fetchedProjectName = result.project?.title || `Projet #${projectId}`;

                setProjectName(fetchedProjectName);

                setCards(result.boards.map(board => ({
                    id: board.id,
                    title: board.title,
                    tasks: board.todos.map(task => ({
                        id: task.id,
                        text: task.title,
                        completed: task.status === 'done',
                        priority: task.priority || 'normal'
                    }))
                })));
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les boards du projet.");
            } finally {
                setLoading(false);
            }
        };

        fetchBoards();
    }, [projectId]);

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
                <p className="text-gray-700 dark:text-neutral-300">Chargement des tâches…</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
                <p className="text-red-600 dark:text-red-400">{error}</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-16 px-4 bg-gray-50 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8 dark:text-neutral-50">
                    Projet '{projectName}' — Tâches
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            cardId={card.id}
                            title={card.title}
                            tasks={card.tasks}
                            onAddTask={handleAddTask}
                            onToggleTask={handleToggleTask}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTaskPriority={handleUpdateTaskPriority}
                            onDelete={() => handleDeleteCard(card.id)}
                        />
                    ))}
                    <Add title = "Ajouter une nouvelle carte" onAdd={addCard}/>
                </div>
            </div>
        </section>
    );
};

export default Taskboard;
