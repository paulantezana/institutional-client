import request from '@/utils/request';

const SEMESTER_API = '/institute/semester';

// Get all semesters
export async function semesterAll(body) {
    return request(`${SEMESTER_API}/all`, {
        method: 'POST',
        body,
    });
}

// Create semester
export async function semesterCreate(body) {
    return request(`${SEMESTER_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update semester
export async function semesterUpdate(body) {
    return request(`${SEMESTER_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete semester
export async function semesterDelete(body) {
    return request(`${SEMESTER_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
