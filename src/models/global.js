import {
    settingUpdate,
    settingGlobal,
    settingUploadLogo,
    settingUploadMinistry,
} from '@/services/setting';
import { userUpdate } from '@/services/user';
import { Modal, message } from 'antd';
import { getAuthorityUser } from '@/utils/authority';
import { programUpdate } from '@/services/program';

export default {
    namespace: 'global',

    state: {
        notices: [],

        collapsed: false,
        setting: {},
        user: {},
        program: {},
        success: false,
    },

    effects: {
        *globalSetting({ payload }, { call, put }) {
            const tokenUser = getAuthorityUser();
            const response = yield call(settingGlobal, {
                id: tokenUser.user.id,
                program_id: tokenUser.program_id,
            });
            if (response.success) {
                yield put({ type: 'settingSuccess', payload: response });
            } else {
                Modal.error({
                    title: 'Error al consultar la configuración general',
                    content: response.message,
                });
            }
        },
        *updateProfile({ payload }, { call, put }) {
            const response = yield call(userUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateProfileSuccess', payload });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al actualizar el perfil', content: response.message });
            }
        },

        *updateSetting({ payload }, { call, put }) {
            const response = yield call(settingUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateSettingSuccess', payload });
                message.success(response.message);
            } else {
                Modal.error({
                    title: 'Error al actualizar la configuración general',
                    content: response.message,
                });
            }
        },

        *updateProgram({ payload }, { call, put }) {
            const response = yield call(programUpdate, payload);
            if (response.success) {
                yield put({ type: 'updateProgramSuccess', payload });
                message.success(response.message);
            } else {
                Modal.error({
                    title: 'Error al actualizar el programa',
                    content: response.message,
                });
            }
        },

        *uploadLogo({ payload }, { call, put }) {
            let data = new FormData();
            data.append('logo', payload.logo);
            data.append('id', payload.id);
            const response = yield call(settingUploadLogo, data);
            if (response.success) {
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error subir el logo principal', content: response.message });
            }
        },

        *uploadMinistry({ payload }, { call, put }) {
            let data = new FormData();
            data.append('ministry', payload.ministry);
            data.append('id', payload.id);
            const response = yield call(settingUploadMinistry, data);
            if (response.success) {
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error subir el logo principal', content: response.message });
            }
        },
    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return { ...state, collapsed: payload };
        },
        updateProfileSuccess(state, action) {
            return { ...state, user: Object.assign({}, state.user, action.payload) };
        },
        updateSettingSuccess(state, action) {
            return { ...state, setting: Object.assign({}, state.setting, action.payload) };
        },
        updateProgramSuccess(state, action) {
            return { ...state, program: Object.assign({}, state.program, action.payload) };
        },
        settingSuccess(state, { payload }) {
            return {
                ...state,
                setting: payload.setting,
                user: payload.user,
                program: payload.program,
                success: payload.success,
            };
        },
        statisticSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
    },

    subscriptions: {
        setup({ history }) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
            });
        },
    },
};
