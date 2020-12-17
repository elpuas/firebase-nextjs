export default function validarCrearCuenta(valores) {

    let errores = {};

    // Validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // validar empresa
    if(!valores.empresa) {
        errores.empresa = "Empresa es Obligatorio";
    }

    // validar url
    if(!valores.url) {
        errores.url = "El URL del producto obligatorio";
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = "URL mal formateada o no válida"
    }

    // validar descripcion
    if(!valores.descripcion) {
        errores.descripcion = "La descripcion es obligatoria"
    }

    return errores;
}