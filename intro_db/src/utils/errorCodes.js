const dataBaseErrors = {
    "42601": "Error de sintaxis",
    "42P01": "Error en la tabla"
}

const errorCodesDataBase = (code) =>  {
    if (dataBaseErrors[code]) {
      return dataBaseErrors[code]
    }

    return "Error de base datos"
    // Alternativa (más viable)
    // return dataBaseErrors[code] || "Error genérico"
}

module.exports = errorCodesDataBase