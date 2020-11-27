import React, { useContext } from 'react'
import Link from 'next/link'
// Styled
import styled from '@emotion/styled'
import { css } from '@emotion/react'
// Components
import Nav from './Nav'
import Search from '../ui/Search'
import Button from '../ui/Button'

import { FirebaseContext } from '../../firebase'

const ContainerHeaderStyled = styled.div`
        max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`

const Header = () => {

    const {usuario, firebase } = useContext(FirebaseContext);

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gray-light);
                padding: 1rem 0;
            `}
        >
            <ContainerHeaderStyled>
                <div
                css={css`
                    display:flex;
                    align-items: center;
                `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>


                    <Search />

                    <Nav />

                </div>

                <div
                    css={css`
                    display: flex;
                    align-items: center;
                `}
                >

                { usuario ? (
                    <>
                        <p
                            css={css`
                                margin-right: 2rem;
                            `}
                        >Hola: {usuario.displayName} </p>
                        <Button
                            bgColor="true"
                            onClick={ () => firebase.cerrarSesion() }
                        >Cerrar Sesión</Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button
                                bgColor="true"
                            >Login</Button>
                        </Link>
                        <Link href="/crear-cuenta">
                            <Button>Crear Cuenta</Button>
                        </Link>
                    </>
                ) }

                </div>
            </ContainerHeaderStyled>
        </header>
    )
}

export default Header