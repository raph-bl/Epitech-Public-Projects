import { API_URL, fetchWithCreds, handleResponse } from '../api'

export const projectService = {
    // get all projects
    async getAll() {
        const response = await fetchWithCreds(`${API_URL}/projects`);
        return handleResponse(response);
    },

    async create(title) {
        const response = await fetchWithCreds(`${API_URL}/projects`, {
            method: 'POST',
            body: JSON.stringify({ title })
        });
        return handleResponse(response);
    },

    async delete(id) {
        const response = await fetchWithCreds(`${API_URL}/projects/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(response);
    },

    async update(id, data) {
        const response = await fetchWithCreds(`${API_URL}/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    }
}