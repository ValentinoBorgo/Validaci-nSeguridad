import React, { useState } from "react";

const CODIGO_SEGURIDAD = 'paradigma';


export function UseState(props) {

    const [error, setError] = useState(false);
    const [cargando, setCarga] = useState(false);
    const [value, setValor] = useState('');

    console.log(value);


    React.useEffect(() => {
        console.log('empezando');

        if (cargando) {
            setTimeout(() => {
                console.log('TROLA');

                if (value === CODIGO_SEGURIDAD) {
                    setCarga(false);
                } else {
                    setError(true);
                    setCarga(false);
                }

                console.log('TROLA HACIENDOSE');
            }, 2000)
        }

        console.log('terminando');
    }, [cargando])

    return (
        <div>
            <h2>Eliminar {props.name}</h2>

            <p>Por favor, escribe el codigo de seguridad.</p>

            {cargando && (
                <p>Cargando...</p>
            )}

            {error && (
                <p>Error, codigo de seguridad incorrecto</p>
            )}

            <input
                value={value}
                onChange={(event) => {
                    setValor(event.target.value);
                }}
                placeholder='Codigo de seguridad' />

            <button
                onClick={() => {
                    setCarga(!cargando)
                    setError(false);
                }}
            >Comprobar</button>
        </div>
    )
}