import request from '@/utils/request';

const MODULE_API = '/module';

// Get all modules
export async function moduleAll(body) {
    return request(`${MODULE_API}/all`, {
        method: 'POST',
        body,
    });
}

// Get serach
export async function moduleSearch(body) {
    return request(`${MODULE_API}/search`, {
        method: 'POST',
        body,
    });
}

// Create module
export async function moduleCreate(body) {
    return request(`${MODULE_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update module
export async function moduleUpdate(body) {
    return request(`${MODULE_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete module
export async function moduleDelete(body) {
    return request(`${MODULE_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
