import React, { useState } from "react";
import './App.css'

const CODIGO_SEGURIDAD = 'paradigma';


export function UseState(props) {

    const [state, setState] = useState({
        value: '',
        error: false,
        cargando: false,
        borrar: false,
        confirmado: false,
    });

    console.log(state);


    const onConfirm = () => {
        setState({
            ...state,
            cargando: false,
            error: false,
            confirmado: true,
            borrar: false,
        });
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            cargando: false,
            confirmado: false,
            borrar: false,
        });
    }

    const escribiendo = (param) => {
        setState({
            ...state,
            value: param,
        });
    }


    const onCheck = () => {
        setState({
            ...state,
            cargando: true,
            error: false,
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            borrar: true,
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmado: false,
            value: '',
            borrar: false,
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
                <div>
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
                            escribiendo(event.target.value)
                        }
                        }
                        placeholder='Codigo de seguridad' />

                    <button
                        onClick={() => {
                            onCheck()
                        }}
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
                        onClick={() => {
                            onDelete();
                        }}
                    >Si, eliminar</button>
                    <button
                        className="btn"
                        onClick={() => {
                            onReset();
                        }}
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
                        onClick={() => {
                            onReset();
                        }}
                    >Resetear, volver atras</button>
                </div>
            </>
        );
    }
}

