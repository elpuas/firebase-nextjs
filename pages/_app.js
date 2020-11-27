import firebase, { FirebaseContext } from '../firebase'
import useAuthentication from '../hooks/useAuthentication'

const MyApp = props => {

  const usuario = useAuthentication();
  console.log(usuario)

  const { Component, pageProps } = props;

  return (
      <FirebaseContext.Provider
        value={{
          firebase,
          usuario
        }}
      >
        <Component {...pageProps} />
      </FirebaseContext.Provider>
  )
}

export default MyApp
