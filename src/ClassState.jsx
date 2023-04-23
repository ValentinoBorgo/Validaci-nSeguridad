import React from "react";

const CODIGO_SEGURIDAD = 'paradigma';



export class ClassState extends React.Component{
    // Para entrar a las props desde una clase es asi :

    constructor(props){
        // Super herada todas las propiedades de react.component
        super(props);
        // Modificando el state y agregando un objeto error que tiene como valor false
        this.state = {
            error : false,
            cargando : false,
            value : '',
        };
    }


    // Este metodo se ejecuta justo despues de que un estado cambie y se provoque un nuevo render.
    componentDidUpdate(){
        console.log('actualizacion');

        if (this.state.cargando) {
            setTimeout(() => {
                console.log('Validando...');

                if (this.state.value === CODIGO_SEGURIDAD) {
                    this.setState({cargando : false});
                } else {
                    this.setState({error : true, cargando : false});
                }

                console.log('Validacion terminada');
            }, 2000)
        }
    }


    render() {
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad.</p>


                {this.state.cargando && (
                    <p>Cargando...</p>
                )}


                {this.state.error && (
                    <p>Error, el codigo es incorrecto</p>
                )}

                <input 
                value={this.state.value}
                onChange={(event) =>{
                    this.setState({ value : event.target.value})
                }}
                placeholder ='Codigo de seguridad'/>

                <button
                onClick={() => {
                    this.setState({error : false, cargando : true})
                }}
                >Comprobar</button>
            </div>
        )
    }
}