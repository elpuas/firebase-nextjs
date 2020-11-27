import {useState} from 'react'
import Layout from '../components/layout/Layout'

// Styled Components
import {css} from '@emotion/react'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'
import Router from 'next/router'

// Firebase
import firebase from '../firebase'

// Validacion del Formulario
import useValidation from '../hooks/useValidation'
import validarCrearCuenta from '../validation/validarCrearCuenta'

// state inicial
const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: '',
}

const CrearCuenta = () => {

    const [error, guardarError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur} = useValidation( STATE_INICIAL, validarCrearCuenta, crearCuenta )

    const { nombre, email, password } = valores

    /**
     * Registra el usuario, si registra con exito, envia al usuario a la pagina principal, si falla muestra error.
     *
     */
    async function crearCuenta() {
        try {
            await firebase.registrar(nombre, email, password)
            Router.push('/')
        } catch (error) {
            console.log('hay error', error.message)
            guardarError(error.message)
        }
    }

    return (
        <div>
            <Layout>
                <h1
                css={css`
                text-align: center;
                margin-top: 5rem;
                `}
                >Crear Cuenta</h1>
                <Formulario
                onSubmit={handleSubmit}
                >
                    <Campo>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                        type="text"
                        id="nombre"
                        placeholder="Tu Nombre"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.nombre && <Error>{errores.nombre}</Error>}
                    <Campo>
                        <label htmlFor="email">Email</label>
                        <input
                        type="text"
                        id="email"
                        placeholder="Tu email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.email && <Error>{errores.email}</Error>}
                    <Campo>
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        placeholder="Tu Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </Campo>

                    {errores.password && <Error>{errores.password}</Error>}

                    {error && <Error>{error.message}</Error>}

                    <InputSubmit
                    type="submit"
                    value="Crear Cuenta"
                    />
                </Formulario>
            </Layout>
        </div>
    )
}

export default CrearCuenta