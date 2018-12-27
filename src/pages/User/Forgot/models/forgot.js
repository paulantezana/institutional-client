import { userForgotSearch, userForgotValidate, userForgotChange } from '@/services/user';

import { Modal } from 'antd';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'forgot',
    state: {
        forgotStep: 0,
        forgotID: 0,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname == '/user/forgot') {
                    dispatch({
                        type: 'resetForgot',
                    });
                }
            });
        },
    },
    effects: {
        *forgotSearch({ payload }, { call, put }) {
            const response = yield call(userForgotSearch, payload);
            if (response.success) {
                yield put({
                    type: 'forgotSuccess',
                    payload: { forgotStep: 1, forgotID: response.data },
                });
            } else {
                Modal.error({ title: 'Error al buscar una cuenta', content: response.message });
            }
        },
        *forgotValidate({ payload }, { select, call, put }) {
            const id = yield select(({ forgot }) => forgot.forgotID);
            const response = yield call(userForgotValidate, { ...payload, id });
            if (response.success) {
                yield put({ type: 'forgotSuccess', payload: { forgotStep: 2 } });
            } else {
                Modal.error({ title: 'Error al validar el código', content: response.message });
            }
        },
        *forgotChange({ payload }, { select, call, put }) {
            const id = yield select(({ forgot }) => forgot.forgotID);
            const response = yield call(userForgotChange, { ...payload, id });
            if (response.success) {
                Modal.success({ title: 'Cambiar contraseña', content: response.message });
                yield put({ type: 'forgotSuccess', payload: { forgotStep: 3, forgotID: 0 } });
                yield put(routerRedux.push('/user/login'));
            } else {
                Modal.error({ title: 'Error al cambiar la contraseña', content: response.message });
            }
        },
    },
    reducers: {
        forgotSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        resetForgot(state, action) {
            return { ...state, forgotStep: 0, forgotID: 0 };
        },
    },
};
