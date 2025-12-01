import { API_URL, fetchWithCreds, handleResponse } from '../api';

export const boardService = {
    // get boards of a project with their tasks
    async getByProject(projectId) {
        const url = `${API_URL}/boards/project/${projectId}`;
        const response = await fetchWithCreds(url, {
            method: "GET"
        });

        const data = await handleResponse(response);
        return data;
    },

    async create(projectId, boardData) {
        const bodyData = {
            project_id: projectId,
            title: boardData.title,
            position: boardData.position
        };

        const response = await fetchWithCreds(`${API_URL}/boards`, {
            method: "POST",
            body: JSON.stringify(bodyData)
        });
        return handleResponse(response);
    },

    async update(boardId, boardData) {
        const response = await fetchWithCreds(`${API_URL}/boards/${boardId}`, {
            method: "PUT",
            body: JSON.stringify(boardData)
        });
        return handleResponse(response);
    },

    async delete(boardId) {
        const response = await fetchWithCreds(`${API_URL}/boards/${boardId}`, {
            method: "DELETE"
        });
        return handleResponse(response);
    },
};
