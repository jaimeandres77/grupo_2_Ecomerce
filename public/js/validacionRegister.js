const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const selects = document.querySelectorAll('#formulario select');

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
    fullname: false,
    username: false,
    domicilio: false,
    perfil: false,
    password: false,
    email: false,
    country: false,
    categories: 0
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

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password_repeat');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password_repeat`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password_repeat`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password_repeat i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__password_repeat i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__password_repeat .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[password] = false;
    } else {
        document.getElementById(`grupo__password_repeat`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password_repeat`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password_repeat i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__password_repeat i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__password_repeat .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[password] = true;
    }
};

const validarCheckbox = (input, campo) => {
    if (input.name === campo && input.checked) {
        campos[campo] += 1;
    } else if (input.name === campo) {
        campos[campo] -= 1;
    }
    if (campos[campo] > 0) {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    } else {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
};

const validarSelect = (select, campo) => {
    if (select.name === campo && select.value !== '') {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos.country = true;
    } else {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos.country = false;
    }
};

const validarRadio = (radio, campo) => {
    if (radio.name === campo && radio.value) {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos.perfil = true;
    } else {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos.perfil = false;
    }
}



const validarFormulario = e => {
    switch (e.target.name) {
        case 'fullname':
            validacionesCampo(expresiones.nombre, e.target, 'fullname');
            break;
        case 'username':
            validacionesCampo(expresiones.usuario, e.target, 'username');
            break;
        case 'domicilio':
            validacionesCampo(expresiones.domicilio, e.target, 'domicilio');
            break;
        case 'perfil':
            validarRadio(e.target, 'perfil');
            break;
        case 'categories':
            validarCheckbox(e.target, 'categories');
            break;
        case 'password':
            validacionesCampo(expresiones.password, e.target, 'password');
            break;
        case 'password_repeat':
            validarPassword2();
            break;
        case 'email':
            validacionesCampo(expresiones.correo, e.target, 'email');
            break;
        case 'country':
            validarSelect(e.target, 'country');
            break;
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

selects.forEach(input => {
    input.addEventListener('change', validarFormulario)
    input.addEventListener('click', validarFormulario)
})

formulario.addEventListener('submit', e => {
    e.preventDefault();
    if (campos.fullname && campos.username && campos.domicilio && campos.perfil && campos.categories && campos.password && campos.email && campos.country) {
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
