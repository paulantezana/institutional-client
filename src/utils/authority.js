import decoder from 'jwt-decode';
// use localStorage to store the authority info, which might be sent from server in actual project.
const ATUH_KEY = '/&AV(%LK';

export const getToken = () => {
    let token = localStorage.getItem(ATUH_KEY);
    if (token === null) {
        token = sessionStorage.getItem(ATUH_KEY);
    }
    return token;
};

export const getAuthority = str => {
    const token = getToken();
    if (token === null) return [''];
    const data = decoder(getToken());
    return [data.user.profile];
};

// Set authority
export const setAuthority = (authority, remember = false)=> {
    if (remember) {
        localStorage.setItem(ATUH_KEY, authority);
    } else {
        sessionStorage.setItem(ATUH_KEY, authority);
    }
}

// // Get user token
export const getAuthorityUser = () => {
    const token = getToken();
    if (token === null) return {};
    return decoder(getToken());
};

// Logout
export const destroy = () => {
    localStorage.clear();
    sessionStorage.clear();
};
