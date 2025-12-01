const auth_status_evt = "authStatusChanged";

const notifyAuthChange = () => {
    window.dispatchEvent(new Event(auth_status_evt));
};

export const onAuthChange = (callback) => {
    window.addEventListener(auth_status_evt, callback);
    return () => window.removeEventListener(auth_status_evt, callback);
};

export const isLoggedIn = () => {
    const userId = localStorage.getItem("userId");
    return !!userId;
};

export const getUserId = () => {
    return localStorage.getItem("userId");
};

export const setAuthData = (token, userId) => {
    localStorage.setItem("userId", userId);
    notifyAuthChange();
};

export const logout = async () => {
  try {
    await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
  } catch (err) {
    console.error('Logout error:', err);
  }

  localStorage.removeItem("userId");
  notifyAuthChange();
};

export const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.warn('[!] Tentative de fetchUserData sans userId');
        return null;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
    });

    const data = await res.json();

    if (data.success) {
        return data.user;
    } else {
        // expiration / invalid
        if (res.status === 401 || res.status === 403) {
            console.warn('[!] Token invalide ou expiré, déconnexion automatique');
            logout();
            return null;
        }

        console.error('[!] Err de chargement des données:', data.message);
        alert('[!] Err de chargement des données: ' + (data.message || 'Erreur inconnue'));
        return null;
    }
    } catch (err) {
        console.error('[!] Err de connexion au serveur:', err);
        alert('[!] Err de connexion au serveur');
        return null;
    }
};

