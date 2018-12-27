import { notification } from 'antd';
import router from 'umi/router';
import { service } from './config';
import { getToken } from './authority';

import NProgress from 'nprogress'; // Barra de progreso superior
import 'nprogress/nprogress.css'; // Estylos de la barra de progreso

const codeMessage = {
    200: 'El servidor devolvió con éxito los datos solicitados. ',
    201: 'Datos nuevos o modificados son exitosos. ',
    202: 'Una solicitud ha ingresado a la cola de fondo (tarea asíncrona). ',
    204: 'Eliminar datos con éxito. ',
    400: 'La solicitud se envió con un error. El servidor no realizó ninguna operación para crear o modificar datos. ',
    401: 'El usuario no tiene permiso (token, nombre de usuario, contraseña es incorrecta). ',
    403: 'El usuario está autorizado, pero el acceso está prohibido. ',
    404: 'La solicitud se realizó a un registro que no existe y el servidor no funcionó. ',
    406: 'El formato de la solicitud no está disponible. ',
    410: 'El recurso solicitado se elimina permanentemente y no se obtendrá de nuevo. ',
    422: 'Al crear un objeto, se produjo un error de validación. ',
    500: 'El servidor tiene un error, por favor revise el servidor. ',
    502: 'Error de puerta de enlace. ',
    503: 'El servicio no está disponible, el servidor está temporalmente sobrecargado o mantenido. ',
    504: 'La puerta de enlace agotó el tiempo. ',
};

// Verificando el estado de la respuesta
// por cada codigo de error
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `Error de solicitud ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

//  Check Catch response
function checkCatch(e) {
    // Evaluando y disparando acciones correspondientes
    // por cada codigo de error
    const status = e.name;

    // Error 401 unautorized or not send token
    if (status === 401) {
        window.g_app._store.dispatch({
            type: 'user/logout',
        });
        return e;
    } else if (status === 403) {
        router.push('/exception/403');
        return e;
    } else if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return e;
    } else if (status >= 404 && status < 422) {
        router.push('/exception/404');
        return e;
    }
    return e;
}

// Metod type
// Establece los headers de las peticiones
function setHeaders(options) {
    if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
        if (!(options.body instanceof FormData)) {
            options.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...options.headers,
            };
            options.body = JSON.stringify(options.body);
        } else {
            // newOptions.body is FormData
            options.headers = {
                Accept: 'application/json',
                ...options.headers,
            };
        }
    }
    return options;
}

// Fetch con mas opciones
export default (path, options) => {
    const token = getToken();
    const defaultOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    NProgress.start(); // Iniciando la barra de progreso

    // Estableciendo los headers de las peticiones
    // POST | PUT | DELETE
    const newOptions = setHeaders({ ...defaultOptions, ...options });

    const url = service.api_path + path; // Formando la URL de la peticion
    // Realizando la peticion con los parametros pertinentes
    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => {
            NProgress.done(); // End progresbar
            return response.json(); // Return response
        })
        .catch(e => {
            NProgress.done(); // End progresbar
            return checkCatch(e); // Check catch
        });
};

export const customFetch = (url, options) => {
    // Estableciendo los headers de las peticiones
    // POST | PUT | DELETE
    const newOptions = setHeaders(options);

    NProgress.start(); // Iniciando la barra de de progreso

    // Realizando la peticion
    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => {
            NProgress.done(); // End progresbar
            return response.json(); // Return response
        })
        .catch(e => {
            NProgress.done(); // End progresbar
            return checkCatch(e); // Check catch
        });
};

export const dowloandFetch = (path, options) => {
    const token = getToken();
    const defaultOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const url = service.api_path + path; // Formando la URL de la peticion

    NProgress.start(); // Iniciando la barra de de progreso

    // Realizando la peticion
    return fetch(url, defaultOptions)
        .then(checkStatus)
        .then(response => {
            NProgress.done(); // End progresbar
            return response.blob();
        })
        .catch(e => {
            NProgress.done(); // End progresbar
            return checkCatch(e); // Check catch
        });
};
