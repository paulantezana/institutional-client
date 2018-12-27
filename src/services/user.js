import request from '@/utils/request';

const USER_API = '/user';

// User Login
export async function login(body) {
    return request(`/public${USER_API}/login`, {
        method: 'POST',
        body,
    });
}

// User forgout search email
export async function userForgotSearch(body) {
    return request(`/public${USER_API}/forgot/search`, {
        method: 'POST',
        body,
    });
}

// User forgout validate key change password
export async function userForgotValidate(body) {
    return request(`/public${USER_API}/forgot/validate`, {
        method: 'POST',
        body,
    });
}

// User forgout change password
export async function userForgotChange(body) {
    return request(`/public${USER_API}/forgot/change`, {
        method: 'POST',
        body,
    });
}

// Update user
export async function userResetPassword(body) {
    return request(`${USER_API}/reset/password`, {
        method: 'POST',
        body,
    });
}

// Update user
export async function userChangePassword(body) {
    return request(`${USER_API}/change/password`, {
        method: 'POST',
        body,
    });
}

// POST upload avatar
export async function userUploadAvatar(body) {
    return request(`${USER_API}/upload/avatar`, {
        method: 'POST',
        body,
    });
}

// Get all users
export async function userAll(body) {
    return request(`${USER_API}/all`, {
        method: 'POST',
        body,
    });
}

// Get ByID user
export async function userById(body) {
    return request(`${USER_API}/by/id`, {
        method: 'POST',
        body,
    });
}

// Create user
export async function userCreate(body) {
    return request(`${USER_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update user
export async function userUpdate(body) {
    return request(`${USER_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete user
export async function userDelete(body) {
    return request(`${USER_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
