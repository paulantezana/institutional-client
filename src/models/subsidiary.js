import { subsidiaryAll, subsidiaryCreate, subsidiaryUpdate, subsidiaryDelete} from '@/services/subsidiary';
import { Modal, message } from 'antd';

export default {
    namespace: 'subsidiary',
    state: {
        list: [],

        modalVisible: false,
        currentItem: {},
        modalType: 'create',
    },
    effects: {
        *all({ payload }, { select, call, put }) {
            const response = yield call(subsidiaryAll);
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
        *create({ payload }, { call, put }) {
            const response = yield call(subsidiaryCreate, payload);
            if (response.success) {
                yield put({ type: 'resetSubsidiary' });
                Modal.success({ title: '¡Operación exitosa!', content: response.message });
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(subsidiaryUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateSuccess', payload });
                yield put({ type: 'resetSubsidiary' });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(subsidiaryDelete, payload);
            if (response.success) {
                yield put({ type: 'resetSubsidiary' });
                message.success(response.message);
                yield put({ type: 'all' });
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
        resetSubsidiary(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
    },
};
