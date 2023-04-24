import React, { useReducer } from "react";
import { UseState } from "./UseState";



const CODIGO_SEGURIDAD = 'paradigma';


export function UseReducer(props) {


    // useReducer : es una herramienta que nos premite declarar todos los posibles estados de una app
    // para poder despues usarlos de forma mas declarativa

    const [state, dispatch] = useReducer(reducer3, initialState);

    const onConfirm = () => {
        dispatch({
            type: actionTypes.CONFIRM,
        })
    }

    const onError = () => {
        dispatch({
            type: actionTypes.ERROR,
        })
    }

    const onWrite = (e) => {
        dispatch({
            type: actionTypes.WRITE,
            payload: e,
        })
    }


    const onCheck = () => {
        dispatch({
            type: actionTypes.CHECK,
        })
    }

    const onDelete = () => {
        dispatch({
            type: actionTypes.DELETE,
        })
    }

    const onReset = () => {
        dispatch({
            type: actionTypes.RESET,
        })
    }


    React.useEffect(() => {
        console.log('empezando');

        if (state.cargando) {
            setTimeout(() => {
                console.log('TROLA');

                if (state.value === CODIGO_SEGURIDAD) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log('TROLA HACIENDOSE');
            }, 2000)
        }

        console.log('terminando');
    }, [state.cargando])

    if (!state.borrar && !state.confirmado) {
        return (
            <>
                <div className="div-use">
                    <h2>Eliminar {props.name}</h2>

                    <p>Por favor, escribe el codigo de seguridad.</p>

                    {state.cargando && (
                        <p>Cargando...</p>
                    )}

                    {state.error && (
                        <p>Error, codigo de seguridad incorrecto</p>
                    )}

                    <input
                        value={state.value}
                        onChange={(event) => {
                            onWrite(event.target.value);
                        }}
                        placeholder='Codigo de seguridad' />

                    <button
                        onClick={() => onCheck()}
                    >Comprobar</button>
                </div>
            </>
        );

    } else if (state.confirmado && !state.borrar) {
        return (
            <>
                <div className="div-use">
                    <h1>Estado de confirmación, seguro desea eliminar ??</h1>
                    <button
                        className="btn"
                        onClick={onDelete}
                    >Si, eliminar</button>
                    <button
                        className="btn"
                        onClick={onReset}
                    >No, volver atras</button>
                </div>
            </>
        );

    } else {
        return (
            <>
                <div className="div-use">
                    <h1>Eliminado con exito</h1>
                    <button
                        className="btn"
                        onClick={onReset}
                    >Resetear, volver atras</button>
                </div>
            </>
        );
    }
}



const initialState = {
    value: '',
    error: false,
    cargando: false,
    borrar: false,
    confirmado: false,
}

// Creacion de reducer.

// const reducer = (state, action) =>{

// };

// FORMA NUMERO 1 DE CREAR UN REDUCER.

// const reducer = (state, action) => {
//     if (action.type === 'ERROR') {
//         return {
//             ...state,
//             error: true,
//             cargando: false,
//         }
//     } else if (action.type === 'CHECK') {
//         return {
//             ...state,
//             cargando: true,
//         }
//     } else {
//         return {
//             ...state,
//         }
//     }
// }

// FORMA NUMERO 2 DE CREAR UN REDUCER.

// const reducer2 = (state, action) => {
//     switch (action.type) {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error: true,
//                 cargando: false,
//             }
//         case 'CHECK':
//             return {
//                 ...state,
//                 cargando: true,
//             }
//         default:
//             return {
//                 ...state,
//             }
//     }
// };

// FORMA NUMERO 3 DE CREAR UN REDUCER.

const reducerObject = (state, payload) => ({
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        cargando: false,
    },
    [actionTypes.CHECK]: {
        ...state,
        cargando: true,
        error: false,
    },
    [actionTypes.CONFIRM]: {
        ...state,
        confirmado: true,
    },
    [actionTypes.WRITE]: {
        ...state,
        value: payload,
    },
    [actionTypes.DELETE]: {
        ...state,
        borrar: true,
    },
    [actionTypes.RESET]: {
        ...state,
        confirmado: false,
        value: '',
        borrar: false,
        cargando: false,
        error: false,
    }
});

// Para evitar errores de sintaxis al utilizar el dispatch podemos realizar este metodo
const actionTypes = {
    CONFIRM: 'CONFIRM',
    ERROR: 'ERROR',
    CHECK: 'CHECK',
    WRITE: 'WRITE',
    DELETE: 'DELETE',
    RESET: 'RESET',
}


// Si el metodo reducerObject() contiene el action type del estado tal, retornamelo.
const reducer3 = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}