import { useContext } from 'react'
import Link from 'next/link'
import { FirebaseContext } from '../../firebase'


const Nav = () => {

    const { usuario } = useContext(FirebaseContext)

    return (
        <nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            { usuario && (
                <Link href="/nuevo-producto">Agregar Producto</Link>
            )}
        </nav>
    )
}

export default Nav