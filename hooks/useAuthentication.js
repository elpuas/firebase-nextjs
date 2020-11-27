import { useState, useEffect } from 'react'
import firebase from '../firebase'

function useAuthentication() {
    const [ usuarioAutenticado, guardarUsuarioAutenticado ] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged( usuario => {

            if( usuario ) {
                guardarUsuarioAutenticado(usuario)
            } else {
                guardarUsuarioAutenticado(null)
            }
        })

        return () => unsubscribe()

    }, []);

    return usuarioAutenticado;
}

export default useAuthentication