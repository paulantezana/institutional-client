import {
    moduleAll,
    moduleSearch,
    moduleCreate,
    moduleUpdate,
    moduleDelete,
} from '@/services/mdule';
import { Modal, message } from 'antd';

export default {
    namespace: 'moduler',
    state: {
        list: [],
        searchText: '',

        modalVisible: false,
        currentItem: {},
        modalType: 'create',

        searchResult: [],
    },
    effects: {
        *all({ payload }, { select, call, put }) {
            const response = yield call(moduleAll, { ...payload });
            if (response.success) {
                yield put({
                    type: 'allSuccess',
                    payload: {
                        list: response.data,
                        total: response.total,
                        current: response.current_page,
                    },
                });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *search({ payload }, { call, put }) {
            const response = yield call(moduleSearch, payload);
            if (response.success) {
                yield put({ type: 'searchSuccess', payload: response.data });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *create({ payload }, { call, put }) {
            const response = yield call(moduleCreate, payload);
            if (response.success) {
                yield put({ type: 'resetModule' });
                Modal.success({ title: '¡Operación exitosa!', content: response.message });
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(moduleUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateSuccess', payload });
                yield put({ type: 'resetModule' });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(moduleDelete, payload);
            if (response.success) {
                yield put({ type: 'resetModule' });
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
        searchSuccess(state, { payload }) {
            return { ...state, searchResult: payload };
        },
        updateSuccess(state, { payload }) {
            const newList = state.list.map(
                moduler => (moduler.id == payload.id ? { ...moduler, ...payload } : moduler)
            );
            return { ...state, list: newList };
        },
        setSearchText(state, { payload }) {
            return { ...state, searchText: payload };
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        resetModule(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
    },
};
