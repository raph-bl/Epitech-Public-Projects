import React, { useState, useEffect, useRef } from "react";

const Card = ({ cardId, title, tasks = [], onDelete, onAddTask, onToggleTask, onDeleteTask, onUpdateTaskPriority }) => {
    const [newTaskText, setNewTaskText] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState("normal");
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [editingPriorityTaskId, setEditingPriorityTaskId] = useState(null);
    const dropdownRef = useRef(null);

    const priorityConfig = {
        low: { label: 'Basse', color: 'bg-gray-500 dark:bg-gray-600' },
        normal: { label: 'Normale', color: 'bg-blue-500 dark:bg-blue-600' },
        high: { label: 'Haute', color: 'bg-orange-500 dark:bg-orange-600' },
        urgent: { label: 'Urgente', color: 'bg-red-500 dark:bg-red-600' }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTaskText.trim()) {
            onAddTask(cardId, newTaskText, newTaskPriority);
            setNewTaskText("");
            setNewTaskPriority("normal");
            setIsAddingTask(false);
        }
    };

    const handlePriorityChange = async (taskId, newPriority) => {
        setEditingPriorityTaskId(null);
        if (onUpdateTaskPriority) {
            await onUpdateTaskPriority(cardId, taskId, newPriority);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setEditingPriorityTaskId(null);
            }
        };

        if (editingPriorityTaskId !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingPriorityTaskId]);

    return (
        <div className="apple-card bg-white dark:bg-neutral-800 p-5 hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-200 w-full border border-gray-200 dark:border-neutral-700 flex flex-col min-h-[200px]">
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-neutral-50">
                    {title}
                </h3>
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 rounded-apple-xs p-1 hover:bg-red-50 dark:hover:bg-red-900/30"
                        aria-label="Delete card"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="space-y-2.5 flex-1">
                {tasks.map(task => (
                    <div key={task.id} className="flex items-start gap-2.5 group">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(cardId, task.id)}
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer bg-white dark:bg-neutral-700"
                        />
                        <div className="flex-1 flex items-center gap-2 nth-last-3:mb-10">
                            <span className={`flex-1 text-[15px] leading-relaxed ${task.completed ? 'line-through text-gray-400 dark:text-neutral-500' : 'text-gray-700 dark:text-neutral-300'}`}>
                                {task.text}
                            </span>
                            {task.priority && (
                                <div className="relative" ref={editingPriorityTaskId === task.id ? dropdownRef : null}>
                                    {editingPriorityTaskId === task.id ? (
                                        <div className="absolute right-0 top-0 z-20 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-700 py-1 min-w-[130px] animate-fadeIn">
                                            {Object.entries(priorityConfig).map(([key, config]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => handlePriorityChange(task.id, key)}
                                                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-700 first:rounded-t-lg last:rounded-b-lg ${
                                                        task.priority === key ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                                    }`}
                                                >
                                                    <span className={`w-2.5 h-2.5 rounded-full ${config.color} shadow-sm`}></span>
                                                    <span className="text-gray-900 dark:text-neutral-50">{config.label}</span>
                                                    {task.priority === key && (
                                                        <svg className="ml-auto h-3 w-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingPriorityTaskId(task.id);
                                            }}
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white cursor-pointer hover:opacity-80 hover:shadow-md transition-all ${priorityConfig[task.priority]?.color || priorityConfig.normal.color}`}
                                        >
                                            {priorityConfig[task.priority]?.label || priorityConfig.normal.label}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => onDeleteTask(cardId, task.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 rounded p-0.5 hover:bg-red-50 dark:hover:bg-red-900/30"
                            aria-label="Delete task"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                {isAddingTask ? (
                    <form onSubmit={handleAddTask}>
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="Nouvelle tâche..."
                            className="apple-input w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 mb-2 bg-white dark:bg-neutral-700 text-gray-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-500"
                            autoFocus
                        />
                        <select
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value)}
                            className="apple-input w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 mb-2 bg-white dark:bg-neutral-700 text-gray-900 dark:text-neutral-50"
                        >
                            <option value="low">Basse</option>
                            <option value="normal">Normale</option>
                            <option value="high">Haute</option>
                            <option value="urgent">Urgente</option>
                        </select>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="apple-button flex-1 bg-blue-600 dark:bg-blue-500 text-white py-1.5 px-3 text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                            >
                                Ajouter
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAddingTask(false);
                                    setNewTaskText("");
                                    setNewTaskPriority("normal");
                                }}
                                className="apple-button flex-1 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-200 py-1.5 px-3 text-sm hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsAddingTask(true)}
                        className="w-full text-left text-sm text-gray-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 rounded p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Ajouter une tâche
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;