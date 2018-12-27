import {
    login,
    userCreate,
    userUpdate,
    userResetPassword,
    userChangePassword,
    userAll,
    userDelete,
    userUploadAvatar,
    userById
} from '@/services/user';

import { routerRedux } from 'dva/router';
import { Modal, message } from 'antd';
import { setAuthority, destroy } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
    namespace: 'user',
    state: {
        data: {
            list: [],
            pagination: {},
        },
        searchText: '',

        modalVisible: false,
        currentItem: {},
        modalType: 'create',
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            if (response.success) {
                setAuthority(response.data.token, payload.remember);
                message.success(response.message);
                reloadAuthorized();
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.startsWith('/#')) {
                            redirect = redirect.substr(2);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));
            } else {
                Modal.error({ title: 'Login', content: response.message });
            }
        },
        *updateUserByID({ payload }, { call, put }) {
            const response = yield call(userById, { id: payload.id });
            if (response.success) {
                yield put({ 
                    type: 'showModal',
                    payload: {
                        currentItem: response.data,
                        modalType: 'update',
                    }
                });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al crear usuario', content: response.message });
            }
        },
        *logout({ _ }, { put }) {
            yield destroy();
            yield put(routerRedux.replace('/user/login'));
        },

        *all({ payload }, { select, call, put }) {
            const setting = yield select(({ global }) => global.setting); // Get setting item_table
            const response = yield call(userAll, { ...payload, limit: setting.item_table });
            if (response.success) {
                yield put({
                    type: 'allSuccess',
                    payload: {
                        data: {
                            list: response.data,
                            pagination: {
                                current: response.current_page,
                                total: response.total,
                            }
                        }
                    },
                });
            } else {
                Modal.error({ title: 'Error al consultar el Usuario', content: response.message });
            }
        },
        *create({ payload }, { call, put }) {
            const response = yield call(userCreate, payload);
            if (response.success) {
                yield put({ type: 'resetUser' });
                Modal.success({ title: 'Crear usuario', content: response.message });
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Error al crear usuario', content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(userUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateSuccess', payload });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al actualizar usuario', content: response.message });
            }
        },
        *changePassword({ payload }, { call, put }) {
            const response = yield call(userChangePassword, payload);
            if (response.success) {
                yield put({ type: 'updateSuccess', payload });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al actualizar usuario', content: response.message });
            }
        },
        *resetPassword({ payload }, { call, put }) {
            const response = yield call(userResetPassword, payload);
            if (response.success) {
                yield put({ type: 'updateSuccess', payload });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al actualizar usuario', content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(userDelete, payload);
            if (response.success) {
                yield put({ type: 'resetUser', payload });
                message.success('Se elimino el usuario con el id = ' + payload.id);
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Error al actualizar usuario', content: response.message });
            }
        },
        *uploadAvatar({ payload }, { call, put }) {
            let data = new FormData();
            data.append('avatar', payload.avatar);
            data.append('id', payload.id);
            const response = yield call(userUploadAvatar, data);
            if (response.success) {
                yield put({ type: 'resetUser' });
                Modal.success({ title: 'Subir avatar', content: response.message });
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Error subir el avatar usuario', content: response.message });
            }
        },
    },

    reducers: {
        allSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        updateSuccess(state, { payload }) {
            const newList = state.list.map(
                user => (user.id == payload.id ? { ...user, ...payload } : user)
            );
            return { ...state, list: newList };
        },
        search(state, { payload }) {
            return { ...state, searchText: payload };
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        resetUser(state, action) {
            return {
                ...state,
                currentItem: {},
                modalVisible: false,
                modalType: 'create',
            };
        },
        resetForgot(state, action) {
            return { ...state, forgotStep: 0, forgotID: 0 };
        },
    },
};
