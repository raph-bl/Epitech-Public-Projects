import { API_URL, fetchWithCreds, handleResponse } from '../api';

export const taskService = {

    // get task of a project
    async getByProject(projectId) {
        const url = `${API_URL}/todos/project/${projectId}`;
        const response = await fetchWithCreds(url, {
            method: "GET"
        });
        const data = await handleResponse(response);
        return data;
    },

    // getUserTasks
    async getByUser(userId) {
        const response = await fetchWithCreds(`${API_URL}/users/getUserTasks/${userId}`, {
            method: "GET"
        });
        return handleResponse(response);
    },

    async create(projectId, taskData) {
        const bodyData = Object.assign({}, taskData, { project_id: projectId });
        // console.log(bodyData);
        const response = await fetchWithCreds(`${API_URL}/todos`, {
            method: "POST",
            body: JSON.stringify(bodyData)
        });
        return handleResponse(response);
    },

    async update(taskId, taskData) {

        const response = await fetchWithCreds(`${API_URL}/todos/${taskId}`, {
            method: "PUT",
            body: JSON.stringify(taskData)
        });
        return handleResponse(response);
    },

    async delete(taskId) {
        const response = await fetchWithCreds(`${API_URL}/todos/${taskId}`, {
            method: "DELETE"
        });
        return handleResponse(response);
    },
};
