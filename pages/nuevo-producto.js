import {useState, useContext} from 'react'
import Layout from '../components/layout/Layout'

// Styled Components
import {css} from '@emotion/react'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'
import Router, { useRouter } from 'next/router'

// Firebase
import { FirebaseContext} from '../firebase'

// Validacion del Formulario
import useValidation from '../hooks/useValidation'
import validarCrearProducto from '../validation/validarCrearProducto'

// state inicial
const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    url: '',
    descripcion: '',
}

const NuevoProducto = () => {

    const [error, guardarError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur} = useValidation( STATE_INICIAL, validarCrearProducto, crearProducto )

    const { nombre, empresa, imagen, url, descripcion } = valores

    // hook de routing
    const router = useRouter();

    // Context con las operaciones crud de firebase
    const { usuario, firebase } = useContext(FirebaseContext);

    /**
     * Registra el producto, si registra con exito, envia al usuario a la pagina principal, si falla muestra error.
     *
     */
    async function crearProducto() {

        // Si el ususario no esta activado
        if(!usuario) {
            return router.push('/login')
        }

        // Crear objeto del nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now()
        }

        // insertarlo en la DB
        firebase.db.collection('productos').add(producto)



        // try {
        //     // await firebase.registrar(nombre, email, password)
        //     // Router.push('/')
        // } catch (error) {
        //     // console.log('hay error', error.message)
        //     // guardarError(error.message)
        // }
    }

    return (
        <div>
            <Layout>
                <h1
                css={css`
                text-align: center;
                margin-top: 5rem;
                `}
                >Nuevo Producto</h1>
                <Formulario
                onSubmit={handleSubmit}
                >
                    <fieldset><legend>Informacion General</legend>
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
                        <label htmlFor="nombre">Empresa</label>
                        <input
                        type="text"
                        id="empresa"
                        placeholder="Tu Empresa"
                        name="empresa"
                        value={empresa}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.empresa && <Error>{errores.empresa}</Error>}
                    {/* <Campo>
                        <label htmlFor="nombre">Imagen</label>
                        <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        value={imagen}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.imagen && <Error>{errores.imagen}</Error>} */}
                    <Campo>
                        <label htmlFor="nombre">Imagen</label>
                        <input
                        type="url"
                        id="url"
                        name="url"
                        placeholder="URL del Producto"
                        value={url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.url && <Error>{errores.url}</Error>}
                    </fieldset>
                    <fieldset><legend>Sobre el Producto</legend>
                    <Campo>
                        <textarea
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.descripcion && <Error>{errores.descripcion}</Error>}
                    </fieldset>

                    {error && <Error>{error}</Error>}

                    <InputSubmit
                    type="submit"
                    value="Agregar nuevo Producto"
                    />
                </Formulario>
            </Layout>
        </div>
    )

}

export default NuevoProducto