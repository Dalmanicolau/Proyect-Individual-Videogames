

const validation = (input) => {
    let errors = {}
    if (!input.name) {
        errors.name = 'El campo debe ser completado por un nombre'
    } else if (!input.description || input.description.length < 30) {
        errors.description = 'La descripcion debe ser mas amplia'
    } else if (input.rating > 5 || input.rating < 1) {
        errors.rating = 'El rating es del 1 al 5'
    } else if (input.genre === input.genre) {
        errors.genre = 'No puedes elegir el mismo genero dos veces'
    }
    return errors;
}

export default validation;
