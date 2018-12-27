import request from '@/utils/request';

const STATISTIC_API = '/statistic/top';

// Get statisticTopUsers
export async function statisticTopUsers(body) {
    return request(`${STATISTIC_API}/users`, {
        method: 'POST',
        body,
    });
}

// Get statisticTopStudentsWithReview
export async function statisticTopStudentsWithReview(body) {
    return request(`${STATISTIC_API}/student/whit/reviews`, {
        method: 'POST',
        body,
    });
}
