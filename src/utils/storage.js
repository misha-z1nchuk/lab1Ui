import Cookies from 'js-cookie';

export function getLocalStorage(key) {
    try {
        const serializedData = localStorage.getItem(key);

        if (!serializedData) return undefined;

        return JSON.parse(serializedData);
    } catch {
        return undefined;
    }
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

export function setLocalStorage(key, value) {
    try {
        const serializedData = JSON.stringify(value);

        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error(error);
    }
}

export function getSessionStorage(key) {
    try {
        const serializedData = sessionStorage.getItem(key);

        if (!serializedData) return undefined;

        return JSON.parse(serializedData);
    } catch {
        return undefined;
    }
}


export function getCookie(key) {
    try {
        const serializedData = Cookies.get();

        if (!serializedData) return undefined;
    } catch {
        return undefined;
    }
}

export function removeSessionStorage(key) {
    sessionStorage.removeItem(key);
}

export function setSessionStorage(key, value) {
    try {
        const serializedData = JSON.stringify(value);

        sessionStorage.setItem(key, serializedData);
    } catch (error) {
        console.error(error);
    }
}
