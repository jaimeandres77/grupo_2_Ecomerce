const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    fecha: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
    domicilio: /^[a-z0-9\s,'-]*$/i,
}

const campos = {
    fullname: true,
    domicilio: true
}

const validacionesCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};
const validarFormulario = e => {
    switch (e.target.name) {
        case 'fullname':
            validacionesCampo(expresiones.nombre, e.target, 'fullname');
            break;
        case 'domicilio':
            validacionesCampo(expresiones.domicilio, e.target, 'domicilio');
            break;
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
}),

formulario.addEventListener('submit', e => {
    e.preventDefault();
    if (campos.fullname && campos.domicilio) {
        document.getElementById('formulario').submit();
        formulario.reset();
    } else {
        for (const key in campos) {
            if (isNaN(parseInt(campos[key])) && campos[key] === false) {
                document.querySelector(`#grupo__${key} .formulario__input-error`).classList.add('formulario__input-error-activo');
            } else if (!isNaN(parseInt(campos[key])) && parseInt(campos[key]) <= 0) {
                document.querySelector(`#grupo__${key} .formulario__input-error`).classList.add('formulario__input-error-activo');
            }
        }

    }
});
