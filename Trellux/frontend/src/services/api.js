export const API_URL = 'http://localhost:3000/api'

export const getAuthHeaders = () => {
    return {
        'Content-Type': 'application/json'
    };
};

export const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || 'Req failed');
    }
    return response.json();
}

export const fetchWithCreds = (url, options = {}) => {
    return fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};