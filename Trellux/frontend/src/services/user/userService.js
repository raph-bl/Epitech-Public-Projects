import { API_URL, fetchWithCreds, handleResponse } from '../api'

export const userService = {
    async putProfile(userId, firstname, lastname) {
        const response = await fetchWithCreds(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({firstname, name: lastname})
        });
        return handleResponse(response);
    },

    async putEmail(userId, email) {
        const response = await fetchWithCreds(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({email})
        });
        return handleResponse(response);
    },

    async putPassword(userId, password) {
        const response = await fetchWithCreds(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({password})
        });
        return handleResponse(response);
    }
}