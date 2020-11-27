import app from 'firebase/app'
import 'firebase/auth'

import firebaseConfig from './config'

/**
 * Inicializa Firebase
 *
 * @class Firebase
 */
class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig) // Le paso la configuracion de Firebase
        }

        this.auth = app.auth()
    }

    /**
     * Registra el Usuario en Firebase
     *
     * @param {*} nombre nombre del usuario
     * @param {*} email email del usuario
     * @param {*} password password del usuario
     * @return {*}
     * @memberof Firebase
     */
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password)

        return await nuevoUsuario.user.updateProfile({
            displayName : nombre
        })
    }

    /**
     *  Login al usuario en Firebase y mantiene el estado en la App
     *
     * @param {*} email
     * @param {*} password
     * @return {*}
     * @memberof Firebase
     */
    async login(email, password) {
            return await this.auth.signInWithEmailAndPassword(email, password);
        }
    /**
     *  Cierra Sesion
     *
     * @memberof Firebase
     */
    async cerrarSesion() {
            await this.auth.signOut()
            }
    }



const firebase = new Firebase()

export default firebase