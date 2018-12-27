import request from '@/utils/request';

const PROGRAM_API = '/institute/program';

// Get all programs
export async function programAll(body) {
    return request(`${PROGRAM_API}/all`, {
        method: 'POST',
        body,
    });
}

// Get ByID program
export async function programById(body) {
    return request(`${PROGRAM_API}/byid`, {
        method: 'POST',
        body,
    });
}

// Create program
export async function programCreate(body) {
    return request(`${PROGRAM_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update program
export async function programUpdate(body) {
    return request(`${PROGRAM_API}/update`, {
        method: 'PUT',
        body,
    });
}
