import { semesterAll, semesterCreate, semesterUpdate, semesterDelete} from '@/services/semester';
import { Modal, message } from 'antd';

export default {
    namespace: 'semester',
    state: {
        list: [],

        modalVisible: false,
        currentItem: {},
        modalType: 'create',
    },
    effects: {
        *all({ payload }, { call, put }) {
            const response = yield call(semesterAll,payload);
            if (response.success) {
                yield put({
                    type: 'allSuccess',
                    payload: {
                        list: response.data,
                    },
                });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *create({ payload }, { call, put, select }) {
            const program_id = yield select(({ program }) => program.currentProgramID);
            const response = yield call(semesterCreate, { ...payload, program_id: program_id });
            if (response.success) {
                yield put({ type: 'resetSemester' });
                Modal.success({ title: '¡Operación exitosa!', content: response.message });
                yield put({ type: 'all', payload:{ program_id } });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(semesterUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateSuccess', payload });
                yield put({ type: 'resetSemester' });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *delete({ payload }, { call, put, select }) {
            const program_id = yield select(({ program }) => program.currentProgramID);
            const response = yield call(semesterDelete, payload);
            if (response.success) {
                yield put({ type: 'resetSemester' });
                message.success(response.message);
                yield put({ type: 'all', payload:{ program_id } });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
    },
    reducers: {
        allSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        updateSuccess(state, { payload }) {
            const newList = state.list.map(student =>
                student.id == payload.id ? { ...student, ...payload } : student
            );
            return { ...state, list: newList };
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        resetSemester(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
    },
};
