import request from '@/utils/request';

const SUBSIDIARY_API = '/institute/subsidiary';

// Get all subsidiarys
export async function subsidiaryAll(body) {
    return request(`${SUBSIDIARY_API}/all`, {
        method: 'POST',
        body,
    });
}

// Get ByID subsidiary
export async function subsidiaryById(body) {
    return request(`${SUBSIDIARY_API}/by/id`, {
        method: 'POST',
        body,
    });
}

// Create subsidiary
export async function subsidiaryCreate(body) {
    return request(`${SUBSIDIARY_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update subsidiary
export async function subsidiaryUpdate(body) {
    return request(`${SUBSIDIARY_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete subsidiary
export async function subsidiaryDelete(body) {
    return request(`${SUBSIDIARY_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
