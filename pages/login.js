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
import validarIniciarSesion from '../validation/validarIniciarSesion'

// state inicial
const STATE_INICIAL = {
    email: '',
    password: '',
}

const Login = () => {

    const [error, guardarError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur} = useValidation( STATE_INICIAL, validarIniciarSesion, iniciarSesion)

    const { email, password } = valores

    /**
     * Registra el usuario, si registra con exito, envia al usuario a la pagina principal, si falla muestra error.
     *
     */
    async function iniciarSesion() {
        try {
            await firebase.login(email, password)
            Router.push('/')
        } catch {
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
                >Iniciar Sesion</h1>
                <Formulario
                onSubmit={handleSubmit}
                >
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
                    value="Iniciar Sesion"
                    />
                </Formulario>
            </Layout>
        </div>
    )
}

export default Login