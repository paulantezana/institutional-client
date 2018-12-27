import { programAll, programCreate, programUpdate } from '@/services/program';
import { subsidiaryById } from '@/services/subsidiary';
import { Modal, message } from 'antd';
export default {
    namespace: 'program',
    state: {
        list: [],
        currentProgramID: 0,

        modalVisible: false,
        currentItem: {},
        modalType: 'create',

        currentSubsidiary: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                let index = location.pathname.indexOf('/', location.pathname.indexOf('program'));
                let param = location.pathname.substring(index + 1);
                if (location.pathname == `/subsidiary/program/${param}`) {
                    if (/^[0-9]*$/.exec(param)) {
                        dispatch({
                            type: 'setupApp',
                            payload: parseInt(param),
                        });
                    } else {
                        dispatch(routerRedux.push('/exception/404'));
                    }
                }
            });
        },
    },
    effects: {
        *setupApp({ payload }, { select, call, put }) {
            yield put({ type: 'querySuccess', payload: {
                currentSubsidiary: { id: payload }
            }});

            // const response = yield call(subsidiaryById, { id: payload });
            // if (response.success) {
            //     yield put({
            //         type: 'querySuccess',
            //         payload: {
            //             currentSubsidiary: response.data,
            //         },
            //     });
            // } else {
            //     Modal.error({ title: 'Algo salió mal', content: response.message });
            // }
        },
        *all({ payload }, { call, put, select }) {
            const currentSubsidiary = yield select(({ program }) => program.currentSubsidiary);
            const response = yield call(programAll,{ subsidiary_id: currentSubsidiary.id } );
            if (response.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: response.data,
                    },
                });
            } else {
                Modal.error({ title: 'Algo salió mal', content: response.message });
            }
        },
        *create({ payload }, { call, put, select }) {
            const currentSubsidiary = yield select(({ program }) => program.currentSubsidiary);
            const response = yield call(programCreate, {...payload, subsidiary_id: currentSubsidiary.id });
            if (response.success) {
                yield put({ type: 'resetProgram' });
                Modal.success({ title: '¡Operacion exitosa!', content: response.message });
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: '¡Algo salió mal!', content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(programUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateSuccess', payload });
                yield put({ type: 'resetProgram' });
                message.success(response.message);
            } else {
                Modal.error({ title: '¡Algo salió mal!', content: response.message });
            }
        },
    },
    reducers: {
        querySuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        updateSuccess(state, { payload }) {
            const newList = state.list.map(
                program => (program.id == payload.id ? { ...program, ...payload } : program)
            );
            return { ...state, list: newList };
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        resetProgram(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
        setCurrentProgramID(state, { payload }){
            return { ...state, currentProgramID: payload }
        },
    },
};
